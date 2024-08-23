const { randomBytes } = await import("node:crypto")

export const serializeNonPOJOs = (obj) => {
     return structuredClone(obj)
}

export const generateUsername = (name) => {

     const id = randomBytes(2).toString('hex')
     return `${name.slice(0, 5)}${id}`

}


export const getImageURL = (collectionId, recordId, fileName, size = '80x80') => {
	return `http://localhost:8090/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};



export const validateData = async (formData, schema) => {
	const body = Object.fromEntries(formData);

	try {
		const data = schema.parse(body);
		return {
			formData: data,
			errors: null
		};
	} catch (err) {
		console.log('Error: ', err);
		const errors = err.flatten();
		return {
			formData: body,
			errors: errors
		};
	}
};

export const timeDifference = (current, previous) => {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + `${Math.round(elapsed/msPerDay) === 1 ? " second ago" : " seconds ago"}`;   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + `${Math.round(elapsed/msPerDay) === 1 ? " minute ago" : " minutes ago"}`;   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + `${Math.round(elapsed/msPerDay) === 1 ? " hour ago" : " hours ago"}`;   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + `${Math.round(elapsed/msPerDay) === 1 ? " day ago" : " days ago"}`;   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + `${Math.round(elapsed/msPerDay) === 1 ? " month ago" : " months ago"}`;   
    }

    else {
        return Math.round(elapsed/msPerYear ) + `${Math.round(elapsed/msPerDay) === 1 ? " year ago" : " years ago"}`;   
    }
}

export const parseDate = (date) => {
     const postDate = new Date(date)
     const nowDate = new Date()

     const displayDate = (timeDifference(nowDate, postDate))

     return displayDate
 }

 export const parseTooltipDate = (date) => {
     const dateVar = new Date(date)

     const options = {hour: 'numeric', minute : 'numeric', day: 'numeric', month : 'short', second : 'numeric', year: 'numeric'}

     return dateVar.toLocaleString('en', options)
 }


export const handleLoginRedirect = (url, message = "You must be logged in to access this page") => {

    const redirectTo = url.pathname + url.search

    return `/login/?redirectTo=${redirectTo}&message=${message}`

}