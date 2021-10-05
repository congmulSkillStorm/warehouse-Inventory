import { Router } from 'express';
import { resolve } from 'path';
import { withParentCompany, withLoggedId, withLoggedIdForloginPage } from '../utils/auth.js'

const router = Router();

router.get('/', withLoggedIdForloginPage, (req, res) => {
    res.status(200).sendFile(resolve('public', 'views', 'pages', 'loginForm.html'));
})

router.get('/home', withParentCompany, (req, res) => {
    res.status(200).sendFile(resolve('public', 'views', 'pages', 'homePage.html'));
})

router.get('/warehouse', withLoggedId, (req, res) => {
    res.status(200).sendFile(resolve('public', 'views', 'pages', 'warehouse.html'));
})

// TODO: Add Not found page
router.get('*', (req, res) => {
    res.status(200).sendFile(resolve('public', 'views', 'pages', 'loginForm.html'));
})

export default router;