#!/usr/bin/env python3
"""
Database Viewer - View all data in TPConnect database
Run: python view_database.py
"""

import sqlite3
import os

DB_PATH = "tpconnect.db"

def view_all_data():
    if not os.path.exists(DB_PATH):
        print(f"❌ Database not found at {DB_PATH}")
        return
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Get all tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    
    print("=" * 80)
    print("📊 TPCONNECT DATABASE - ALL DATA")
    print("=" * 80)
    
    for table in tables:
        table_name = table[0]
        print(f"\n{'='*80}")
        print(f"📋 TABLE: {table_name.upper()}")
        print(f"{'='*80}")
        
        # Get column names
        cursor.execute(f"PRAGMA table_info({table_name})")
        columns = [col[1] for col in cursor.fetchall()]
        
        # Get all data
        cursor.execute(f"SELECT * FROM {table_name}")
        rows = cursor.fetchall()
        
        if not rows:
            print("   (No data)")
        else:
            # Print header
            print("   " + " | ".join(columns))
            print("   " + "-" * 70)
            
            # Print rows
            for row in rows:
                print("   " + " | ".join(str(val) for val in row))
        
        print(f"\n   Total records: {len(rows)}")
    
    conn.close()
    print("\n" + "=" * 80)

if __name__ == "__main__":
    view_all_data()
