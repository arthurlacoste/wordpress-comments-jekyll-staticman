const fs = require('fs');
const path = require('path');
const md5 = require('md5');
const xml2js = require('xml2js');
const yaml = require('js-yaml');
const fspath = require('fs-path');

const args = process.argv.slice(2);
const parser = new xml2js.Parser();
let i = 0;

console.log('Starting to find comments...');

const createFile = c => {
	const timestamp = new Date(c.date).getTime();
	const filename = path.join(args[1], '/comments/', c.slug,
  '/comment-' + timestamp + '.md');
	const fileInput = yaml.safeDump(c);

	fspath.writeFile(path.resolve(filename), fileInput, err => {
		i += 1;
		console.log(`Adding comment ${i}, by ${c.name}...`);
		if (err) {
			throw err;
		}
		console.log('Done.');
	});
};

const parseComments = (comments, slug) => {
	for (const index in comments) {
		if (Object.prototype.hasOwnProperty.call(comments, index)) {
			const comment = comments[index];

			if (comment['wp:comment_approved'][0] === '1') {
				const commentObj = {
					slug,
					name: comment['wp:comment_author'][0],
					date: comment['wp:comment_date'][0],
					url: comment['wp:comment_author_url'][0],
					message: comment['wp:comment_content'][0],
					email: md5(comment['wp:comment_author_email'][0])
				};

				createFile(commentObj);
        /* Filter by length ?
        if(commentObj.message.length<50) {
          console.log(commentObj)
          i += 1
          console.log('I', i)

        } */
			}
		}
	}
};

fs.readFile(path.resolve(args[0]), (err, data) => {
	if (err) {
		throw err;
	}
	parser.parseString(data, (err, result) => {
		if (err) {
			throw err;
		}

		const posts = result.rss.channel[0].item;

		for (const index in posts) {
			if (Object.prototype.hasOwnProperty.call(posts, index)) {
				const post = posts[index];

				if (post['wp:comment']) {
					const slug = post['wp:post_name'][0];
					const comments = post['wp:comment'];

					parseComments(comments, slug);
				}
			}
		}
	});
});
