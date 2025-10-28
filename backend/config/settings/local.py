from .base import *

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0']

# Debug Toolbar
INSTALLED_APPS += ['debug_toolbar']
MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']

INTERNAL_IPS = ['127.0.0.1']

# 로컬에서는 콘솔에 이메일 출력
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# 로컬에서는 파일 시스템 사용
DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
