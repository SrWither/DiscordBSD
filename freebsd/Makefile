PORTNAME=	discordbsd
CATEGORIES=	net-im

MAINTAINER=	fjachuf@gmail.com
COMMENT=	An attempt at a native discord client for FreeBSD

LICENSE=	BSD3CLAUSE
LICENSE_FILE=	${WRKSRC}/LICENSE

USES=		electron:44 nodejs:24,build npm:npm

USE_GITHUB=	yes
GH_ACCOUNT=	SrWither
GH_PROJECT=	DiscordBSD
GH_TAGNAME=	main

SUB_FILES=	${PORTNAME}

USE_ELECTRON=	rebuild:electron build:forge

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npm run build
	${CP} ${WRKDIR}/${ELECTRON_DOWNLOAD_CACHE_DIR}/electron-v${UPSTREAM_ELECTRON_VER}-linux-${ELECTRON_ARCH}.zip \
		${WRKSRC}
do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin

.include <bsd.port.mk>
