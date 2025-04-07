from logging.config import dictConfig

dictConfig({
    "version": 1,
    "formatters": {
		"simple": {
			"format": "%(name)s - %(levelname)s - %(message)s"
		}
    },
    "handlers": {
		"console": {
			"class": "logging.StreamHandler",
			"formatter": "simple",
			"stream": "ext://sys.stdout"
		}
    },
    "root": {
		"level": "INFO",
		"handlers": ["console"],
		"propagate": False
    }
})