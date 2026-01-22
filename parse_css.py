import re

def parse_css(css_content):
    rules = {}
    selector_pattern = re.compile(r'([^{]+)\{([^}]+)\}')
    for match in selector_pattern.finditer(css_content):
        selectors = [s.strip() for s in match.group(1).split(',') if s.strip()]
        properties = {prop.split(':')[0].strip(): prop.split(':')[1].strip() for prop in match.group(2).split(';') if prop.strip() if ':' in prop]}
        for selector in selectors:
            if selector not in rules:
                rules[selector] = []
            rules[selector].append(properties)
    return rules

with open('src/styles/global.css', 'r') as f:
    global_css_content = f.read()

with open('src/styles/styles.css', 'r') as f:
    styles_css_content = f.read()

global_rules = parse_css(global_css_content)
styles_rules = parse_css(styles_css_content)

# Now, compare and remove duplicates
non_redundant_styles_rules = []

# Helper to convert rule dicts to a comparable string (for exact match)
def rule_to_string(selector, properties):
    props_str = ';'.join(sorted([f'{k}: {v}' for k, v in properties.items()]))
    return f'{selector}{{{props_str}}}'

# Keep track of rules already added to avoid re-adding if they appear multiple times in styles.css
added_rules_signatures = set()

for selector, properties_list in styles_rules.items():
    for properties in properties_list:
        is_redundant = False
        if selector in global_rules:
            for global_properties in global_rules[selector]:
                if properties == global_properties:
                    is_redundant = True
                    break
        
        if not is_redundant:
            # Before adding, check if this exact rule (selector + properties) has already been added
            current_rule_signature = rule_to_string(selector, properties)
            if current_rule_signature not in added_rules_signatures:
                non_redundant_styles_rules.append((selector, properties))
                added_rules_signatures.add(current_rule_signature)

# Reconstruct styles.css content, trying to preserve original formatting where possible
# This is a basic reconstruction and might not perfectly match original formatting
new_styles_content_lines = []

# Preserve initial comments and non-rule content from styles.css if any
# This part is complex without a full AST parser, so I will reconstruct from parsed rules
# and add a simple header.

new_styles_content_lines.append("/* Vokabulo Shared Styles - Deduped */\n")

for selector, properties in non_redundant_styles_rules:
    new_styles_content_lines.append(f'{selector} {{')
    for k, v in properties.items():
        new_styles_content_lines.append(f'  {k}: {v}; ')
    new_styles_content_lines.append(f'}}\n')

final_new_styles_content = "\n".join(new_styles_content_lines)

print(final_new_styles_content)

with open('src/styles/styles.css', 'w') as f:
    f.write(final_new_styles_content)

print("--- DEDUPLICATION COMPLETE ---")