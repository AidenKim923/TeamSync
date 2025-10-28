import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.local')

app = Celery('config')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

# Celery Beat 스케줄 설정
app.conf.beat_schedule = {
    'send-daily-reports': {
        'task': 'apps.tasks.tasks.send_daily_reports',
        'schedule': crontab(hour=9, minute=0),  # 매일 오전 9시
    },
    'backup-database': {
        'task': 'apps.core.tasks.backup_database',
        'schedule': crontab(hour=2, minute=0),  # 매일 새벽 2시
    },
}


@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
