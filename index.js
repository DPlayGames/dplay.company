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
});