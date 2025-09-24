const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// API nhận vị trí từ client
app.post('/api/location', (req, res) => {
  const { latitude, longitude } = req.body;
  const location = {
    latitude,
    longitude,
    timestamp: new Date().toISOString()
  };

  // Đọc file cũ
  let data = [];
  if (fs.existsSync('locations.json')) {
    data = JSON.parse(fs.readFileSync('locations.json', 'utf8'));
  }

  // Thêm mới
  data.push(location);

  // Ghi lại
  fs.writeFileSync('locations.json', JSON.stringify(data, null, 2));

  res.json({ success: true });
});

// API để admin lấy danh sách vị trí
app.get('/api/locations', (req, res) => {
  if (fs.existsSync('locations.json')) {
    const data = JSON.parse(fs.readFileSync('locations.json', 'utf8'));
    res.json(data);
  } else {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
