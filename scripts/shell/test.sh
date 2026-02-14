#!/bin/env bash

BASE_URL="http://localhost:6767/api/funds"

# 1. Create funds
echo -e "\n--- 1. Create Fund: Savings ---"
curl -s -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"name": "Savings", "amount": 1000.00, "description": "Emergency fund"}' | jq .

echo -e "\n--- 2. Create Fund: Investment ---"
curl -s -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"name": "Investment", "amount": 5000.50, "description": "Stock portfolio"}' | jq .

echo -e "\n--- 3. Create Fund: No Description ---"
curl -s -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"name": "Misc", "amount": 250}' | jq .

# 2. Get all funds
echo -e "\n--- 4. Get All Funds ---"
curl -s "$BASE_URL" | jq .

# 3. Get single fund
echo -e "\n--- 5. Get Fund by ID (1) ---"
curl -s "$BASE_URL/1" | jq .

# 4. Update a fund
echo -e "\n--- 6. Update Fund (1): Change amount ---"
curl -s -X PUT "$BASE_URL/1" \
  -H "Content-Type: application/json" \
  -d '{"amount": 1500.75}' | jq .

echo -e "\n--- 7. Update Fund (2): Change name & description ---"
curl -s -X PUT "$BASE_URL/2" \
  -H "Content-Type: application/json" \
  -d '{"name": "Long-term Investment", "description": "ETF + Bonds"}' | jq .

# 5. Delete a fund
echo -e "\n--- 8. Delete Fund (3) ---"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$BASE_URL/3")
echo "HTTP Status: $STATUS (expected 204)"

# 6. Verify deletion
echo -e "\n--- 9. Get All Funds (after delete) ---"
curl -s "$BASE_URL" | jq .

# 7. Error cases
echo -e "\n========================================="
echo "  Error Cases"
echo "========================================="

echo -e "\n--- 10. Get Non-existent Fund (999) ---"
curl -s "$BASE_URL/999" | jq .

echo -e "\n--- 11. Invalid ID (abc) ---"
curl -s "$BASE_URL/abc" | jq .

echo -e "\n--- 12. Create Fund: Missing required fields ---"
curl -s -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"description": "no name or amount"}' | jq .

echo -e "\n--- 13. Delete Non-existent Fund (999) ---"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$BASE_URL/999")
echo "HTTP Status: $STATUS (expected 404)"

echo -e "\n========================================="
echo "  Done!"
echo "========================================="