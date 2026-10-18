from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.void_elements = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
        
    def handle_starttag(self, tag, attrs):
        if tag not in self.void_elements:
            self.tags.append(tag)

    def handle_endtag(self, tag):
        if not self.tags:
            print(f"Error: Found end tag </{tag}> but no start tags are open.")
            return
        last_tag = self.tags.pop()
        if last_tag != tag:
            print(f"Error: Mismatched tag. Expected </{last_tag}> but found </{tag}>.")
            self.tags.append(last_tag) # push back to continue parsing

parser = MyHTMLParser()
with open('d:\\aman\\index.html', 'r', encoding='utf-8') as f:
    parser.feed(f.read())
    
if parser.tags:
    print("Error: Unclosed tags remaining:", parser.tags)
else:
    print("No HTML matching errors found in index.html")
