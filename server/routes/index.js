const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// Serve React static files
router.use(express.static(path.resolve(__dirname, '../../client/build')));

// For all other routes, serve the React app
router.get('*', (req, res) => { // --------------------------------------------------- the '*' may need to be changed a '/'
  res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
});

module.exports = router;