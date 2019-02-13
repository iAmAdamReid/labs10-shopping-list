const itemDb = require('../../helpers/item.js');
const validators = require('../../validators/item/update.js');

module.exports = {
  type: 'PUT',
  url: '/item/:id',
  handler: (req, res) => {
    const {id} = req.params;
    let modififedItem = { 
      name,
      email,
      password,
      profilePicture,
      emailNotifications,
      textNotifications,
      role,
      subscriptionType,
    } = req.body;
    const changedKeys = Object.keys(modififedItem);
    const validations = changedKeys.map(key => validators[key](modififedItem));
    Promise.all(validations).then(() => {
      itemDb.update(id, modififedItem)
      .then(response => {
        if(response === undefined){
          res.status(404).json({message: "Item not found."});
        }else{
          res.status(200).json({ modififedItem });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The item could not be retrieved." });
      });
    }).catch(err => res.status(err.statusCode || 500).json(err.message));
  },
  //protected: true
}