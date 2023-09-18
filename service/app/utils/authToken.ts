import jwt from 'jsonwebtoken'

const token = {
  checkToken(token, encrypt_key) {
    return new Promise(resolve => {
      jwt.verify(token, encrypt_key, function(err, decoded) {
        if (err) {
          console.log('check token failed', err)
          resolve(false)
        } else {
          // console.log('---decoded---', decoded)
          resolve(decoded)
        }
      })
    })
  }
}

export default token
