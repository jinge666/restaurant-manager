
const uploadFilePromise = (url) => {
	return new Promise((resolve, reject) => {
		let a = uni.uploadFile({
			// url: 'https://8.130.13.161:8005/upload/picture',
			url:'http://localhost:8000/upload/picture',
			filePath: url,
			name: 'file',
			success: (res) => {
				console.log('res',res.data);
				resolve(res.data)
			}
		});
	})
}

const deleteFilePromise = (filename) => {
	return new Promise(async (resolve,reject) => {
		console.log('uni.$u',uni.$u);
		const res = await uni.$u.api.deletePicture(filename)
		resolve(res.data)
	})
}

export {
	uploadFilePromise,
	deleteFilePromise
}