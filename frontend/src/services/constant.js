// require('dotenv').config()

export const BASE_URL = process.env.NODE_ENV === 'development' ?
    `http://localhost:3001/` :
    'https://mys-jodhpur.onrender.com'

export const S3_ACCESS_KEY = process.env.REACT_APP_S3_ACCESS_KEY
export const S3_SECRET_KEY = process.env.REACT_APP_S3_SECRET_KEY
export const S3_REGION = process.env.REACT_APP_S3_REGION
export const S3_BUCKET_NAME = process.env.REACT_APP_S3_BUCKET_NAME
export const S3_URL = process.env.REACT_APP_S3_URL
export const BASE_IMG_URL = process.env.REACT_APP_BASE_IMG_URL


