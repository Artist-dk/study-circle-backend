
// app.get('/session', (req, res)=> {
//   console.log(req.session)
//   console.log(req.session.id)
//   req.session.visited = true;
//   res.cookie("sid", req.session.id, {maxAge: 1000})
//   res.status(201).send("Hello")
// })
// app.get('/ses', (req, res)=> {
//   res.status(201).send(req.session.id)
// })

// console.log(typeof courseRoutes); // Check if it's "function"
// app.use("/courses", courseRoutes);

// app.use('/library', libraryRoute);

// app.use('/message', messageRoute)

// app.use('/settings', settingsRoute)
// app.use('/account/createnew', accountController.createNew);
// app.use('/login', accountController.login);
// app.use('/logout', accountController.logout);
// app.get('/authenticate', Authenticate.frontEnd, (req, res)=> {
//   res.status(200).send("authentication succeessfull");
// });

// app.post('/file', upload.single('file'), (req, res) => {
//   console.log("express:post/file")
// });

// app.get('/uploads/:filename', (req, res) => {
//   const filename = req.params.filename;
//   const filePath = path.join(__dirname, 'uploads', filename);

//   res.download(filePath, (err) => {
//     if (err) {
//       console.error('Error downloading file:', err);
//       res.status(500).send('Error downloading file');
//     }
//   });
// });


// const uploadsDir = path.join(__dirname, '/uploads/tutorial');

// function generateUniqueId() {
//   return crypto.randomBytes(16).toString('hex');
// }


// app.post('/tutorial/save', async (req, res) => {
//   console.log("Entered into tutorial/save")
//   let connection;
//   try {
//     const tutorialData = req.body;

//     const uniqueId = generateUniqueId();
//     const filePath = path.join(uploadsDir, `${uniqueId}.md`);

//     const tutorialContent = `# ${tutorialData.title}

// ${tutorialData.description}

// ${tutorialData.sections.map((section) => {
// const trimmedContent = section.content.trim();
// return `## ${section.title}

// ${section.media ? `![${section.title} Media](${section.media})` : ''}

// ${trimmedContent}`;
// }).join('\n\n')}`;

//     await fs.mkdir(uploadsDir, { recursive: true });

//     await fs.writeFile(filePath, tutorialContent);

//     const fileLink = `/uploads/tutorial/${uniqueId}.md`;
//     const sql = 'INSERT INTO tutorials (file_id, file_link, title, description) VALUES (?, ?, ?, ?)';
//     await db.query(sql, [uniqueId, fileLink, tutorialData.title, tutorialData.description]);

//     res.json({ message: 'Tutorial saved successfully!', id: uniqueId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error saving tutorial' });
//   } finally {
//     if (connection) {
//       await connection.end();
//     }
//   }
// });


// // Route to fetch tutorial data by ID
// app.get('/tutorial/:id', async (req, res) => {
//   const tutorialId = req.params.id;

//   db.query('SELECT * FROM tutorials WHERE file_id = ?', [tutorialId], async (error, results) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Error fetching tutorial' });
//     }

//     if (results.length === 0) {
//       return res.status(404).json({ message: 'Tutorial not found' });
//     }

//     const tutorialData = results[0];
//     const filePath = path.join(__dirname, tutorialData.file_link);

    
//     console.log(`Sending file from path: ${filePath}`);

//     res.sendFile(filePath, (fileError) => {
//       if (fileError) {
//         console.error(`Error sending file ${filePath}:`, fileError);
//         res.status(500).json({ message: 'Error sending tutorial file' });
//       }
//     });
//   });
// });


// const userProfile = {
//   username: 'johndoe',
//   email: 'johndoe@example.com',
//   profilePicture: 'https://i.pinimg.com/originals/5d/ad/83/5dad83eac77969d6583e067e3a82f0b3.jpg',
//   bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
// };

// app.get('/user/profile', (req, res) => {
//   res.json(userProfile);
// });



// // ################################## SCREENER ##################################
// // Serve static files (HTML, CSS, JS)
// app.use(express.static('public'));

// // API endpoint to get users
// app.get('/screener/users', (req, res) => {
//     connection.query('SELECT id, firstName, lastName, userName, email, userType FROM users', (err, results) => {
//         if (err) throw err;
//         console.log(results)
//         res.json(results);
//     });
// });

// // API endpoint to get books
// app.get('/screener/books', (req, res) => {
//     connection.query('SELECT id, title, author, pages, language, price FROM books', (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });
