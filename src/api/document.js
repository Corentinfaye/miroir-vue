const _baseApiURL = `${process.env.VUE_APP_API_URL}`;


async function getMetadataFromApi(id, options={}) {
    const response_metadata = await fetch(`${_baseApiURL}/collections?id=${id}`, {mode: 'cors', ...options})
    const metadata = await response_metadata.json()
    return metadata
}

async function getDocumentFromApi(id, options={}) {
    const response = await fetch(`${_baseApiURL}/document?id=${id}&format=html`, {mode: 'cors', ...options})
    const document = await response.text()
    return document
}

async function getPositionAnneeFromApi(id, options={}) {
    const response = await fetch(`${_baseApiURL}/collections?id=ENCPOS_${id}`, {mode: 'cors', ...options})
    const document = await response.json()
    return document
}

async function getMetadataMiroirFromApi(options={}){
    const response = await fetch(`${_baseApiURL}/collections?id=${process.env.VUE_APP_APP_ROOT_COLLECTION}`, {mode: 'cors', ...options})
    const document = await response.json()
    return document
}

export {
    getDocumentFromApi,
    getMetadataFromApi,
    getPositionAnneeFromApi,
    getMetadataMiroirFromApi
}