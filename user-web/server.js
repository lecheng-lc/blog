// 当时为了解决路由重定向的问题
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
// let dev = false
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()
    server.get('/page/:pageNum', (req, res) => {
      const queryParams = { title: req.params.id }
      if(req.params.pageNum === '1') {
        res.redirect('/')
      } else {
        app.render(req, res, req.path, queryParams)
      } 
    })
    server.get('/', (req, res) => {
      const actualPage = '/page/1'
      const queryParams = { title: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })
    server.get('*', (req, res) => {
      return handle(req, res)
    })
    server.listen(3003, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3003')
    });
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })