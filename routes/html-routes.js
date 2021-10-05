import { Router } from 'express';
import { resolve } from 'path';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).sendFile(resolve('public', 'views', 'pages', 'loginForm.html'));
})

router.get('/home', (req, res) => {
    res.status(200).sendFile(resolve('public', 'views', 'pages', 'homePage.html'));
})

// router.get('/account', (req, res) => {
//     res.status(200).sendFile(resolve('public', 'views', 'components', 'account.html'));
// })

// TODO: Add Not found page
router.get('*', (req, res) => {
    res.status(200).sendFile(resolve('public', 'views', 'pages', 'loginForm.html'));
})

export default router;