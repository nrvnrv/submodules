import pathlib
import sys
sys.path.insert(0, pathlib.Path(__file__).parents[2].resolve().as_posix() + '/scripts')


# -- Project information -----------------------------------------------------
project = 'submodules'
copyright = '2023, nrv'
author = 'nrv'


# -- General configuration ---------------------------------------------------
extensions = [
    'sphinx.ext.duration',
    'sphinx.ext.autodoc',
    'sphinx.ext.autosummary',
]

templates_path = ['_templates']
exclude_patterns = []

language = 'ru'


# -- Options for HTML output -------------------------------------------------
html_theme = 'alabaster'

# import maisie_sphinx_theme
# extensions.append("maisie_sphinx_theme")
# html_theme = 'maisie_sphinx_theme'
# html_theme_path = maisie_sphinx_theme.html_theme_path()

# import sphinx_rtd_theme
# html_theme = 'sphinx_rtd_theme'
# html_theme_path = [sphinx_rtd_theme.get_html_theme_path()]

html_static_path = ['_static']


# # -- Options for php extension -------------------------------------------------
# from sphinx.highlighting import lexers
# from pygments.lexers.web import PhpLexer
# lexers['php'] = PhpLexer(startinline=True, linenos=1)
# lexers['php-annotations'] = PhpLexer(startinline=True, linenos=1)
# primary_domain = 'php'