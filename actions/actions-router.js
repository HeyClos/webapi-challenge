const express = require('express');

const Actions = require('./');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        // we are passing req.query to the .find() method of Actions-model
      const actions = await Actions.find(req.query);
      res.status(200).json(actions);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the Actions',
      });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const hub = await Actions.findById(req.params.id);
  
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'Hub not found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hub',
      });
    }
  });
  
  router.post('/', async (req, res) => {
    try {
      const hub = await Actions.add(req.body);
      res.status(201).json(hub);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the hub',
      });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const count = await Actions.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    }
  });
  
  router.put('/:id', async (req, res) => {
    try {
      const hub = await Actions.update(req.params.id, req.body);
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the hub',
      });
    }
  });
  
  // add an endpoint that returns all the messages for a hub

router.get('/:id/messages', async (req, res) => {
    try {
        const messages = await Actions.findHubMessages(req.params.id);

        if (messages.length > 0) {
            res.status(200).json(messages);
        } else {
            res.status(404).json({ message: 'No messages for this hub' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the messages for this hub',
        });
    }
});

  // add an endpoint for adding new message to a hub

  router.post('/:id/messages', async (req, res) => {
      const messageInfo = { ...req.body, hub_id: req.params.id };
      try {
        const message = await Actions.addMessage(messageInfo);
        res.status(201).json(message);
      } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error adding the message'
        });
      }
  });

module.exports = router;