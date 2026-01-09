#!/usr/bin/env python3
"""
Helper script to export case data to static JSON files for demo deployment.
Run this script whenever you want to update the demo with new cases.
"""

import json
import os
from pathlib import Path

def export_cases():
    """Export all cases from cases_data to frontend/public/cases"""
    
    cases_dir = Path("cases_data")
    output_dir = Path("frontend/public/cases")
    
    if not cases_dir.exists():
        print(f"❌ Error: {cases_dir} directory not found!")
        return
    
    # Create output directory if it doesn't exist
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Load all case files
    cases = {}
    case_files = list(cases_dir.glob("*.json"))
    
    if not case_files:
        print(f"⚠️  No case files found in {cases_dir}")
        return
    
    for case_file in case_files:
        try:
            case_id = case_file.stem  # Filename without .json extension
            with open(case_file, "r", encoding="utf-8") as f:
                case_data = json.load(f)
                cases[case_id] = case_data
            print(f"✓ Loaded case: {case_id}")
        except Exception as e:
            print(f"❌ Error loading {case_file}: {e}")
    
    # Write individual case files
    for case_id, case_data in cases.items():
        output_file = output_dir / f"{case_id}.json"
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(case_data, f, indent=2, ensure_ascii=False)
    
    # Write index file
    index_file = output_dir / "index.json"
    with open(index_file, "w", encoding="utf-8") as f:
        json.dump({
            "items": list(cases.values()),
            "total": len(cases)
        }, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Successfully exported {len(cases)} cases to {output_dir}/")
    print(f"   - Individual case files: {len(cases)}")
    print(f"   - Index file: index.json")

if __name__ == "__main__":
    export_cases()

