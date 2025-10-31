-- Create database
CREATE DATABASE IF NOT EXISTS subscription_manager;
USE subscription_manager;

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'TWD',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  cycle ENUM('30days', '6months', '1year') NOT NULL,
  icon_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO subscriptions (name, brand, price, currency, start_date, end_date, cycle) VALUES
('Netflix Premium', 'netflix', 270.00, 'TWD', '2024-01-01', '2024-12-31', '1year'),
('Spotify Premium', 'spotify', 149.00, 'TWD', '2024-01-15', '2024-01-14', '30days');