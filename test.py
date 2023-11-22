import ply.lex as lex
import ply.yacc as yacc

tokens = (
    'VARIABLE_DECLARATION',
    'IF_STATEMENT',
    'WHILE_LOOP',
    'FUNCTION_DECLARATION',
    'FOR_LOOP',
    'OTHER',
)

t_VARIABLE_DECLARATION = r'let\s+[a-zA-Z_][a-zA-Z_0-9]\s;'
t_IF_STATEMENT = r'if\s*\([^)]\)\s{[^}]*}'
t_WHILE_LOOP = r'while\s*\([^)]\)\s{[^}]*}'
t_FUNCTION_DECLARATION = r'function\s+[a-zA-Z_][a-zA-Z_0-9]\s\([^)]\)\s{[^}]*}'
t_FOR_LOOP = r'for\s*\([^)]\)\s{[^}]*}'
t_OTHER = r'.'

def t_error(t):
    print(f"Illegal character: {t.value[0]}")
    t.lexer.skip(1)

lexer = lex.lex()

if _name_ == "_main_":
    code = input("Enter a JavaScript construct: ")

    lexer.input(code)
    token_found = False

    for token in lexer:
        if token.type != 'OTHER':
            token_found = True
            
            if token.type == 'VARIABLE_DECLARATION':
                print("Valid and Variable Declaration")
            elif token.type == 'IF_STATEMENT':
                print("Valid and If Statement")
            elif token.type == 'WHILE_LOOP':
                print("Valid and While Loop")
            elif token.type == 'FUNCTION_DECLARATION':
                print("Valid and Function Declaration")
            elif token.type == 'FOR_LOOP':
                print("Valid and For Loop")

    if not token_found:
        print("Invalid")