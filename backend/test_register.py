#!/usr/bin/env python3
import requests
import json

API_URL = "http://localhost:8000"

# Test registration
print("Testing registration...")
data = {
    "email": "testuser@example.com",
    "password": "password123",
    "role": "student"
}

response = requests.post(f"{API_URL}/auth/register", json=data)
print(f"Status: {response.status_code}")
print(f"Response text: {response.text}")

if response.status_code == 200:
    print("\n✅ Registration successful!")
    print(f"Response: {response.json()}")
else:
    print("\n❌ Registration failed!")
