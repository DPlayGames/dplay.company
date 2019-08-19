RUN(() => {
	
	let names = ['sim', 'cho', 'kim', 'chen'];
	
	let detailPanel = DOM({
		el : document.getElementById('member-detail')
	});
	
	let nowLine;
	
	EACH(names, (name, i) => {
		
		let memeberPanel = DOM({
			el : document.getElementById('member-' + name)
		});
		
		let detail = document.querySelector('#member-' + name + ' .detail');
		
		let line = DOM({
			el : document.getElementById('member-line-' + name)
		});
		line.addStyle({
			height : 1
		});
		
		memeberPanel.on('mouseover', () => {
			
			if (WIN_WIDTH() > 1000) {
				
				if (nowLine !== undefined) {
					nowLine.addStyle({
						height : 1
					});
				}
				
				line.addStyle({
					height : 20
				});
				
				detailPanel.empty();
				detailPanel.getEl().innerHTML = detail.innerHTML;
				
				nowLine = line;
			}
		});
		
		if (i === 0 && WIN_WIDTH() > 1000) {
			memeberPanel.fireEvent('mouseover');
		}
	});
	
	let langStore = STORE('langStore');
	
	let browserLang = MSG({
		en : 'en',
		ko : 'ko',
		'zh-TW' : 'zh-TW',
		'zh-CN' : 'zh-CN'
	});
	
	let changePageByLang = (lang) => {
		
		if (browserLang !== lang) {
			
			if (lang === 'en') {
				location.href = 'index.html';
			}
			
			if (lang === 'ko') {
				location.href = 'index-kr.html';
			}
			
			if (lang === 'zh-TW') {
				location.href = 'index-zh-tw.html';
			}
			
			if (lang === 'zh-CN') {
				location.href = 'index-zh-cn.html';
			}
		}
	};
	
	let changeLangSelect = SELECT({
		style : {
			position : 'absolute',
			right : 10,
			top : 10,
			backgroundColor : '#1e1e1e',
			color : '#666',
			padding : '5px 8px',
			border : 'none'
		},
		c : [OPTION({
			value : 'en',
			c : 'English'
		}), OPTION({
			value : 'ko',
			c : '한국어'
		}), OPTION({
			value : 'zh-TW',
			c : '繁體中文'
		}), OPTION({
			value : 'zh-CN',
			c : '简体中文'
		})],
		value : pageLang,
		on : {
			change : (e, select) => {
				
				if (select.getValue() === 'en') {
					langStore.save({
						name : 'isToEnglishPage',
						value : true
					});
				}
				
				changePageByLang(select.getValue());
			}
		}
	}).appendTo(BODY);
	
	if (
	(pageLang === 'en' && langStore.get('isToEnglishPage') !== true) ||
	langStore.get('lang') === undefined) {
		
		langStore.save({
			name : 'lang',
			value : browserLang
		});
		
		changePageByLang(browserLang);
	}
});