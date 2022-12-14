const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


let sites = [
    {
        id: uuid(),
        division: "Barisal",
        district: "Barguna",
        upazila: "Barguna Sadar"
    },
    {
        id: uuid(),
        division: "Chittagong",
        district: "Noakhali",
        upazila: "Chatkhil"
    },
    {
        id: uuid(),
        division: "Dhaka",
        district: "Gazipur",
        upazila: "Kapasia"
    },
    {
        id: uuid(),
        division: "Dhaka",
        district: "Mymensingh",
        upazila: "Dhobaura"
    },
    {
        id: uuid(),
        division: "Khulna",
        district: "Meherpur",
        upazila: "Meherpur Sadar"
    },
    {
        id: uuid(),
        division: "Rangpur",
        district: "Thakurgaon",
        upazila: "Pirganj"
    },
    {
        id: uuid(),
        division: "Rajshahi",
        district: "Sirajganj",
        upazila: "Shahjadpur"
    }
]


app.get('/', function (req, res) {
    res.render('home')
})


// ========== SITES ROUTES =============
app.get('/sites', function (req, res) {
    res.render('sites/index', { sites })
})
app.get('/sites/new', function (req, res) {
    res.render('sites/new')
})
app.post('/sites', function (req, res) {
    const { division, district, upazila } = req.body;
    sites.push({ division, district, upazila, id: uuid() })
    res.redirect('/sites')
})
app.get('/sites/:id', function (req, res) {
    const { id } = req.params;
    const site = sites.find(site => site.id === id)
    res.render('sites/show', { site })
})
// Edit sites
app.get('/sites/:id/edit', function (req, res) {
    const { id } = req.params;
    const site = sites.find(site => site.id === id)
    res.render('sites/edit', { site })
})
// update names
app.patch('/sites/:id', function (req, res) {
    const { id } = req.params;
    const newUpazilaName = req.body.upazila;
    const newDistrictName = req.body.district;
    const newDivisionName = req.body.division;
    const foundSite = sites.find(site => site.id === id);
    foundSite.upazila = newUpazilaName;
    foundSite.district = newDistrictName;
    foundSite.division = newDivisionName;
    res.redirect('/sites')
})
// Delete sites

app.delete('/sites/:id', function (req, res) {
    const { id } = req.params;
    sites = sites.filter(site => site.id !== id);
    res.redirect('/sites')
})

// ======================================





app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.render('subreddit', { subreddit });
})



app.get('*', function (req, res) {
    res.send('no valid route')
})



app.listen(3000)