#!/usr/bin/env python3
import base64
import os
import plistlib
import sys

def extract_webarchive(webarchive_path, output_dir):
    # Создаем директорию для вывода, если она не существует
    os.makedirs(output_dir, exist_ok=True)
    
    # Чтение и парсинг plist файла
    with open(webarchive_path, 'rb') as f:
        plist = plistlib.load(f)
    
    # Извлечение основного ресурса (HTML)
    main_resource = plist.get('WebMainResource', {})
    if main_resource:
        url = main_resource.get('WebResourceURL', '')
        mime_type = main_resource.get('WebResourceMIMEType', '')
        text_encoding = main_resource.get('WebResourceTextEncodingName', 'UTF-8')
        data = main_resource.get('WebResourceData', b'')
        
        # Сохраняем основной HTML файл
        html_path = os.path.join(output_dir, 'index.html')
        with open(html_path, 'wb') as f:
            f.write(data)
        print(f"Сохранен основной HTML файл: {html_path}")
    
    # Извлечение дополнительных ресурсов (CSS, JS, изображения и т.д.)
    resources = plist.get('WebSubresources', [])
    for i, resource in enumerate(resources):
        url = resource.get('WebResourceURL', '')
        mime_type = resource.get('WebResourceMIMEType', '')
        data = resource.get('WebResourceData', b'')
        
        # Определяем имя файла из URL
        filename = url.split('/')[-1]
        if not filename or '?' in filename:
            # Если имя файла не определено или содержит параметры запроса,
            # создаем имя на основе типа MIME и индекса
            if 'javascript' in mime_type:
                ext = '.js'
            elif 'css' in mime_type:
                ext = '.css'
            elif 'image' in mime_type:
                ext = '.png' if 'png' in mime_type else '.jpg'
            else:
                ext = '.bin'
            filename = f"resource_{i}{ext}"
        
        # Сохраняем ресурс
        resource_path = os.path.join(output_dir, filename)
        with open(resource_path, 'wb') as f:
            f.write(data)
        print(f"Сохранен ресурс: {resource_path} ({mime_type})")

def main():
    if len(sys.argv) != 3:
        print(f"Использование: {sys.argv[0]} <путь_к_webarchive> <директория_вывода>")
        sys.exit(1)
    
    webarchive_path = sys.argv[1]
    output_dir = sys.argv[2]
    
    extract_webarchive(webarchive_path, output_dir)

if __name__ == "__main__":
    main()
