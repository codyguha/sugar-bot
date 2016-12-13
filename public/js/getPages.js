function getPages(id, cb) {
    if (!cb) cb = Function.prototype
    request({
      method: 'GET',
      uri: `https://graph.facebook.com/v2.8/${id}/accounts`,
      qs: {
        fields: 'name',
        access_token: process.env.page_token
      },
      json: true
    }, function(err, res, body) {
      if (err) return cb(err)
      if (body.error) return cb(body.error)
      console.log(body)
      cb(null, body)
    })
}
