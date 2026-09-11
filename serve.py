#!/usr/bin/env python3
"""Local demo server: serves only public assets."""
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import socket, argparse, subprocess, ipaddress
parser = argparse.ArgumentParser(description='此刻有声音乐节原型')
parser.add_argument('--port', type=int, default=8765)
args = parser.parse_args()
root = Path(__file__).resolve().parent / 'dist'
try:
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        s.connect(('192.0.2.1', 9))
        host = s.getsockname()[0]
except OSError:
    host = '127.0.0.1'
print(f'Local: http://localhost:{args.port}', flush=True)
for interface in ['en0', 'en1']:
    try:
        candidate = subprocess.check_output(['ipconfig', 'getifaddr', interface], stderr=subprocess.DEVNULL, text=True).strip()
        if candidate:
            host = candidate
            break
    except (OSError, subprocess.CalledProcessError):
        pass
if host.startswith('198.18.') or host == '127.0.0.1':
    print('如需手机扫码，请从系统网络设置查看本机 Wi-Fi IP，用 http://本机IP:'+str(args.port)+' 在电脑打开后生成二维码。', flush=True)
else:
    print(f'手机与电脑连接同一 Wi-Fi，电脑请打开 http://{host}:{args.port} 再生成二维码。', flush=True)
print('按 Ctrl+C 停止。仅用于可信本地网络的原型演示。', flush=True)
try:
    ThreadingHTTPServer(('0.0.0.0', args.port), partial(SimpleHTTPRequestHandler, directory=str(root))).serve_forever()
except KeyboardInterrupt:
    print('\n已停止。')
