import httpx
from bs4 import BeautifulSoup
import json
import asyncio

base_url = 'https://3.shkolkovo.online/catalogs'

math_url = 'https://3.shkolkovo.online/catalog?SubjectId=1'
russ_url = 'https://3.shkolkovo.online/catalog?SubjectId=2'
inf_url = 'https://3.shkolkovo.online/catalog?SubjectId=30'
phys_url = 'https://3.shkolkovo.online/catalog?SubjectId=4'

all_urls = [math_url, russ_url, phys_url, inf_url]

math_themes = {}
russ_themes = {}
phys_themes = {}
inf_themes  = {}

async def fetch_tasks():
    async with httpx.AsyncClient() as client:
        for url in all_urls:
            response = await client.get(url)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'lxml')
            
            subject_lst = soup.find('h1', class_='Titles_title_48__trNVt DSStyle_mainSection__h1__RtZRc').text.split()
            subject = ' '.join(subject_lst).lower()
            
            if 'математика' in subject:
                final_lst = math_themes
            elif 'русский' in subject:
                final_lst = russ_themes
            elif 'информатика' in subject:
                final_lst = inf_themes
            elif 'физика' in subject:
                final_lst = phys_themes
            else:
                continue
            
            themes = soup.find_all('div', class_='AccordionStyles_accordion__title_wrap__dIvpH')
            
            
            
            for theme in themes:
                final_lst.append(theme.text)


asyncio.run(fetch_tasks())
print(math_themes)
print(russ_themes)
print(inf_themes)
print(phys_themes)
