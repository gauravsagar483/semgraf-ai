-- Ecommerce toy fixture for Semgraf demos.
-- Synthetic data only.

CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY,
  name VARCHAR,
  segment VARCHAR,
  country VARCHAR
);

CREATE TABLE products (
  product_id INTEGER PRIMARY KEY,
  name VARCHAR,
  category VARCHAR,
  unit_price DOUBLE
);

CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  order_date DATE,
  status VARCHAR
);

CREATE TABLE order_items (
  order_item_id INTEGER PRIMARY KEY,
  order_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  line_total DOUBLE
);

INSERT INTO customers VALUES
  (1, 'Acme Retail', 'enterprise', 'US'),
  (2, 'Beta Shop', 'smb', 'US'),
  (3, 'Cascade Co', 'smb', 'CA'),
  (4, 'Delta Goods', 'enterprise', 'UK');

INSERT INTO products VALUES
  (10, 'Widget A', 'widgets', 25.0),
  (11, 'Widget B', 'widgets', 40.0),
  (12, 'Gadget X', 'gadgets', 120.0),
  (13, 'Gadget Y', 'gadgets', 90.0);

INSERT INTO orders VALUES
  (100, 1, '2025-01-05', 'completed'),
  (101, 2, '2025-01-08', 'completed'),
  (102, 1, '2025-02-01', 'completed'),
  (103, 3, '2025-02-14', 'completed'),
  (104, 4, '2025-03-01', 'cancelled'),
  (105, 2, '2025-03-10', 'completed');

INSERT INTO order_items VALUES
  (1000, 100, 10, 4, 100.0),
  (1001, 100, 12, 1, 120.0),
  (1002, 101, 11, 2, 80.0),
  (1003, 102, 13, 3, 270.0),
  (1004, 103, 10, 10, 250.0),
  (1005, 104, 12, 1, 120.0),
  (1006, 105, 11, 5, 200.0),
  (1007, 105, 13, 1, 90.0);
