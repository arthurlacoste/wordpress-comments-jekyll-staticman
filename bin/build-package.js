const replace = require('replace-in-file');

const args = process.argv.slice(2);

const startReplace = function (from, to) {
	const options = {
		files: '*',
		from,
		to
	};

	replace(options)
  .then(changes => {
	console.log('Modified files:', changes.join(', '));
	if (args[1]) {
		startReplace(/arthurlacoste/g, args[1]);
	}
})
  .catch(err => {
	console.error('Error occurred:', err);
});
};

startReplace(/_package_name_/g, args[0]);
