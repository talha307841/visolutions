#!/usr/bin/env python3
"""Prepare licensed Pexels clips for the Visolution website. No inference is run.

Requires Python 3 and ffmpeg. Example:
  python scripts/prepare-demo-assets.py --ffmpeg /path/to/ffmpeg
Only these reviewed source URLs are downloaded. See docs/MEDIA_PROVENANCE.md.
"""
import argparse
import pathlib
import shutil
import subprocess
import tempfile

ROOT = pathlib.Path(__file__).resolve().parents[1]
MEDIA = ROOT / 'public' / 'demo'
SOURCES = {
    'warehouse-operations': ('https://videos.pexels.com/video-files/10472376/10472376-hd_1920_1080_25fps.mp4', 5.04),
    'forklift-safety': ('https://videos.pexels.com/video-files/32243654/13751478_3840_2160_25fps.mp4', 12),
    'factory-ppe': ('https://videos.pexels.com/video-files/32243444/13751396_3840_2160_50fps.mp4', 15),
}

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--ffmpeg', default=shutil.which('ffmpeg'))
    args = parser.parse_args()
    if not args.ffmpeg:
        parser.error('ffmpeg is required; pass --ffmpeg /path/to/ffmpeg')
    (MEDIA / 'posters').mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='visolution-media-') as tmp:
        for name, (url, duration) in SOURCES.items():
            original = pathlib.Path(tmp) / f'{name}.mp4'
            print(f'Downloading {name} from Pexels', flush=True)
            subprocess.run(["curl", "-fL", "--retry", "2", "-o", str(original), url], check=True)
            output = MEDIA / f'{name}.mp4'
            subprocess.run([args.ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-i', str(original), '-t', str(duration), '-an', '-vf', 'scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2', '-r', '25', '-c:v', 'libx264', '-preset', 'medium', '-crf', '26', '-movflags', '+faststart', str(output)], check=True)
            subprocess.run([args.ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-ss', '0.24' if name == 'warehouse-operations' else '0', '-i', str(output), '-frames:v', '1', '-c:v', 'libwebp', '-quality', '75', str(MEDIA / 'posters' / f'{name}.webp')], check=True)
            print(f'Prepared {output.relative_to(ROOT)}', flush=True)
if __name__ == '__main__':
    main()
