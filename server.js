import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getMovies', (req, res) => {
	let connection = mysql.createConnection(config);
	let sql = 'SELECT id, name, year, quality FROM movies';
  
	connection.query(sql, (error, results) => {
	  if (error) {
		return console.error(error.message);
	  }
	  res.json(results);
	});
  
	connection.end();
  });

  app.post('/api/addReview', (req, res) => {
	let connection = mysql.createConnection(config);
	const { movieID, userID, reviewTitle, reviewContent, reviewScore } = req.body;
  
	let sql = `
	  INSERT INTO Review (reviewTitle, reviewContent, reviewScore, userID, movieID)
	  VALUES (?, ?, ?, ?, ?)`;
	
	connection.query(sql, [reviewTitle, reviewContent, reviewScore, userID, movieID], (error, results) => {
	  if (error) {
		console.error('Error inserting review:', error.message);
		return res.status(500).json({ message: 'Failed to add review' });
	  }
	  console.log('Review added:', results);
	  res.status(200).json({ message: 'Review added successfully' });
	});
  
	connection.end();
  });

  app.post('/api/Search', (req, res) => {
    const connection = mysql.createConnection(config);
    const { searchMovie, searchActor, searchDirector } = req.body;

    let query = `
        SELECT 
            m.name AS movie_name,
            CONCAT(d.first_name, ' ', d.last_name) AS director_name,
            AVG(r.reviewScore) AS average_score,
            GROUP_CONCAT(
                DISTINCT r.reviewContent SEPARATOR ' | '
            ) AS all_reviews
        FROM 
            movies m
        JOIN 
            movies_directors md ON m.id = md.movie_id
        JOIN 
            directors d ON md.director_id = d.id
        LEFT JOIN 
            roles ro ON m.id = ro.movie_id
        LEFT JOIN 
            actors a ON ro.actor_id = a.id
        LEFT JOIN 
            Review r ON m.id = r.movieID
    `;

    const parameters = [];

    if (searchMovie) {
        query += ` WHERE m.name = ?`;
        parameters.push(searchMovie);
    }

    if (searchActor) {
        query += parameters.length ? ' AND ' : ' WHERE ';
        query += `CONCAT(a.first_name, ' ', a.last_name) = ?`;
        parameters.push(searchActor);
    }

    if (searchDirector) {
        query += parameters.length ? ' AND ' : ' WHERE ';
        query += `CONCAT(d.first_name, ' ', d.last_name) = ?`;
        parameters.push(searchDirector);
    }

    query += ` GROUP BY m.id, d.first_name, d.last_name;`;

    connection.query(query, parameters, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(500).send('Database query error');
        }

        res.send({ express: JSON.stringify(results) });
    });

    connection.end();
});

app.post('/api/getTrailersWithComments', (req, res) => {
    let connection = mysql.createConnection(config);
    let sql = `
      SELECT 
        t.id as trailerID, t.url, 
        c.id as commentID, c.userID, c.commentText,
        m.name as movieName
      FROM trailers t
      LEFT JOIN comments c ON t.id = c.trailerID
      LEFT JOIN movies m ON t.movieID = m.id
      ORDER BY t.id, c.id;
    `;
  
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching trailers and comments:', error.message);
        return res.status(500).json({ message: 'Failed to fetch trailers and comments' });
      }
      res.json(results);
    });
  
    connection.end();
  });
  
  
  app.post('/api/addComment', (req, res) => {
    let connection = mysql.createConnection(config);
    const { trailerID, userID, commentText } = req.body;
  
    let sql = `
      INSERT INTO comments (trailerID, userID, commentText)
      VALUES (?, ?, ?);
    `;
    
    connection.query(sql, [trailerID, userID, commentText], (error, results) => {
      if (error) {
        console.error('Error adding comment:', error.message);
        return res.status(500).json({ message: 'Failed to add comment' });
      }
      res.status(200).json({ message: 'Comment added successfully' });
    });
    
    connection.end();
  });
  

app.listen(port, () => console.log(`Listening on port ${port}`)); 
