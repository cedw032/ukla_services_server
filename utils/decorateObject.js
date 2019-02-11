// Object.prototype.map = function (modify) {

// 	var walk = (node) => {
// 		Object.keys(node).reduce((modified, key) => {
// 			const value = node[key];

// 			return {
// 				...modified,
// 				...modify({[key]: value}, walk),
// 			}

// 		}, {});
// 	};

// 	return walk(this);
// }


// var a = {
// 	a: 10,
// 	b: 2,
// 	c: {
// 		a: 30,
// 		f: 0,
// 	},
// }

// a.map((node, walk) => {
// 	if (node)
// });
