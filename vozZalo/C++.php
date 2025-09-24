<?php
// Nhận dữ liệu JSON từ client
$data = json_decode(file_get_contents("php://input"), true);

if ($data && isset($data['latitude']) && isset($data['longitude'])) {
    $lat = $data['latitude'];
    $lon = $data['longitude'];
    $time = $data['timestamp'];

    // Ghi vào log (hoặc lưu CSDL)
    $log = "Time: $time | Lat: $lat | Lon: $lon\n";
    file_put_contents("locations.log", $log, FILE_APPEND);

    echo "Đã nhận dữ liệu vị trí!";
} else {
    echo "Dữ liệu không hợp lệ.";
}
?>
