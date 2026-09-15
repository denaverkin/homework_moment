import express from 'express';
import moment from 'moment';

const app = express();
const PORT = 3000;

const products = [
  { id: 1, name: 'iPhone 15', price: 999, category: 'electronics' },
  { id: 2, name: 'MacBook Pro', price: 1999, category: 'electronics' },
  { id: 3, name: 'Office Chair', price: 150, category: 'furniture' },
  { id: 4, name: 'Dining Table', price: 450, category: 'furniture' },
  { id: 5, name: 'book 12', price: 15, category: 'books' },
  { id: 6, name: 'book 1', price: 30, category: 'books' }
];

function getCurrentDay() { return moment().format('dddd'); }
function getCurrentMonth() { return moment().format('MMMM'); }
function getCurrentYear() { return moment().format('YYYY'); }
function getCurrentDate() { return moment().format('dddd, MMMM D, YYYY'); }

function isWeekend() {
  if (moment().day() === 0 || moment().day() === 6) {
    return 'Today is a weekend';
  } else {
    return 'Today is a weekday';
  }
}

function getDaysUntilNewYear() {
  return `${moment([moment().year() + 1, 0]).diff(moment(), 'days')} days until New Year`;
}

function getAge(birthDate) {
  return `You are ${moment().diff(moment(birthDate, 'YYYY-MM-DD'), 'years')} years old`;
}

function getDaysUntilBirthday(birthDate) {
  let bdate = moment(birthDate);
  let nextBday = moment([moment().year(), bdate.month(), bdate.date()]);
  if (nextBday.isBefore(moment(), 'day')) {
    nextBday.add(1, 'year');
  }
  return `${nextBday.diff(moment().startOf('day'), 'days')} days until your birthday`;
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/stats', (req, res) => {
  const testBirthDate = "2005-12-20";
  res.status(200).json({
    uptime: Math.floor(process.uptime()),
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
    currentDay: getCurrentDay(),
    currentMonth: getCurrentMonth(),
    currentYear: getCurrentYear(),
    fullDate: getCurrentDate(),
    weekPeriod: isWeekend(),
    countdownNewYear: getDaysUntilNewYear(),
    ageDetails: getAge("2005-04-15"),
    countdownBirthday: getDaysUntilBirthday(testBirthDate)
  });
});

app.get('/products', (req, res) => {
  const { category, take } = req.query;

  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category.toLowerCase());
  }

  if (take) {
    const limit = parseInt(take, 10);
    if (!isNaN(limit) && limit > 0) {
      filteredProducts = filteredProducts.slice(0, limit);
    }
  }

  res.status(200).json(filteredProducts);
});

app.get('/products/:id', (req, res) => {
  const idParam = req.params.id;
  const productId = parseInt(idParam, 10);

  if (isNaN(productId)) {
    return res.status(400).json({ message: 'Invalid product ID format. ID must be a number.' });
  }

  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: `Product with ID ${productId} not found.` });
  }

  res.status(200).json(product);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
