PORTNAME=	discordbsd
CATEGORIES=	net-im

MAINTAINER=	fjachuf@gmail.com
COMMENT=	An attempt at a native discord client for FreeBSD

LICENSE=	BSD3CLAUSE
LICENSE_FILE=	${WRKSRC}/LICENSE

USES=		electron:25 nodejs:18,build

USE_GITHUB=	yes
GH_ACCOUNT=	SrWither
GH_PROJECT=	DiscordBSD
GH_TAGNAME=	main

SUB_FILES=	${PORTNAME}

USE_ELECTRON=	npm:npm prefetch extract rebuild:electron build:builder

PREFETCH_TIMESTAMP=	1689623431
# ELECTRON_MAKE_FLAGS+=	--config electron-builder.yaml

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npm run build

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin

.include <bsd.port.mk>
