const router = require('express').Router();
const db = require('../data/dbConfig');

//
//Get
router.get('/', async (req, res) => {
    let accounts = await db.select().table('accounts');
    if (!accounts || accounts == null) {
        res.status(500).json({ error: 'There was an error' });
    }
    console.log(accounts);
    res.json(accounts);
});

//
//Get specific account
router.get('/:id', async (req, res) => {
    console.log(req.params);
    try {
        let account = await db('accounts').where('id', req.params.id);
        console.log(account);
        if (!account || account == null) {
            res.status(500).json({ error: 'Failed to get account' });
        }
        res.status(200).json(account);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get account' });
    }
});

//
//Post
router.post('/', async (req, res) => {
    let inserted = await db('accounts').insert(({ name, budget } = req.body));
    if (!inserted || inserted == null) {
        res.status(500).json({ error: 'Failed to save account' });
    }
    res.status(200).json({
        message: 'Successfully saved account',
        account: inserted,
    });
});

//
//Put
router.put('/:id', async (req, res) => {
    try {
        let updated = await db('accounts')
            .where('id', req.params.id)
            .update({ name: req.body.name, budget: req.body.budget });
        res.status(200).json({ message: 'success', updated });
    } catch (err) {
        res.status(500).json(err);
    }
});

//
//Delete
router.delete('/:id', async (req, res) => {
    try {
        let deleted = await db('accounts')
            .where('id', req.params.id)
            .del();
        if (!deleted || deleted == null) {
            res.status(500).json({ error: 'error deleting account' });
        }
        res.status(200).json({ message: 'successfully deleted', deleted });
    } catch (err) {}
});

module.exports = router;
