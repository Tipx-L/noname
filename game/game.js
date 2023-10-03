"use strict";
{
	if(!localStorage.getItem('gplv3_noname_alerted')){
		if(confirm('①无名杀是一款基于GPLv3协议的开源软件！\n你可以在遵守GPLv3协议的基础上任意使用，修改并转发《无名杀》，以及所有基于《无名杀》开发的拓展。\n点击“确定”即代表您认可并接受GPLv3协议↓️\nhttps://www.gnu.org/licenses/gpl-3.0.html\n②无名杀官方发布地址仅有GitHub仓库！\n其他所有的所谓“无名杀”社群（包括但不限于绝大多数“官方”QQ群、QQ频道等）均为玩家自发组织，与无名杀官方无关！')){
			localStorage.setItem('gplv3_noname_alerted',true);
		}
		else{
			const ua=navigator.userAgent.toLowerCase();
			const ios=ua.includes('iphone')||ua.includes('ipad')||ua.includes('macintosh');
			//electron
			if(typeof window.process=='object'&&typeof window.require=='function'){
				const versions=window.process.versions;
				const electronVersion=parseFloat(versions.electron);
				let remote;
				if(electronVersion>=14){
					remote=require('@electron/remote');
				}else{
					remote=require('electron').remote;
				}
				const thisWindow=remote.getCurrentWindow();
				thisWindow.destroy();
				window.process.exit();
			}
			//android-cordova环境
			//ios-cordova环境或ios浏览器环境
			//非ios的网页版
			else if(!ios){
				window.close();
			}
		}
	}
	const GeneratorFunction=(function*(){}).constructor;
	// gnc: GeNCoroutine
	const gnc={
		of:fn=>gnc.is.generatorFunc(fn)?function genCoroutine(){
			let gen=fn.apply(this,arguments);
			gen.status="next";
			gen.state=undefined;
			const callback=(resolve,reject)=>{
				let result,
					nexts=resolve,
					throws=reject;
				try{
					result=gen[gen.status](gen.state);
				}catch(error){
					reject(error);
					return;
				}
				if(!result.done){
					nexts=(item)=>{
						gen.state=item;
						gen.status="next";
						callback(resolve,reject);
					}
					throws=(err)=>{
						gen.state=err;
						gen.status="throw";
						callback(resolve,reject);
					}
				}
				result=result.value;
				Promise.resolve(result).then(nexts,throws);
			}
			return new Promise(callback);
		}:(()=>{throw new TypeError("gnc.of needs a GeneratorFunction.")})(),
		is:{
			coroutine:item=>typeof item=="function"&&item.name=="genCoroutine",
			generatorFunc:item=>item instanceof GeneratorFunction,
			generator:item=>(typeof item=="object")&&("constructor" in item)&&item.constructor&&("constructor" in item.constructor)&&item.constructor.constructor===GeneratorFunction
		}
	};
	const _status={
		paused:false,
		paused2:false,
		paused3:false,
		over:false,
		clicked:false,
		auto:false,
		event:{
			finished:true,
			next:[],
			after:[]
		},
		ai:{},
		lastdragchange:[],
		skillaudio:[],
		dieClose:[],
		dragline:[],
		dying:[],
		globalHistory:[{
			cardMove:[],
			custom:[],
			useCard:[],
			changeHp:[],
			everything:[],
		}],
		cardtag:{
			yingbian_zhuzhan:[],
			yingbian_kongchao:[],
			yingbian_fujia:[],
			yingbian_canqu:[],
			yingbian_force:[]
		},
		renku:[],
		prehidden_skills:[],
		postReconnect:{},
	};
	const lib={
		configprefix:'noname_0.9_',
		versionOL:27,
		updateURLS:{
			coding:'https://raw.fgit.cf/libccy/noname',
			github:'https://raw.githubusercontent.com/libccy/noname',
		},
		updateURL:'https://raw.githubusercontent.com/libccy/noname',
		mirrorURL:'https://raw.fgit.cf/libccy/noname',
		hallURL:'47.99.105.222',
		assetURL:'',
		changeLog:[],
		updates:[],
		canvasUpdates:[],
		video:[],
		skilllist:[],
		connectBanned:[],
		characterIntro:{},
		characterTitle:{},
		characterPack:{},
		characterFilter:{},
		characterSort:{},
		characterReplace:{},
		characterGuozhanFilter:["mode_guozhan"],
		dynamicTranslate:{},
		cardPack:{},
		skin:{},
		onresize:[],
		onphase:[],
		onwash:[],
		onover:[],
		ondb:[],
		ondb2:[],
		chatHistory:[],
		emotionList:{
			xiaowu_emotion:14,
			xiaokuo_emotion:8,
			shibing_emotion:15,
			guojia_emotion:20,
			zhenji_emotion:20,
			xiaosha_emotion:20,
			xiaotao_emotion:20,
			xiaojiu_emotion:20,
		},
		animate:{
			skill:{},
			card:{},
		},
		onload:[],
		onload2:[],
		onprepare:[],
		arenaReady:[],
		onfree:[],
		inpile:[],
		inpile_nature:[],
		extensions:[],
		extensionPack:{},
		cardType:{},
		hook:{globaltrigger:{},globalskill:{}},
		//函数钩子
		hooks:{
			// 本体势力的颜色
			addGroup:[(id,_short,_name,config)=>{
				if("color" in config&&config.color!=null){
					let color1,color2,color3,color4;
					if (typeof config.color=="string"&&/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(config.color)){
						let c1=parseInt(`0x${item[1].slice(1, 3)}`);
						let c2=parseInt(`0x${item[1].slice(3, 5)}`);
						let c3=parseInt(`0x${item[1].slice(5, 7)}`);
						color1=color2=color3=color4=[c1,c2,c3,1];
					}
					else if(Array.isArray(config.color)&&config.color.length==4){
						if(config.color.every(item=>Array.isArray(item))){
							color1=config.color[0];
							color2=config.color[1];
							color3=config.color[2];
							color4=config.color[3];
						}
						else color1=color2=color3=color4=config.color;
					}
					if(color1&&color2&&color3&&color4){
						const cs=lib.linq.cselector;
						const g1=cs.group(
							cs.of(
								cs.class("player","identity"),
								cs.isAttr("data-color",`"${id}"`)
							),
							cs.of(
								"div",
								cs.isAttr("data-nature",`"${id}"`)
							),
							cs.of(
								"span",
								cs.isAttr("data-nature",`"${id}"`)
							)
						);
						const g2=cs.group(
							cs.of(
								"div",
								cs.isAttr("data-nature",`"${id}m"`)
							),
							cs.of(
								"span",
								cs.isAttr("data-nature",`"${id}m"`)
							)
						);
						const g3=cs.group(
							cs.of(
								"div",
								cs.isAttr("data-nature",`"${id}mm"`)
							),
							cs.of(
								"span",
								cs.isAttr("data-nature",`"${id}mm"`)
							)
						);
						let result={};
						result[g1]={
							textShadow:cs.group(
								"black 0 0 1px",
								`rgba(${color1.join()}) 0 0 2px`,
								`rgba(${color2.join()}) 0 0 5px`,
								`rgba(${color3.join()}) 0 0 10px`,
								`rgba(${color4.join()}) 0 0 10px`
							)
						};
						result[g2]={
							textShadow:cs.group(
								"black 0 0 1px",
								`rgba(${color1.join()}) 0 0 2px`,
								`rgba(${color2.join()}) 0 0 5px`,
								`rgba(${color3.join()}) 0 0 5px`,
								`rgba(${color4.join()}) 0 0 5px`,
								"black 0 0 1px"
							)
						};
						result[g3]={
							textShadow:cs.group(
								"black 0 0 1px",
								`rgba(${color1.join()}) 0 0 2px`,
								`rgba(${color2.join()}) 0 0 2px`,
								`rgba(${color3.join()}) 0 0 2px`,
								`rgba(${color4.join()}) 0 0 2px`,
								"black 0 0 1px"
							)
						};
						game.dynamicStyle.addObject(result);
						lib.groupnature[id]=id;
					}
				}
				if(typeof config.image=='string') Object.defineProperty(lib.card,`group_${id}`,{
					configurable:true,
					enumerable:false,
					writable:true,
					value:{
						fullskin:true,
						image:config.image
					}
				});
			}],
			//增加新属性杀
			addNature:[(nature,_translation,config)=>{
				if(typeof config!='object') config={};
				let linked=config.linked,order=config.order,background=config.background,lineColor=config.lineColor;
				if(typeof linked!='boolean') linked=true;
				if(typeof order!='number') order=0;
				if(typeof background!='string') background='';
				if(!Array.isArray(lineColor)||lineColor.length!=3) lineColor=[];
				else if(background.startsWith('ext:')){
					background=background.replace(/^ext:/,'extension/');
				}
				if(linked) lib.linked.add(nature);
				if(lineColor.length) lib.lineColor.set(nature,lineColor);
				lib.nature.set(nature,order);
				if(background.length>0) lib.natureBg.set(nature,background);

				let color1,color2;
				if (typeof config.color=="string"&&/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(config.color)){
					let c1=parseInt(`0x${item[1].slice(1, 3)}`);
					let c2=parseInt(`0x${item[1].slice(3, 5)}`);
					let c3=parseInt(`0x${item[1].slice(5, 7)}`);
					color1=color2=[c1,c2,c3,1];
				}
				else if(Array.isArray(config.color)&&config.color.length>=2&&config.color.length<=4){
					if(config.color.every(item=>Array.isArray(item))){
						color1=config.color[0];
						color2=config.color[1];
					}
					else{
						let color=config.color.slice();
						if(color.length==3) color.push(1);
						color1=color2=color;
					}
				}
				if(color1&&color2){
					const cs=lib.linq.cselector;
					const g1=cs.group(
						cs.of(
							cs.class("card","fullskin",`${nature}`),
							'>',
							cs.class("name")
						)
					);
					let result={};
					result[g1]={
						color:`rgba(${color1.join()})`,
						border:cs.merge(
							'1px',
							'solid',
							`rgba(${color2.join()})`
						),
					};
					game.dynamicStyle.addObject(result);

					const g2=cs.group(
						cs.of(
							cs.class("tempname",`${nature}`),
							':not([data-nature])>',
							cs.class("span")
						)
					)
					let result2={};
					result2[g2]={
						color:`rgba(${color1.join()})`,
					};
					game.dynamicStyle.addObject(result2);
				}
			}],
		},
		objectURL:new Map(),
		hookmap:{},
		imported:{},
		layoutfixed:['chess','tafang','stone'],
		pinyins:{
			_metadata:{
				shengmu:['zh','ch','sh','b','p','m','f','d','t','l','n','g','k','h','j','q','x','r','z','c','s','y','w'],
				special_shengmu:['j','q','x','y'],
				feijiemu:{
					i:['ing','iu','ie','in'],
					u:['ui','un'],
					ü:['üe','ün'],
				},
				zhengtirendu:['zhi','chi','shi','ri','zi','ci','si'],
				yunjiao:{
					'一麻':['a','ia','ua'],
					'二波':['o','e','uo'],
					'三皆':['ie','üe'],
					'四开':['ai','uai'],
					'五微':['ei','ui'],
					'六豪':['ao','iao'],
					'七尤':['ou','iu'],
					'八寒':['an','ian','uan','üan'],
					'九文':['en','in','un','ün'],
					'十唐':['ang','iang','uang'],
					'十一庚':['eng','ing','ong','ung'],
					'十二齐':['i','er','ü'],
					'十三支':['-i'],
					'十四姑':['u'],
				},
			}
		},
		//Yingbian
		//应变
		yingbian:{
			condition:{
				color:new Map([
					['zhuzhan','wood'],
					['kongchao','soil'],
					['fujia','orange'],
					['canqu','fire'],
					['force','metal']
				]),
				complex:new Map([
					['zhuzhan',function(event){
						const yingbianZhuzhan=game.createEvent('yingbianZhuzhan');
						yingbianZhuzhan.player=event.player;
						yingbianZhuzhan.card=event.card;
						yingbianZhuzhan._trigger=event;
						yingbianZhuzhan.yingbianZhuzhanAI=event.yingbianZhuzhanAI;
						yingbianZhuzhan.afterYingbianZhuzhan=event.afterYingbianZhuzhan;
						yingbianZhuzhan.setContent(()=>{
							'step 0'
							event._global_waiting=true;
							event.send=(player,card,source,targets,id,id2,yingbianZhuzhanAI,skillState)=>{
								if(skillState) player.applySkills(skillState);
								var type=get.type2(card),str=get.translation(source);
								if(targets&&targets.length) str+=`对${get.translation(targets)}`;
								str+=`使用了${get.translation(card)}，是否弃置一张${get.translation(type)}为其助战？`;
								player.chooseCard({
									filterCard:(card,player)=>get.type2(card)==type&&lib.filter.cardDiscardable(card,player),
									prompt:str,
									position:'h',
									_global_waiting:true,
									id:id,
									id2:id2,
									ai:typeof yingbianZhuzhanAI=='function'?yingbianZhuzhanAI(player,card,source,targets):cardx=>{
										var info=get.info(card);
										if(info&&info.ai&&info.ai.yingbian){
											var ai=info.ai.yingbian(card,source,targets,player);
											if(!ai) return 0;
											return ai-get.value(cardx);
										}
										else if(get.attitude(player,source)<=0) return 0;
										return 5-get.value(cardx);
									}
								});
								if(!game.online) return;
								_status.event._resultid=id;
								game.resume();
							};
							'step 1'
							var type=get.type2(card);
							event.list=game.filterPlayer(current=>current!=player&&current.countCards('h')&&(_status.connectMode||current.hasCard(cardx=>get.type2(cardx)==type,'h'))).sortBySeat(_status.currentPhase||player);
							event.id=get.id();
							'step 2'
							if(!event.list.length) event.finish();
							else if(_status.connectMode&&(event.list[0].isOnline()||event.list[0]==game.me)) event.goto(4);
							else event.send(event.current=event.list.shift(),event.card,player,trigger.targets,event.id,trigger.parent.id,trigger.yingbianZhuzhanAI);
							'step 3'
							if(result.bool){
								event.zhuzhanresult=event.current;
								event.zhuzhanresult2=result;
								if(event.current!=game.me) game.delayx();
								event.goto(8);
							}
							else event.goto(2);
							'step 4'
							var id=event.id,sendback=(result,player)=>{
								if(result&&result.id==id&&!event.zhuzhanresult&&result.bool){
									event.zhuzhanresult=player;
									event.zhuzhanresult2=result;
									game.broadcast('cancel',id);
									if(_status.event.id==id&&_status.event.name=='chooseCard'&&_status.paused) return ()=>{
										event.resultOL=_status.event.resultOL;
										ui.click.cancel();
										if(ui.confirm) ui.confirm.close();
									};
								}
								else if(_status.event.id==id&&_status.event.name=='chooseCard'&&_status.paused) return ()=>event.resultOL=_status.event.resultOL;
							},withme=false,withol=false,list=event.list;
							for(var i=0;i<list.length;i++){
								var current=list[i];
								if(current.isOnline()){
									withol=true;
									current.wait(sendback);
									current.send(event.send,current,event.card,player,trigger.targets,event.id,trigger.parent.id,trigger.yingbianZhuzhanAI,get.skillState(current));
									list.splice(i--,1);
								}
								else if(current==game.me){
									withme=true;
									event.send(current,event.card,player,trigger.targets,event.id,trigger.parent.id,trigger.yingbianZhuzhanAI);
									list.splice(i--,1);
								}
							}
							if(!withme) event.goto(6);
							if(_status.connectMode&&(withme||withol)) game.players.forEach(value=>{
								if(value!=player) value.showTimer();
							});
							event.withol=withol;
							'step 5'
							if(!result||!result.bool||event.zhuzhanresult) return;
							game.broadcast('cancel',event.id);
							event.zhuzhanresult=game.me;
							event.zhuzhanresult2=result;
							'step 6'
							if(event.withol&&!event.resultOL) game.pause();
							'step 7'
							game.players.forEach(value=>value.hideTimer());
							'step 8'
							if(event.zhuzhanresult){
								var target=event.zhuzhanresult;
								target.line(player,'green');
								target.discard(event.zhuzhanresult2.cards).discarder=target;
								if(typeof event.afterYingbianZhuzhan=='function') event.afterYingbianZhuzhan(event,trigger);
								var yingbianCondition=event.name.slice(8).toLowerCase(),yingbianConditionTag=`yingbian_${yingbianCondition}_tag`;
								target.popup(yingbianConditionTag,lib.yingbian.condition.color.get(yingbianCondition));
								game.log(target,'响应了',player,'发起的',yingbianConditionTag);
								target.addExpose(0.2);
								event.result={
									bool:true
								}
							}
							else event.result={
								bool:false
							};
						});
						yingbianZhuzhan._args=Array.from(arguments);
						return yingbianZhuzhan;
					}]
				]),
				simple:new Map([
					['kongchao',event=>!event.player.countCards('h')],
					['fujia',event=>event.player.isMaxHandcard()],
					['canqu',event=>event.player.getHp()==1]
				])
			},
			effect:new Map([
				['add',()=>{
					trigger.yingbian_addTarget=true;
				}],
				['remove',()=>{
					trigger.yingbian_removeTarget=true;
				}],
				['damage',()=>{
					if(typeof trigger.baseDamage!='number') trigger.baseDamage=1;
					trigger.baseDamage++;
					game.log(card,'的伤害值基数+1');
				}],
				['draw',()=>{
					player.draw();
				}],
				['gain',()=>{
					const cardx=trigger.respondTo;
					if(cardx&&cardx[1]&&cardx[1].cards&&cardx[1].cards.filterInD('od').length) player.gain(cardx[1].cards.filterInD('od'),'gain2');
				}],
				['hit',()=>{
					trigger.directHit.addArray(game.players).addArray(game.dead);
					game.log(card,'不可被响应');
				}],
				['all',()=>{
					card.yingbian_all=true;
					game.log(card,'执行所有选项');
				}]
			]),
			prompt:new Map([
				['add','目标+1'],
				['remove','目标-1'],
				['damage','伤害+1'],
				['draw','摸一张牌'],
				['gain','获得响应的牌'],
				['hit','此牌不可被响应'],
				['all','无视条件执行所有选项']
			])
		},
		//The actual card name
		//实际的卡牌名称
		actualCardName:new Map([
			['挟令','挟天子以令诸侯'],
			['霹雳投石车','霹雳车']
		]),
		characterDialogGroup:{
			'收藏':function(name,capt){
				return lib.config.favouriteCharacter.includes(name)?capt:null;
			},
			'最近':function(name,capt){
				var list=get.config('recentCharacter')||[];
				return list.includes(name)?capt:null;
			}
		},
		listenEnd:function(node){
			if(!node._listeningEnd){
				node._listeningEnd=true;
				node.listenTransition(function(){
					delete node._listeningEnd;
					if(node._onEndMoveDelete){
						node.moveDelete(node._onEndMoveDelete);
					}
					else if(node._onEndDelete){
						node.delete();
					}
					node._transitionEnded=true;
				});
			}
		},
		configMenu:{
			general:{
				name:'通用',
				config:{
					low_performance:{
						name:'流畅模式',
						init:false,
						intro:'减少部分游戏特效，提高游戏速度',
						onclick:function(bool){
							game.saveConfig('low_performance',bool);
							if(bool){
								ui.window.classList.add('low_performance');
							}
							else{
								ui.window.classList.remove('low_performance');
							}
						}
					},
					compatiblemode:{
						name:'兼容模式',
						init:false,
						intro:'开启兼容模式可防止扩展使游戏卡死并提高对旧扩展的兼容性，但对游戏速度有一定影响，若无不稳定或不兼容的扩展建议关闭',
						onclick:function(bool){
							game.saveConfig('compatiblemode',bool);
							if(bool){
								ui.window.classList.add('compatiblemode');
							}
							else{
								ui.window.classList.remove('compatiblemode');
							}
						}
					},
					confirm_exit:{
						name:'确认退出',
						init:false,
						unfrequent:true,
						intro:'离开游戏前弹出确认对话框',
					},
					keep_awake:{
						name:'屏幕常亮',
						init:false,
						unfrequent:true,
						intro:'防止屏幕自动关闭<br>注：旧版本通过NoSleep.js实现的屏幕常亮可能会影响外置音频的音量',
						onclick:function(bool){
							game.saveConfig('keep_awake',bool);
							if(bool){
								if(window.plugins&&window.plugins.insomnia) window.plugins.insomnia.keepAwake();
								else if(window.noSleep){
									document.addEventListener(lib.config.touchscreen?'touchend':'click', function enableNoSleepX() {
										document.removeEventListener(lib.config.touchscreen?'touchend':'click', enableNoSleepX, false);
										window.noSleep.enable();
									}, false);
								}
							}
							else{
								if(window.plugins&&window.plugins.insomnia) window.plugins.insomnia.allowSleepAgain();
								else if(window.noSleep) window.noSleep.disable();
							}
						}
					},
					auto_confirm:{
						name:'自动确认',
						init:true,
						unfrequent:true,
						intro:'当候选目标只有1个时，点击目标后无需再点击确认',
					},
					skip_shan:{
						name:'无闪自动取消',
						init:false,
						unfrequent:true,
						intro:'当自己需要使用或打出【闪】时，若自己没有【闪】，则跳过该步骤',
					},
					unauto_choose:{
						name:'拆顺手牌选择',
						init:false,
						unfrequent:true,
						intro:'拆牌或者顺牌时，就算只能选择对方的手牌依然手动选择',
					},
					wuxie_self:{
						name:'不无懈自己',
						init:true,
						unfrequent:true,
						intro:'自己使用的单目标普通锦囊即将生效时，不询问无懈',
					},
					tao_enemy:{
						name:'不对敌方出桃',
						init:false,
						intro:'双方阵营明确的模式中（如对决），敌方角色濒死时不询问出桃',
						unfrequent:true,
					},
					enable_drag:{
						name:'启用拖拽',
						init:true,
						intro:'按住卡牌后可将卡牌拖至目标',
						unfrequent:true,
					},
					enable_dragline:{
						name:'拖拽指示线',
						init:true,
						unfrequent:true,
						intro:'拖拽时显示虚线，可能降低游戏速度',
					},
					enable_touchdragline:{
						name:'拖拽指示线',
						init:false,
						unfrequent:true,
						intro:'拖拽时显示虚线，可能降低游戏速度',
					},
					// enable_pressure:{
					// 	name:'启用压感',
					// 	init:false,
					// 	intro:'开启后可通过按压执行操作',
					// 	unfrequent:true,
					// },
					// pressure_taptic:{
					// 	name:'触觉反馈',
					// 	init:false,
					// 	intro:'开启后按压操作执行时将产生震动',
					// 	unfrequent:true,
					// },
					// pressure_click:{
					// 	name:'按压操作',
					// 	init:'pause',
					// 	intro:'在空白区域按压时的操作',
					// 	unfrequent:true,
					// 	item:{
					// 		pause:'暂停',
					// 		config:'选项',
					// 		auto:'托管',
					// 	}
					// },
					touchscreen:{
						name:'触屏模式',
						init:false,
						restart:true,
						unfrequent:true,
						intro:'开启后可使触屏设备反应更快，但无法使用鼠标操作',
						onclick:function(bool){
							if(get.is.nomenu('touchscreen',bool)) return false;
							game.saveConfig('touchscreen',bool);
						}
					},
					swipe:{
						name:'滑动手势',
						init:true,
						unfrequent:true,
						intro:'在非滚动区域向四个方向滑动可执行对应操作',
					},
					swipe_down:{
						name:'下划操作',
						init:'menu',
						unfrequent:true,
						intro:'向下滑动时执行的操作',
						item:{
							system:'显示按钮',
							menu:'打开菜单',
							pause:'切换暂停',
							auto:'切换托管',
							chat:'显示聊天',
							off:'关闭',
						},
						onclick:function(item){
							if(get.is.nomenu('swipe_down',item)) return false;
							game.saveConfig('swipe_down',item);
						}
					},
					swipe_up:{
						name:'上划操作',
						intro:'向上滑动时执行的操作',
						init:'auto',
						unfrequent:true,
						item:{
							system:'显示按钮',
							menu:'打开菜单',
							pause:'切换暂停',
							auto:'切换托管',
							chat:'显示聊天',
							off:'关闭',
						},
						onclick:function(item){
							if(get.is.nomenu('swipe_up',item)) return false;
							game.saveConfig('swipe_up',item);
						}
					},
					swipe_left:{
						name:'左划操作',
						intro:'向左滑动时执行的操作',
						init:'system',
						unfrequent:true,
						item:{
							system:'显示按钮',
							menu:'打开菜单',
							pause:'切换暂停',
							auto:'切换托管',
							chat:'显示聊天',
							off:'关闭',
						},
						onclick:function(item){
							if(get.is.nomenu('swipe_left',item)) return false;
							game.saveConfig('swipe_left',item);
						}
					},
					swipe_right:{
						name:'右划操作',
						intro:'向右滑动时执行的操作',
						init:'system',
						unfrequent:true,
						item:{
							system:'显示按钮',
							menu:'打开菜单',
							pause:'切换暂停',
							auto:'切换托管',
							chat:'显示聊天',
							off:'关闭',
						},
						onclick:function(item){
							if(get.is.nomenu('swipe_right',item)) return false;
							game.saveConfig('swipe_right',item);
						}
					},
					round_menu_func:{
						name:'触屏按钮操作',
						intro:'点击屏幕中圆形按钮时执行的操作',
						init:'system',
						unfrequent:true,
						item:{
							system:'显示按钮',
							menu:'打开菜单',
							pause:'切换暂停',
							auto:'切换托管'
						},
						onclick:function(item){
							if(get.is.nomenu('round_menu_func',item)) return false;
							game.saveConfig('round_menu_func',item);
						},
					},
					show_splash:{
						name:'显示开始界面',
						intro:'游戏开始前进入模式选择画面',
						init:'init',
						item:{
							off:'关闭',
							init:'首次启动',
							always:'保持开启',
						}
					},
					game_speed:{
						name:'游戏速度',
						init:'mid',
						item:{
							vslow:'慢',
							slow:'较慢',
							mid:'中',
							fast:'较快',
							vfast:'快',
							vvfast:'很快',
						},
						intro:'设置不同游戏操作间的时间间隔'
					},
					sync_speed:{
						name:'限制结算速度',
						intro:'在动画结算完成前不执行下一步操作，开启后游戏操作的间隔更长但画面更浏畅，在游戏较卡时建议开启',
						init:true
					},
					enable_vibrate:{
						name:'开启震动',
						intro:'回合开始时使手机震动',
						init:false
					},
					right_click:{
						name:'右键操作',
						init:'pause',
						intro:'在空白区域点击右键时的操作',
						unfrequent:true,
						item:{
							pause:'暂停',
							shortcut:'工具',
							config:'选项',
							auto:'托管',
						},
						onclick:function(item){
							if(get.is.nomenu('right_click',item)) return false;
							game.saveConfig('right_click',item);
						}
					},
					longpress_info:{
						name:'长按显示信息',
						init:true,
						unfrequent:true,
						restart:true,
						intro:'长按后弹出菜单',
					},
					right_info:{
						name:'右键显示信息',
						init:true,
						unfrequent:true,
						restart:true,
						intro:'右键点击后弹出菜单',
					},
					hover_all:{
						name:'悬停显示信息',
						init:true,
						unfrequent:true,
						restart:true,
						intro:'悬停后弹出菜单',
					},
					hover_handcard:{
						name:'悬停手牌显示信息',
						init:true,
						unfrequent:true,
						intro:'悬停手牌后弹出菜单',
					},
					hoveration:{
						name:'悬停菜单弹出时间',
						unfrequent:true,
						intro:'鼠标移至目标到弹出菜单的时间间隔',
						init:'1000',
						item:{
							'500':'0.5秒',
							'700':'0.7秒',
							'1000':'1秒',
							'1500':'1.5秒',
							'2500':'2.5秒',
						}
					},
					doubleclick_intro:{
						name:'双击显示武将资料',
						init:true,
						unfrequent:true,
						intro:'双击武将头像后显示其资料卡',
					},
					video:{
						name:'保存录像',
						init:'20',
						intro:'游戏结束后保存录像在最大条数，超过后将从最早的录像开始删除（已收藏的录像不计入条数）',
						item:{
							'0':'关闭',
							'5':'五局',
							'10':'十局',
							'20':'二十局',
							'50':'五十局',
							'10000':'无限',
						},
						unfrequent:true,
					},
					max_loadtime:{
						name:'最长载入时间',
						intro:'设置游戏从启动到完成载入所需的最长时间，超过此时间未完成载入会报错，若设备较慢或安装了较多扩展可适当延长此时间',
						init:'5000',
						unfrequent:true,
						item:{
							5000:'5秒',
							10000:'10秒',
							20000:'20秒',
							60000:'60秒'
						},
						onclick:function(item){
							game.saveConfig('max_loadtime',item);
							if(item=='5000'){
								localStorage.removeItem(lib.configprefix+'loadtime');
							}
							else{
								localStorage.setItem(lib.configprefix+'loadtime',item);
							}
						}
					},
					mousewheel:{
						name:'滚轮控制手牌',
						init:true,
						unfrequent:true,
						intro:'开启后滚轮可使手牌横向滚动，在mac等可横向滚动的设备上建议关闭',
						onclick:function(bool){
							game.saveConfig('mousewheel',bool);
							if(lib.config.touchscreen) return;
							if(lib.config.mousewheel){
								ui.handcards1Container.onmousewheel=ui.click.mousewheel;
								ui.handcards2Container.onmousewheel=ui.click.mousewheel;
							}
							else{
								ui.handcards1Container.onmousewheel=null;
								ui.handcards2Container.onmousewheel=null;
							}
						}
					},
					auto_check_update:{
						name:'自动检查游戏更新',
						intro:'进入游戏时检查更新',
						init:false,
						unfrequent:true
					},
					lucky_star:{
						name:'幸运星模式',
						intro:'在涉及随机数等的技能中，必定得到效果最好的结果。（联机模式无效）',
						init:false,
						unfrequent:true
					},
					dev:{
						name:'开发者模式',
						intro:'开启后可使用浏览器控制台控制游戏，同时可更新到开发版',
						init:false,
						onclick:function(bool){
							game.saveConfig('dev',bool);
							if(_status.connectMode) return;
							if(bool){
								lib.cheat.i();
							}
							else{
								delete window.cheat;
								delete window.game;
								delete window.ui;
								delete window.get;
								delete window.ai;
								delete window.lib;
								delete window._status;
							}
						},
						unfrequent:true,
					},
					fuck_sojson:{
						name:'检测加密扩展',
						init:false,
					},
					errstop:{
						name:'出错时停止游戏',
						init:false,
						unfrequent:true
					},
					update_link:{
						name:'更新地址',
						init:'coding',
						unfrequent:true,
						item:{
							coding:'FastGit',
							github:'GitHub',
						},
						onclick:function(item){
							game.saveConfig('update_link',item);
							lib.updateURL=lib.updateURLS[item]||lib.updateURLS.coding;
						},
					},
					extension_source:{
						name:'获取扩展地址',
						init:'GitHub Proxy',
						unfrequent:true,
						item:{},
						intro:()=>`获取在线扩展时的地址。当前地址：${document.createElement('br').outerHTML}${lib.config.extension_sources[lib.config.extension_source]}`
					},
					extension_create:{
						name:'添加获取扩展地址',
						clear:true,
						unfrequent:true,
						onclick:function(){
							game.prompt('请输入地址名称',function(str){
								if(str){
									var map=lib.config.extension_sources;
									game.prompt('请输入'+str+'的地址',function(str2){
										if(str2){
											delete map[str];
											map[str]=str2;
											game.saveConfig('extension_sources',map);
											game.saveConfig('extension_source',str);
											var nodexx=ui.extension_source;
											nodexx.updateInner();
											var nodeyy=nodexx._link.menu;
											var nodezz=nodexx._link.config;
											for(var i=0;i<nodeyy.childElementCount;i++){
												if(nodeyy.childNodes[i]._link==str){
													nodeyy.childNodes[i].remove();
													break;
												}
											}
											var textMenu=ui.create.div('',str,nodeyy,function(){
												var node=this.parentNode._link;
												var config=node._link.config;
												node._link.current=this.link;
												var tmpName=node.lastChild.innerHTML;
												node.lastChild.innerHTML=config.item[this._link];
												if(config.onclick){
													if(config.onclick.call(node,this._link,this)===false){
														node.lastChild.innerHTML=tmpName;
													}
												}
												if(config.update){
													config.update();
												}
											});
											textMenu._link=str;
											nodezz.item[name]=str;
											alert('已添加扩展地址：'+str);
										}
									})
								}
							});
						},
					},
					extension_delete:{
						name:'删除当前扩展地址',
						clear:true,
						unfrequent:true,
						onclick:function(){
							var bool=false,map=lib.config.extension_sources;
							for(var i in map){
								if(i!=lib.config.extension_source){
									bool=true;
									break;
								}
							}
							if(!bool){
								alert('不能删除最后一个扩展地址！');
								return;
							}
							var name=lib.config.extension_source;
							game.saveConfig('extension_source',i);
							delete map[name];
							game.saveConfig('extension_sources',map);
							var nodexx=ui.extension_source;
							nodexx.updateInner();
							var nodeyy=nodexx._link.menu;
							var nodezz=nodexx._link.config;
							for(var i=0;i<nodeyy.childElementCount;i++){
								if(nodeyy.childNodes[i]._link==name){
									nodeyy.childNodes[i].remove();
									break;
								}
							}
							delete nodezz.item[name];
							alert('已删除扩展地址：'+name);
						},
					},
					update:function(config,map){
						if('ontouchstart' in document){
							map.touchscreen.show();
						}
						else{
							map.touchscreen.hide();
						}
						if(lib.device||lib.node){
							map.auto_check_update.show();
						}
						else{
							map.auto_check_update.hide();
						}
						if(lib.device){
							map.enable_vibrate.show();
							map.keep_awake.show();
						}
						else{
							map.enable_vibrate.hide();
							map.keep_awake.hide();
						}
						// if(config.enable_pressure){
						// 	map.pressure_click.show();
						// 	if(lib.device){
						// 		map.pressure_taptic.show();
						// 	}
						// 	else{
						// 		map.pressure_taptic.hide();
						// 	}
						// }
						// else{
						// 	map.pressure_click.hide();
						// 	map.pressure_taptic.hide();
						// }
						if(lib.config.touchscreen){
							map.mousewheel.hide();
							map.hover_all.hide();
							map.hover_handcard.hide();
							map.hoveration.hide();
							map.right_info.hide();
							map.right_click.hide();
							map.longpress_info.show();
							map.swipe.show();
							if(lib.config.swipe){
								map.swipe_up.show();
								map.swipe_down.show();
								map.swipe_left.show();
								map.swipe_right.show();
							}
							else{
								map.swipe_up.hide();
								map.swipe_down.hide();
								map.swipe_left.hide();
								map.swipe_right.hide();
							}
						}
						else{
							map.mousewheel.show();
							map.hover_all.show();
							map.right_info.show();
							map.right_click.show();
							map.longpress_info.hide();
							if(!config.hover_all){
								map.hover_handcard.hide();
								map.hoveration.hide();
							}
							else{
								map.hover_handcard.show();
								map.hoveration.show();
							}
							map.swipe.hide();
							map.swipe_up.hide();
							map.swipe_down.hide();
							map.swipe_left.hide();
							map.swipe_right.hide();
						}
						if(lib.config.enable_drag){
							if(lib.config.touchscreen){
								map.enable_dragline.hide();
								map.enable_touchdragline.show();
							}
							else{
								map.enable_dragline.show();
								map.enable_touchdragline.hide();
							}
						}
						else{
							map.enable_dragline.hide();
							map.enable_touchdragline.hide();
						}
						if(!get.is.phoneLayout()){
							map.round_menu_func.hide();
						}
						else{
							map.round_menu_func.show();
						}
						if(!lib.node&&lib.device!='ios'){
							map.confirm_exit.show();
						}
						else{
							map.confirm_exit.hide();
						}
						if(config.dev){
							map.errstop.show();
						}
						else{
							map.errstop.hide();
						}
					}
				}
			},
			appearence:{
				name:'外观',
				config:{
					theme:{
						name:'主题',
						init:'woodden',
						item:{},
						visualMenu:function(node,link){
							if(!node.menu){
								node.className='button character themebutton '+link;
								node.menu=ui.create.div(node,'','<div></div><div></div><div></div><div></div>');
							}
						},
						onclick:function(theme){
							game.saveConfig('theme',theme);
							ui.arena.hide();
							lib.init.background();
							if(lib.config.autostyle){
								if(theme=='simple'){
									lib.configMenu.appearence.config.player_border.onclick('slim');
								}
								else{
									lib.configMenu.appearence.config.player_border.onclick('normal');
								}
							}
							setTimeout(function(){
								var theme=ui.css.theme;
								ui.css.theme=lib.init.css(lib.assetURL+'theme/'+lib.config.theme,'style');
								theme.remove();
								setTimeout(function(){ui.arena.show();},100);
							},500);
						}
					},
					layout:{
						name:'布局',
						init:'mobile',
						item:{
							//default:'旧版',
							newlayout:'对称',
							mobile:'默认',
							long:'宽屏',
							long2:'手杀',
							nova:'新版'
						},
						visualMenu:function(node,link){
							node.className='button character themebutton '+lib.config.theme;
							if(!node.created){
								node.created=true;
								node.style.overflow='hidden';
								node.firstChild.style.display='none';
								// node.firstChild.classList.add('shadowed');
								// node.firstChild.style.width='16px';
								// node.firstChild.style.height='auto';
								// node.firstChild.style.padding='2px';
								// node.firstChild.style.textAlign='center';
								var me=ui.create.div(node);
								me.style.top='auto';
								if(link=='default'||link=='newlayout'){
									me.style.width='calc(100% - 6px)';
									me.style.left='3px';
									me.style.bottom='3px';
									me.style.height='25px';
									if(link=='newlayout'){
										me.style.height='23px';
										me.style.bottom='4px';
									}
								}
								else if(link=='long2'||link=='nova'){
									me.style.display='none';
								}
								else{
									me.style.width='120%';
									me.style.left='-10%';
									me.style.bottom='0';
									me.style.height='22px';
								}
								me.style.borderRadius='2px';
								var list=['re_caocao','re_liubei','sp_zhangjiao','sunquan'];
								for(var i=0;i<4;i++){
									var player=ui.create.div('.fakeplayer',node);
									ui.create.div('.avatar',player).setBackground(list.randomRemove(),'character');
									player.style.borderRadius='2px';
									if(i!=3){
										player.style.top='auto';
									}
									if(link=='default'){
										player.style.height='19px';
										player.style.width='38px';
										player.classList.add('oldlayout')
									}
									else if(link=='mobile'||link=='newlayout'){
										player.style.width='24px';
										player.style.height='29px';
									}
									else if(link=='nova') {
										player.style.width='20px';
										player.style.height='24px';
									}
									else{
										player.style.width='20px';
										player.style.height='34px';
									}
									if(i==1){
										player.style.left='3px';
									}
									if(i==2){
										player.style.left='auto';
										player.style.right='3px';
									}
									if(i==3){
										player.style.top='3px';
									}
									if(link=='default'){
										if(i==0){
											player.style.bottom='6px';
										}
										if(i==0||i==3){
											player.style.left='calc(50% - 18px)';
										}
										if(i==1||i==2){
											player.style.bottom='36px';
										}
									}
									else if(link=='newlayout'){
										if(i==0){
											player.style.bottom='1px';
										}
										if(i==0||i==3){
											player.style.left='calc(50% - 12px)';
										}
										if(i==1||i==2){
											player.style.bottom='32px';
										}
									}
									else if(link=='mobile'){
										if(i==0||i==3){
											player.style.left='calc(50% - 12px)';
										}
										if(i==1||i==2){
											player.style.bottom='30px';
										}
									}
									else if(link=='long'){
										if(i==0||i==3){
											player.style.left='calc(50% - 10px)';
										}
										if(i==1||i==2){
											player.style.bottom='45px';
										}
									}
									else if(link=='long2'){
										if(i==0){
											player.style.bottom='2px';
											player.style.left='3px';
										}
										if(i==3){
											player.style.left='calc(50% - 10px)';
										}
										if(i==1||i==2){
											player.style.bottom='45px';
										}
									}
									else if(link=='nova'){
										if(i==0){
											player.style.bottom='2px';
											player.style.left='3px';
										}
										if(i==3){
											player.style.left='calc(50% - 10px)';
										}
										if(i==1||i==2){
											player.style.left='3px';
											player.style.bottom=(i*30)+'px';
										}
									}

									if(i==0&&(link=='mobile'||link=='long')){
										player.classList.add('me');
										player.style.borderRadius='0px';
										player.style.width='25px';
										player.style.height='25px';
										player.style.bottom='-3px';
										player.style.left='-3px';
									}
								}
							}
						},
						onclick:function(layout){
							if(lib.layoutfixed.contains(lib.config.mode)){
								game.saveConfig('layout',layout);
							}
							else{
								lib.init.layout(layout);
							}
						}
					},
					splash_style:{
						name:'启动页',
						item:{
							style1:'样式一',
							style2:'样式二',
						},
						visualMenu:(node,link)=>{
							node.className='button character';
							node.style.width='200px';
							node.style.height=`${node.offsetWidth*1080/2400}px`;
							node.style.display='flex';
							node.style.flexDirection='column';
							node.style.alignItems='center';
							node.style.backgroundSize='100% 100%';
							node.setBackgroundImage(`image/splash/${link}.jpg`);
						}
					},
					// fewplayer:{
					//     name:'启用人数',
					// 	intro:'设置启用新版布局的最小人数（不足时切换至默认布局）',
					//     init:'3',
					//     // unfrequent:true,
					//     item:{
					//      			'2':'两人',
					//      			'3':'三人',
					//      			'4':'四人',
					//      			'5':'五人',
					//      			'6':'六人',
					//      			'7':'七人',
					//      			'8':'八人',
					//     },
					//     onclick:function(item){
					//      			game.saveConfig('fewplayer',item);
					//      			if(ui.arena) ui.arena.setNumber(ui.arena.dataset.number);
					//     }
					// },
					player_height:{
						name:'角色高度',
						init:'long',
						// unfrequent:true,
						item:{
							short:'矮',
							default:'中',
							long:'高',
						},
						onclick:function(item){
							game.saveConfig('player_height',item);
							ui.arena.dataset.player_height=item;
						}
					},
					player_height_nova:{
						name:'角色高度',
						init:'short',
						item:{
							// auto:'自动',
							short:'矮',
							default:'中',
							long:'高',
						},
						onclick:function(item){
							game.saveConfig('player_height_nova',item);
							// if(item=='auto'){
							// 	if(parseInt(ui.arena.dataset.number)>=7){
							// 		ui.arena.dataset.player_height_nova='short';
							// 	}
							// 	else{
							// 		ui.arena.dataset.player_height_nova='default';
							// 	}
							// }
							// else{
								ui.arena.dataset.player_height_nova=item;
							// }
						}
					},
					// background_color_music:{
					// 	name:'背景色',
					// 	init:'black',
					// 	item:{
					// 		blue:'蓝色',
					// 		black:'黑色',
					// 	},
					// 	onclick:function(color){
					// 		game.saveConfig('background_color_music',color);
					// 		document.body.dataset.background_color_music=color;
					// 	}
					// },
					// background_color_wood:{
					// 	name:'背景色',
					// 	init:'blue',
					// 	item:{
					// 		blue:'蓝色',
					// 		black:'黑色',
					// 	},
					// 	onclick:function(color){
					// 		game.saveConfig('background_color_wood',color);
					// 		document.body.dataset.background_color_wood=color;
					// 	}
					// },
					// theme_color_music:{
					// 	name:'主题色',
					// 	init:'black',
					// 	item:{
					// 		blue:'蓝色',
					// 		black:'黑色',
					// 	},
					// 	onclick:function(color){
					// 		game.saveConfig('theme_color_music',color);
					// 		document.body.dataset.theme_color_music=color;
					// 	}
					// },
					ui_zoom:{
						name:'界面缩放',
						unfrequent:true,
						init:'normal',
						item:{
							esmall:'80%',
							vsmall:'90%',
							small:'95%',
							normal:'100%',
							big:'105%',
							vbig:'110%',
							ebig:'120%',
							eebig:'150%',
							eeebig:'180%',
							eeeebig:'200%',
						},
						onclick:function(zoom){
							game.saveConfig('ui_zoom',zoom);
							switch(zoom){
								case 'esmall':zoom=0.8;break;
								case 'vsmall':zoom=0.9;break;
								case 'small':zoom=0.93;break;
								case 'big':zoom=1.05;break;
								case 'vbig':zoom=1.1;break;
								case 'ebig':zoom=1.2;break;
								case 'eebig':zoom=1.5;break;
								case 'eeebig':zoom=1.8;break;
								case 'eeeebig':zoom=2;break;
								default:zoom=1;
							}
							game.documentZoom=game.deviceZoom*zoom;
							ui.updatez();
							if (Array.isArray(lib.onresize)) {
								lib.onresize.forEach(fun => {
									if (typeof fun == 'function') fun();
								});
							}
						}
					},
					image_background:{
						name:'游戏背景',
						init:'default',
						item:{},
						visualBar:function(node,item,create){
							if(node.created){
								node.lastChild.classList.remove('active');
								return;
							}
							node.created=true;
							ui.create.filediv('.menubutton','添加背景',node,function(file){
								if(file){
									var name=file.name;
									if(name.includes('.')){
										name=name.slice(0,name.indexOf('.'));
									}
									var link=(game.writeFile?'cdv_':'custom_')+name;
									if(item[link]){
										for(var i=1;i<1000;i++){
											if(!item[link+'_'+i]){
												link=link+'_'+i;break;
											}
										}
									}
									item[link]=name;
									var callback=function(){
										create(link,node.parentNode.defaultNode);
										node.parentNode.updateBr();
										lib.config.customBackgroundPack.add(link);
										game.saveConfig('customBackgroundPack',lib.config.customBackgroundPack);
									};
									if(game.writeFile){
										game.writeFile(file,'image/background',link+'.jpg',callback);
									}
									else{
										game.putDB('image',link,file,callback);
									}
									if(node.lastChild.classList.contains('active')){
										editbg.call(node.lastChild);
									}
								}
							}).inputNode.accept='image/*';
							var editbg=function(){
								this.classList.toggle('active');
								var page=this.parentNode.parentNode;
								for(var i=0;i<page.childElementCount;i++){
									if(page.childNodes[i].classList.contains('button')){
										var link=page.childNodes[i]._link;
										if(link&&link!='default'){
											var str;
											if(this.classList.contains('active')){
												if(link.startsWith('custom_')||link.startsWith('cdv_')){
													str='删除';
												}
												else{
													str='隐藏';
												}
											}
											else{
												str=item[link];
											}
											page.childNodes[i].firstChild.innerHTML=get.verticalStr(str);
										}
									}
								}
							};
							ui.create.div('.menubutton','编辑背景',node,editbg);
						},
						visualMenu:function(node,link,name,config){
							node.className='button character';
							node.style.backgroundImage='';
							node.style.backgroundSize='';
							if(node.firstChild){
								node.firstChild.innerHTML=get.verticalStr(name);
							}
							if(link=='default'||link.startsWith('custom_')){
								node.style.backgroundImage='none';
								node.classList.add('dashedmenubutton');
								if(link.startsWith('custom_')){
									game.getDB('image',link,function(fileToLoad){
										if(!fileToLoad) return;
										var fileReader = new FileReader();
										fileReader.onload = function(fileLoadedEvent)
										{
											var data = fileLoadedEvent.target.result;
											node.style.backgroundImage='url('+data+')';
											node.style.backgroundSize='cover';
											node.classList.remove('dashedmenubutton');
										};
										fileReader.readAsDataURL(fileToLoad, "UTF-8");
									});
								}
								else{
									node.parentNode.defaultNode=node;
								}
							}
							else{
								node.setBackgroundImage('image/background/'+link+'.jpg');
								node.style.backgroundSize='cover';
							}
						},
						onclick:function(background,node){
							if(node&&node.firstChild){
								var menu=node.parentNode;
								if(node.firstChild.innerHTML==get.verticalStr('隐藏')){
									menu.parentNode.noclose=true;
									node.remove();
									menu.updateBr();
									if(!lib.config.prompt_hidebg){
										alert('隐藏的背景可通过选项-其它-重置隐藏内容恢复');
										game.saveConfig('prompt_hidebg',true);
									}
									lib.config.hiddenBackgroundPack.add(background);
									game.saveConfig('hiddenBackgroundPack',lib.config.hiddenBackgroundPack);
									delete lib.configMenu.appearence.config.image_background.item[background];
									if(lib.config.image_background==background){
										background='default';
										this.lastChild.innerHTML='默认';
									}
									else{
										this.lastChild.innerHTML=lib.configMenu.appearence.config.image_background.item[lib.config.image_background];
										return;
									}
								}
								else if(node.firstChild.innerHTML==get.verticalStr('删除')){
									menu.parentNode.noclose=true;
									if(confirm('是否删除此背景？（此操作不可撤销）')){
										node.remove();
										menu.updateBr();
										lib.config.customBackgroundPack.remove(background);
										game.saveConfig('customBackgroundPack',lib.config.customBackgroundPack);
										if(background.startsWith('cdv_')){
											game.removeFile('image/background/'+background+'.jpg');
										}
										else{
											game.deleteDB('image',background);
										}
										delete lib.configMenu.appearence.config.image_background.item[background];
										if(lib.config.image_background==background){
											background='default';
											this.lastChild.innerHTML='默认';
										}
										else{
											this.lastChild.innerHTML=lib.configMenu.appearence.config.image_background.item[lib.config.image_background];
											return;
										}
									}
								}
							}
							game.saveConfig('image_background',background);
							lib.init.background();
							game.updateBackground();
						},
					},
					image_background_random:{
						name:'随机背景',
						init:false,
						onclick:function(bool){
							game.saveConfig('image_background_random',bool);
							lib.init.background();
						}
					},
					image_background_blur:{
						name:'背景模糊',
						init:false,
						onclick:function(bool){
							game.saveConfig('image_background_blur',bool);
							if(lib.config.image_background_blur){
								ui.background.style.filter='blur(8px)';
								ui.background.style.webkitFilter='blur(8px)';
								ui.background.style.transform='scale(1.05)';
							}
							else{
								ui.background.style.filter='';
								ui.background.style.webkitFilter='';
								ui.background.style.transform='';
							}
						},
					},
					phonelayout:{
						name:'触屏布局',
						init:false,
						onclick:function(bool){
							if(get.is.nomenu('phonelayout',bool)) return false;
							game.saveConfig('phonelayout',bool);
							if(get.is.phoneLayout()){
								ui.css.phone.href=lib.assetURL+'layout/default/phone.css';
								ui.arena.classList.add('phone');
							}
							else{
								ui.css.phone.href='';
								ui.arena.classList.remove('phone');
							}
						}
					},
					change_skin:{
						name:'开启换肤',
						init:true,
						intro:'在武将的右键菜单中换肤，皮肤可在选项-文件-图片文件-皮肤图片中添加'
					},
					change_skin_auto:{
						name:'自动换肤',
						init:'off',
						item:{
							'off':'关闭',
							'30000':'半分钟',
							'60000':'一分钟',
							'120000':'两分钟',
							'300000':'五分钟',
						},
						intro:'游戏每进行一段时间自动为一个随机角色更换皮肤',
						onclick:function(item){
							game.saveConfig('change_skin_auto',item);
							clearTimeout(_status.skintimeout);
							if(item!='off'){
								_status.skintimeout=setTimeout(ui.click.autoskin,parseInt(item));
							}
						}
					},
					card_style:{
						name:'卡牌样式',
						init:'default',
						intro:'设置正面朝上的卡牌的样式',
						item:{
							wood:'木纹',
							music:'音乐',
							simple:'原版',
							ol:'手杀',
							// new:'新版',
							custom:'自定',
							default:'默认',
						},
						visualBar:function(node,item,create,switcher){
							if(node.created){
								return;
							}
							var button;
							for(var i=0;i<node.parentNode.childElementCount;i++){
								if(node.parentNode.childNodes[i]._link=='custom'){
									button=node.parentNode.childNodes[i];
								}
							}
							if(!button){
								return;
							}
							node.created=true;
							var deletepic;
							ui.create.filediv('.menubutton','添加图片',node,function(file){
								if(file){
									game.putDB('image','card_style',file,function(){
										game.getDB('image','card_style',function(fileToLoad){
											if(!fileToLoad) return;
											var fileReader = new FileReader();
											fileReader.onload = function(fileLoadedEvent)
											{
												var data = fileLoadedEvent.target.result;
												button.style.backgroundImage='url('+data+')';
												button.className='button card fullskin';
												node.classList.add('showdelete');
											};
											fileReader.readAsDataURL(fileToLoad, "UTF-8");
										});
									});
								}
							}).inputNode.accept='image*';
							deletepic=ui.create.div('.menubutton.deletebutton','删除图片',node,function(){
								if(confirm('确定删除自定义图片？（此操作不可撤销）')){
									game.deleteDB('image','card_style');
									button.style.backgroundImage='none';
									button.className='button character dashedmenubutton';
									node.classList.remove('showdelete');
									if(lib.config.card_style=='custom'){
										lib.configMenu.appearence.config.card_style.onclick('default');
										switcher.lastChild.innerHTML='默认';
									}
									button.classList.add('transparent');
								}
							});
						},
						visualMenu:function(node,link,name,config){
							node.className='button card fullskin';
							node.style.backgroundSize='100% 100%';
							switch(link){
								case 'default':case 'custom':{
									if(lib.config.theme=='simple'){
										node.style.backgroundImage='linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))';
										node.className='button character';
									}
									else{
										node.style.backgroundImage='none';
										node.className='button character dashedmenubutton';
									}
									break;
								}
								case 'new':node.setBackgroundImage('theme/style/card/image/new.png');break;
								case 'ol':node.setBackgroundImage('theme/style/card/image/ol.png');break;
								case 'wood':node.setBackgroundImage('theme/woodden/wood.jpg');node.style.backgroundSize='initial';break;
								case 'music':node.setBackgroundImage('theme/music/wood3.png');break;
								case 'simple':node.setBackgroundImage('theme/simple/card.png');break;
							}
							if(link=='custom'){
								node.classList.add('transparent');
								game.getDB('image','card_style',function(fileToLoad){
									if(!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function(fileLoadedEvent)
									{
										var data = fileLoadedEvent.target.result;
										node.style.backgroundImage='url('+data+')';
										node.className='button card fullskin';
										node.parentNode.lastChild.classList.add('showdelete');
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
							}
						},
						onclick:function(layout){
							game.saveConfig('card_style',layout);
							var style=ui.css.card_style;
							ui.css.card_style=lib.init.css(lib.assetURL+'theme/style/card',lib.config.card_style);
							style.remove();
							if(ui.css.card_stylesheet){
								ui.css.card_stylesheet.remove();
								delete ui.css.card_stylesheet;
							}
							if(layout=='custom'){
								game.getDB('image','card_style',function(fileToLoad){
									if(!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function(fileLoadedEvent){
										if(ui.css.card_stylesheet){
											ui.css.card_stylesheet.remove();
										}
										ui.css.card_stylesheet=lib.init.sheet('.card:not(*:empty){background-image:url('+fileLoadedEvent.target.result+')}');
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
							}
						},
						unfrequent:true,
					},
					cardback_style:{
						name:'卡背样式',
						intro:'设置背面朝上的卡牌的样式',
						init:'default',
						item:{
							// wood:'木纹',
							// music:'音乐',
							official:'原版',
							// new:'新版',
							feicheng:'废城',
							liusha:'流沙',
							ol:'手杀',
							custom:'自定',
							default:'默认',
						},
						visualBar:function(node,item,create,switcher){
							if(node.created){
								return;
							}
							var button;
							for(var i=0;i<node.parentNode.childElementCount;i++){
								if(node.parentNode.childNodes[i]._link=='custom'){
									button=node.parentNode.childNodes[i];
								}
							}
							if(!button){
								return;
							}
							node.created=true;
							var deletepic;
							ui.create.filediv('.menubutton','添加图片',node,function(file){
								if(file){
									game.putDB('image','cardback_style',file,function(){
										game.getDB('image','cardback_style',function(fileToLoad){
											if(!fileToLoad) return;
											var fileReader = new FileReader();
											fileReader.onload = function(fileLoadedEvent)
											{
												var data = fileLoadedEvent.target.result;
												button.style.backgroundImage='url('+data+')';
												button.className='button character';
												node.classList.add('showdelete');
											};
											fileReader.readAsDataURL(fileToLoad, "UTF-8");
										});
									});
								}
							}).inputNode.accept='image/*';
							ui.create.filediv('.menubutton.deletebutton.addbutton','添加翻转图片',node,function(file){
								if(file){
									game.putDB('image','cardback_style2',file,function(){
										node.classList.add('hideadd');
									});
								}
							}).inputNode.accept='image/*';
							deletepic=ui.create.div('.menubutton.deletebutton','删除图片',node,function(){
								if(confirm('确定删除自定义图片？（此操作不可撤销）')){
									game.deleteDB('image','cardback_style');
									game.deleteDB('image','cardback_style2');
									button.style.backgroundImage='none';
									button.className='button character dashedmenubutton';
									node.classList.remove('showdelete');
									node.classList.remove('hideadd');
									if(lib.config.cardback_style=='custom'){
										lib.configMenu.appearence.config.cardback_style.onclick('default');
										switcher.lastChild.innerHTML='默认';
									}
									button.classList.add('transparent');
								}
							});
						},
						visualMenu:function(node,link,name,config){
							node.style.backgroundSize='100% 100%';
							switch(link){
								case 'default':case 'custom':{
									node.style.backgroundImage='none';
									node.className='button character dashedmenubutton';
									break;
								}
								case 'new':node.className='button character';node.setBackgroundImage('theme/style/cardback/image/new.png');break;
								case 'feicheng':node.className='button character';node.setBackgroundImage('theme/style/cardback/image/feicheng.png');break;
								case 'official':node.className='button character';node.setBackgroundImage('theme/style/cardback/image/official.png');break;
								case 'liusha':node.className='button character';node.setBackgroundImage('theme/style/cardback/image/liusha.png');break;
								case 'ol':node.className='button character';node.setBackgroundImage('theme/style/cardback/image/ol.png');break;
								case 'wood':node.className='button card fullskin';node.setBackgroundImage('theme/woodden/wood.jpg');node.style.backgroundSize='initial';break;
								case 'music':node.className='button card fullskin';node.setBackgroundImage('theme/music/wood3.png');break;
							}
							if(link=='custom'){
								node.classList.add('transparent');
								game.getDB('image','cardback_style',function(fileToLoad){
									if(!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function(fileLoadedEvent)
									{
										var data = fileLoadedEvent.target.result;
										node.style.backgroundImage='url('+data+')';
										node.className='button character';
										node.parentNode.lastChild.classList.add('showdelete');
										game.getDB('image','cardback_style2',function(file){
											if(file){
												node.parentNode.lastChild.classList.add('hideadd');
											}
										});
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
							}
						},
						onclick:function(layout){
							game.saveConfig('cardback_style',layout);
							var style=ui.css.cardback_style;
							ui.css.cardback_style=lib.init.css(lib.assetURL+'theme/style/cardback',lib.config.cardback_style);
							style.remove();
							if(ui.css.cardback_stylesheet){
								ui.css.cardback_stylesheet.remove();
								delete ui.css.cardback_stylesheet;
							}
							if(ui.css.cardback_stylesheet2){
								ui.css.cardback_stylesheet2.remove();
								delete ui.css.cardback_stylesheet2;
							}
							if(layout=='custom'){
								game.getDB('image','cardback_style',function(fileToLoad){
									if(!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function(fileLoadedEvent){
										if(ui.css.cardback_stylesheet){
											ui.css.cardback_stylesheet.remove();
										}
										ui.css.cardback_stylesheet=lib.init.sheet('.card:empty,.card.infohidden{background-image:url('+fileLoadedEvent.target.result+')}');
										game.getDB('image','cardback_style2',function(fileToLoad){
											if(!fileToLoad) return;
											var fileReader = new FileReader();
											fileReader.onload = function(fileLoadedEvent){
												if(ui.css.cardback_stylesheet2){
													ui.css.cardback_stylesheet2.remove();
												}
												ui.css.cardback_stylesheet2=lib.init.sheet('.card.infohidden:not(.infoflip){background-image:url('+fileLoadedEvent.target.result+')}');
											};
											fileReader.readAsDataURL(fileToLoad, "UTF-8");
										});
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
							}
						},
						unfrequent:true,
					},
					hp_style:{
						name:'体力条样式',
						init:'ol',
						item:{
							default:'默认',
							// official:'勾玉',
							emotion:'表情',
							glass:'勾玉',
							round:'国战',
							ol:'手杀',
							xinglass:'双鱼',
							xinround:'OL',
							custom:'自定',
						},
						visualBar:function(node,item,create,switcher){
							if(node.created){
								return;
							}
							var button;
							for(var i=0;i<node.parentNode.childElementCount;i++){
								if(node.parentNode.childNodes[i]._link=='custom'){
									button=node.parentNode.childNodes[i];
								}
							}
							if(!button){
								return;
							}
							node.created=true;
							var deletepic;
							ui.create.filediv('.menubutton.addbutton','添加图片',node,function(file){
								if(file&&node.currentDB){
									game.putDB('image','hp_style'+node.currentDB,file,function(){
										game.getDB('image','hp_style'+node.currentDB,function(fileToLoad){
											if(!fileToLoad) return;
											var fileReader = new FileReader();
											fileReader.onload = function(fileLoadedEvent)
											{
												var data = fileLoadedEvent.target.result;
												button.childNodes[node.currentDB-1].style.backgroundImage='url('+data+')';
												button.classList.add('shown');
												node.classList.add('showdelete');
												node.currentDB++;
												if(node.currentDB>4){
													node.classList.add('hideadd');
													button.classList.remove('transparent');
													delete node.currentDB;
												}
											};
											fileReader.readAsDataURL(fileToLoad, "UTF-8");
										});
									});
								}
							}).inputNode.accept='image/*';
							deletepic=ui.create.div('.menubutton.deletebutton','删除图片',node,function(){
								if(confirm('确定删除自定义图片？（此操作不可撤销）')){
									game.deleteDB('image','hp_style1');
									game.deleteDB('image','hp_style2');
									game.deleteDB('image','hp_style3');
									game.deleteDB('image','hp_style4');
									for(var i=0;i<button.childElementCount;i++){
										button.childNodes[i].style.backgroundImage='none';
									}
									node.classList.remove('showdelete');
									node.classList.remove('hideadd');
									if(lib.config.hp_style=='custom'){
										lib.configMenu.appearence.config.hp_style.onclick('default');
										switcher.lastChild.innerHTML='默认';
									}
									button.classList.add('transparent');
									button.classList.remove('shown');
									node.currentDB=1;
								}
							});
						},
						visualMenu:function(node,link,name,config){
							node.className='button hpbutton dashedmenubutton';
							node.innerHTML='';
							for(var i=1;i<=4;i++){
								var div=ui.create.div(node);
								if(link=='default'){
									ui.create.div(div);
								}
								else if(link!='custom'){
									div.setBackgroundImage('theme/style/hp/image/'+link+i+'.png');
								}
								if(i==4){
									div.style.webkitFilter='grayscale(1)';
								}
							}
							if(link=='custom'){
								node.classList.add('transparent');
								var getDB=function(num){
									node.parentNode.lastChild.currentDB=num;
									game.getDB('image','hp_style'+num,function(fileToLoad){
										if(!fileToLoad) return;
										var fileReader = new FileReader();
										fileReader.onload = function(fileLoadedEvent)
										{
											var data = fileLoadedEvent.target.result;
											node.childNodes[num-1].style.backgroundImage='url('+data+')';
											node.classList.add('shown');
											node.parentNode.lastChild.classList.add('showdelete');
											if(num<4){
												getDB(num+1);
											}
											else{
												node.parentNode.lastChild.classList.add('hideadd');
												node.classList.remove('transparent');
												delete node.parentNode.firstChild.currentDB;
											}
										};
										fileReader.readAsDataURL(fileToLoad, "UTF-8");
									});
								}
								getDB(1);
							}
						},
						onclick:function(layout){
							game.saveConfig('hp_style',layout);
							var style=ui.css.hp_style;
							ui.css.hp_style=lib.init.css(lib.assetURL+'theme/style/hp',lib.config.hp_style);
							style.remove();
							if(ui.css.hp_stylesheet1){
								ui.css.hp_stylesheet1.remove();
								delete ui.css.hp_stylesheet1;
							}
							if(ui.css.hp_stylesheet2){
								ui.css.hp_stylesheet2.remove();
								delete ui.css.hp_stylesheet2;
							}
							if(ui.css.hp_stylesheet3){
								ui.css.hp_stylesheet3.remove();
								delete ui.css.hp_stylesheet3;
							}
							if(ui.css.hp_stylesheet4){
								ui.css.hp_stylesheet4.remove();
								delete ui.css.hp_stylesheet4;
							}
							if(layout=='custom'){
								game.getDB('image','hp_style1',function(fileToLoad){
									if(!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function(fileLoadedEvent){
										if(ui.css.hp_stylesheet1){
											ui.css.hp_stylesheet1.remove();
										}
										ui.css.hp_stylesheet1=lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="high"]>div:not(.lost){background-image:url('+fileLoadedEvent.target.result+')}');
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
								game.getDB('image','hp_style2',function(fileToLoad){
									if(!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function(fileLoadedEvent){
										if(ui.css.hp_stylesheet2){
											ui.css.hp_stylesheet2.remove();
										}
										ui.css.hp_stylesheet2=lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="mid"]>div:not(.lost){background-image:url('+fileLoadedEvent.target.result+')}');
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
								game.getDB('image','hp_style3',function(fileToLoad){
									if(!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function(fileLoadedEvent){
										if(ui.css.hp_stylesheet3){
											ui.css.hp_stylesheet3.remove();
										}
										ui.css.hp_stylesheet3=lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="low"]>div:not(.lost){background-image:url('+fileLoadedEvent.target.result+')}');
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
								game.getDB('image','hp_style4',function(fileToLoad){
									if(!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function(fileLoadedEvent){
										if(ui.css.hp_stylesheet4){
											ui.css.hp_stylesheet4.remove();
										}
										ui.css.hp_stylesheet4=lib.init.sheet('.hp:not(.text):not(.actcount)>.lost{background-image:url('+fileLoadedEvent.target.result+')}');
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
							}
						},
						unfrequent:true,
					},
					player_style:{
						name:'角色背景',
						init:'default',
						intro:'设置角色的背景图片',
						item:{
							wood:'木纹',
							music:'音乐',
							simple:'简约',
							custom:'自定',
							default:'默认',
						},
						visualBar:function(node,item,create,switcher){
							if(node.created){
								return;
							}
							var button;
							for(var i=0;i<node.parentNode.childElementCount;i++){
								if(node.parentNode.childNodes[i]._link=='custom'){
									button=node.parentNode.childNodes[i];
								}
							}
							if(!button){
								return;
							}
							node.created=true;
							var deletepic;
							ui.create.filediv('.menubutton','添加图片',node,function(file){
								if(file){
									game.putDB('image','player_style',file,function(){
										game.getDB('image','player_style',function(fileToLoad){
											if(!fileToLoad) return;
											var fileReader = new FileReader();
											fileReader.onload = function(fileLoadedEvent)
											{
												var data = fileLoadedEvent.target.result;
												button.style.backgroundImage='url('+data+')';
												button.className='button character';
												button.style.backgroundSize='100% 100%';
												node.classList.add('showdelete');
											};
											fileReader.readAsDataURL(fileToLoad, "UTF-8");
										});
									});
								}
							}).inputNode.accept='image/*';
							deletepic=ui.create.div('.menubutton.deletebutton','删除图片',node,function(){
								if(confirm('确定删除自定义图片？（此操作不可撤销）')){
									game.deleteDB('image','player_style');
									button.style.backgroundImage='none';
									button.className='button character dashedmenubutton';
									node.classList.remove('showdelete');
									if(lib.config.player_style=='custom'){
										lib.configMenu.appearence.config.player_style.onclick('default');
										switcher.lastChild.innerHTML='默认';
									}
									button.classList.add('transparent');
								}
							});
						},
						visualMenu:function(node,link,name,config){
							node.className='button character';
							node.style.backgroundSize='';
							node.style.height='108px';
							switch(link){
								case 'default':case 'custom':{
									node.style.backgroundImage='none';
									node.className='button character dashedmenubutton';
									break;
								}
								case 'wood':node.setBackgroundImage('theme/woodden/wood.jpg');break;
								case 'music':node.style.backgroundImage='linear-gradient(#4b4b4b, #464646)';break;
								case 'simple':node.style.backgroundImage='linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))';break;
							}
							if(link=='custom'){
								node.classList.add('transparent');
								game.getDB('image','player_style',function(fileToLoad){
									if(!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function(fileLoadedEvent)
									{
										var data = fileLoadedEvent.target.result;
										node.style.backgroundImage='url('+data+')';
										node.className='button character';
										node.parentNode.lastChild.classList.add('showdelete');
										node.style.backgroundSize='100% 100%';
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
							}
						},
						onclick:function(layout){
							game.saveConfig('player_style',layout);
							if(ui.css.player_stylesheet){
								ui.css.player_stylesheet.remove();
								delete ui.css.player_stylesheet;
							}
							if(layout=='custom'){
								game.getDB('image','player_style',function(fileToLoad){
									if(!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function(fileLoadedEvent){
										if(ui.css.player_stylesheet){
											ui.css.player_stylesheet.remove();
										}
										ui.css.player_stylesheet=lib.init.sheet('#window .player{background-image:url("'+fileLoadedEvent.target.result+'");background-size:100% 100%;}');
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
							}
							else if(layout!='default'){
								var str='';
								switch(layout){
									case 'wood':str='url("'+lib.assetURL+'theme/woodden/wood.jpg")';break;
									case 'music':str='linear-gradient(#4b4b4b, #464646)';break;
									case 'simple':str='linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))';break;
								}
								ui.css.player_stylesheet=lib.init.sheet('#window .player{background-image:'+str+'}');
							}
						},
						unfrequent:true,
					},
					border_style:{
						name:'角色边框',
						init:'default',
						intro:'设置角色边框的样式，当设为自动时，样式将随着一局游戏中伤害或击杀的数量自动改变',
						item:{
							gold:'金框',
							silver:'银框',
							bronze:'铜框',
							dragon_gold:'金龙',
							dragon_silver:'银龙',
							dragon_bronze:'玉龙',
							custom:'自定',
							auto:'自动',
							default:'默认',
						},
						visualBar:function(node,item,create,switcher){
							if(node.created){
								return;
							}
							var button;
							for(var i=0;i<node.parentNode.childElementCount;i++){
								if(node.parentNode.childNodes[i]._link=='custom'){
									button=node.parentNode.childNodes[i];
								}
							}
							if(!button){
								return;
							}
							node.created=true;
							var deletepic;
							ui.create.filediv('.menubutton','添加图片',node,function(file){
								if(file){
									game.putDB('image','border_style',file,function(){
										game.getDB('image','border_style',function(fileToLoad){
											if(!fileToLoad) return;
											var fileReader = new FileReader();
											fileReader.onload = function(fileLoadedEvent)
											{
												var data = fileLoadedEvent.target.result;
												button.style.backgroundImage='url('+data+')';
												button.className='button character';
												button.style.backgroundSize='100% 100%';
												node.classList.add('showdelete');
											};
											fileReader.readAsDataURL(fileToLoad, "UTF-8");
										});
									});
								}
							}).inputNode.accept='image/*';
							deletepic=ui.create.div('.menubutton.deletebutton','删除图片',node,function(){
								if(confirm('确定删除自定义图片？（此操作不可撤销）')){
									game.deleteDB('image','border_style');
									button.style.backgroundImage='none';
									button.className='button character dashedmenubutton';
									node.classList.remove('showdelete');
									if(lib.config.border_style=='custom'){
										lib.configMenu.appearence.config.border_style.onclick('default');
										switcher.lastChild.innerHTML='默认';
									}
									button.classList.add('transparent');
								}
							});
						},
						visualMenu:function(node,link,name,config){
							node.className='button character';
							node.style.backgroundSize='';
							node.style.height='108px';
							node.dataset.decoration='';
							if(link=='default'||link=='custom'||link=='auto'){
								node.style.backgroundImage='none';
								node.className='button character dashedmenubutton';
							}
							else{
								if(link.startsWith('dragon_')){
									link=link.slice(7);
									node.dataset.decoration=link;
								}
								node.setBackgroundImage('theme/style/player/'+link+'1.png');
								node.style.backgroundSize='100% 100%';
							}
							if(link=='custom'){
								node.classList.add('transparent');
								game.getDB('image','border_style',function(fileToLoad){
									if(!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function(fileLoadedEvent)
									{
										var data = fileLoadedEvent.target.result;
										node.style.backgroundImage='url('+data+')';
										node.className='button character';
										node.parentNode.lastChild.classList.add('showdelete');
										node.style.backgroundSize='100% 100%';
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
							}
						},
						onclick:function(layout){
							game.saveConfig('border_style',layout);
							if(ui.css.border_stylesheet){
								ui.css.border_stylesheet.remove();
								delete ui.css.border_stylesheet;
							}
							if(layout=='custom'){
								game.getDB('image','border_style',function(fileToLoad){
									if(!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function(fileLoadedEvent){
										if(ui.css.border_stylesheet){
											ui.css.border_stylesheet.remove();
										}
										ui.css.border_stylesheet=lib.init.sheet();
										ui.css.border_stylesheet.id="ui.css.border";
										ui.css.border_stylesheet.sheet.insertRule('#window .player>.framebg{display:block;background-image:url("'+fileLoadedEvent.target.result+'")}',0);
										ui.css.border_stylesheet.sheet.insertRule('.player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}',0);
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
							}
							else if(layout!='default'&&layout!='auto'){
								ui.css.border_stylesheet=lib.init.sheet();
								if(layout.startsWith('dragon_')){
									layout=layout.slice(7);
									ui.arena.dataset.framedecoration=layout;
								}
								else{
									ui.arena.dataset.framedecoration='';
								}
								ui.css.border_stylesheet.sheet.insertRule('#window .player>.framebg,#window #arena.long.mobile:not(.fewplayer) .player[data-position="0"]>.framebg{display:block;background-image:url("'+lib.assetURL+'theme/style/player/'+layout+'1.png")}',0);
								ui.css.border_stylesheet.sheet.insertRule('#window #arena.long:not(.fewplayer) .player>.framebg, #arena.oldlayout .player>.framebg{background-image:url("'+lib.assetURL+'theme/style/player/'+layout+'3.png")}',0);
								ui.css.border_stylesheet.sheet.insertRule('.player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}',0);
							}
						},
						unfrequent:true,
					},
					autoborder_count:{
						name:'边框升级方式',
						intro:'<strong>击杀</strong> 每击杀一人，边框提升两级<br><strong>伤害</strong> 每造成两点伤害，边框提升一级<br><strong>混合</strong> 击杀量决定边框颜色，伤害量决定边框装饰',
						init:'kill',
						item:{
							kill:'击杀',
							damage:'伤害',
							mix:'混合',
						},
						unfrequent:true,
					},
					autoborder_start:{
						name:'基础边框颜色',
						init:'bronze',
						item:{
							bronze:'铜',
							silver:'银',
							gold:'金'
						},
						unfrequent:true
					},
					player_border:{
						name:'边框宽度',
						init:'normal',
						intro:'设置角色的边框宽度',
						unfrequent:true,
						item:{
							slim:'细',
							narrow:'窄',
							normal:'中',
							wide:'宽'
						},
						onclick:function(item){
							game.saveConfig('player_border',item);
							if(item!='wide'||game.layout=='long'||game.layout=='long2'){
								ui.arena.classList.add('slim_player');
							}
							else{
								ui.arena.classList.remove('slim_player');
							}
							if(item=='slim'){
								ui.arena.classList.add('uslim_player');
							}
							else{
								ui.arena.classList.remove('uslim_player');
							}
							if(item=='narrow'){
								ui.arena.classList.add('mslim_player');
							}
							else{
								ui.arena.classList.remove('mslim_player');
							}
							if(item=='normal'&&lib.config.mode!='brawl'&&(game.layout=='long'||game.layout=='long2')){
								ui.arena.classList.add('lslim_player');
							}
							else{
								ui.arena.classList.remove('lslim_player');
							}
							ui.window.dataset.player_border=item;
						}
					},
					menu_style:{
						name:'菜单背景',
						init:'default',
						item:{
							wood:'木纹',
							music:'音乐',
							simple:'简约',
							custom:'自定',
							default:'默认',
						},
						visualBar:function(node,item,create,switcher){
							if(node.created){
								return;
							}
							var button;
							for(var i=0;i<node.parentNode.childElementCount;i++){
								if(node.parentNode.childNodes[i]._link=='custom'){
									button=node.parentNode.childNodes[i];
								}
							}
							if(!button){
								return;
							}
							node.created=true;
							var deletepic;
							ui.create.filediv('.menubutton','添加图片',node,function(file){
								if(file){
									game.putDB('image','menu_style',file,function(){
										game.getDB('image','menu_style',function(fileToLoad){
											if(!fileToLoad) return;
											var fileReader = new FileReader();
											fileReader.onload = function(fileLoadedEvent)
											{
												var data = fileLoadedEvent.target.result;
												button.style.backgroundImage='url('+data+')';
												button.style.backgroundSize='cover';
												button.className='button character';
												node.classList.add('showdelete');
											};
											fileReader.readAsDataURL(fileToLoad, "UTF-8");
										});
									});
								}
							}).inputNode.accept='image/*';
							deletepic=ui.create.div('.menubutton.deletebutton','删除图片',node,function(){
								if(confirm('确定删除自定义图片？（此操作不可撤销）')){
									game.deleteDB('image','menu_style');
									button.style.backgroundImage='none';
									button.style.backgroundSize='auto';
									button.className='button character dashedmenubutton';
									node.classList.remove('showdelete');
									if(lib.config.menu_style=='custom'){
										lib.configMenu.appearence.config.menu_style.onclick('default');
										switcher.lastChild.innerHTML='默认';
									}
									button.classList.add('transparent');
								}
							});
						},
						visualMenu:function(node,link,name,config){
							node.className='button character';
							node.style.backgroundSize='auto';
							switch(link){
								case 'default':case 'custom':{
									node.style.backgroundImage='none';
									node.classList.add('dashedmenubutton');
									break;
								}
								case 'wood':node.setBackgroundImage('theme/woodden/wood2.png');break;
								case 'music':node.style.backgroundImage='linear-gradient(#4b4b4b, #464646)';break;
								case 'simple':node.style.backgroundImage='linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))';break;
							}
							if(link=='custom'){
								node.classList.add('transparent');
								game.getDB('image','menu_style',function(fileToLoad){
									if(!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function(fileLoadedEvent)
									{
										var data = fileLoadedEvent.target.result;
										node.style.backgroundImage='url('+data+')';
										node.style.backgroundSize='cover';
										node.className='button character';
										node.parentNode.lastChild.classList.add('showdelete');
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
							}
						},
						onclick:function(layout){
							game.saveConfig('menu_style',layout);
							if(ui.css.menu_stylesheet){
								ui.css.menu_stylesheet.remove();
								delete ui.css.menu_stylesheet;
							}
							if(layout=='custom'){
								game.getDB('image','menu_style',function(fileToLoad){
									if(!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function(fileLoadedEvent){
										if(ui.css.menu_stylesheet){
											ui.css.menu_stylesheet.remove();
										}
										ui.css.menu_stylesheet=lib.init.sheet('html #window>.dialog.popped,html .menu,html .menubg{background-image:url("'+fileLoadedEvent.target.result+'");background-size:cover}');
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
							}
							else if(layout!='default'){
								var str='';
								switch(layout){
									case 'wood':str='url("'+lib.assetURL+'theme/woodden/wood2.png")';break;
									case 'music':str='linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px';break;
									case 'simple':str='linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px';break;
								}
								ui.css.menu_stylesheet=lib.init.sheet('html #window>.dialog.popped,html .menu,html .menubg{background-image:'+str+'}');
							}
						},
						unfrequent:true,
					},
					control_style:{
						name:'按钮背景',
						init:'default',
						item:{
							wood:'木纹',
							music:'音乐',
							simple:'简约',
							custom:'自定',
							default:'默认',
						},
						visualBar:function(node,item,create,switcher){
							if(node.created){
								return;
							}
							var button;
							for(var i=0;i<node.parentNode.childElementCount;i++){
								if(node.parentNode.childNodes[i]._link=='custom'){
									button=node.parentNode.childNodes[i];
								}
							}
							if(!button){
								return;
							}
							node.created=true;
							var deletepic;
							ui.create.filediv('.menubutton','添加图片',node,function(file){
								if(file){
									game.putDB('image','control_style',file,function(){
										game.getDB('image','control_style',function(fileToLoad){
											if(!fileToLoad) return;
											var fileReader = new FileReader();
											fileReader.onload = function(fileLoadedEvent)
											{
												var data = fileLoadedEvent.target.result;
												button.style.backgroundImage='url('+data+')';
												button.className='button character controlbutton';
												node.classList.add('showdelete');
											};
											fileReader.readAsDataURL(fileToLoad, "UTF-8");
										});
									});
								}
							}).inputNode.accept='image/*';
							deletepic=ui.create.div('.menubutton.deletebutton','删除图片',node,function(){
								if(confirm('确定删除自定义图片？（此操作不可撤销）')){
									game.deleteDB('image','control_style');
									button.style.backgroundImage='none';
									button.className='button character controlbutton dashedmenubutton';
									node.classList.remove('showdelete');
									if(lib.config.control_style=='custom'){
										lib.configMenu.appearence.config.control_style.onclick('default');
										switcher.lastChild.innerHTML='默认';
									}
									button.classList.add('transparent');
								}
							});
						},
						visualMenu:function(node,link,name,config){
							node.className='button character controlbutton';
							node.style.backgroundSize='';
							switch(link){
								case 'default':case 'custom':{
									node.style.backgroundImage='none';
									node.classList.add('dashedmenubutton');
									break;
								}
								case 'wood':node.setBackgroundImage('theme/woodden/wood.jpg');break;
								case 'music':node.style.backgroundImage='linear-gradient(#4b4b4b, #464646)';break;
								case 'simple':node.style.backgroundImage='linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))';break;
							}
							if(link=='custom'){
								node.classList.add('transparent');
								game.getDB('image','control_style',function(fileToLoad){
									if(!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function(fileLoadedEvent)
									{
										var data = fileLoadedEvent.target.result;
										node.style.backgroundImage='url('+data+')';
										node.className='button character controlbutton';
										node.parentNode.lastChild.classList.add('showdelete');
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
							}
						},
						onclick:function(layout){
							game.saveConfig('control_style',layout);
							if(ui.css.control_stylesheet){
								ui.css.control_stylesheet.remove();
								delete ui.css.control_stylesheet;
							}
							if(layout=='custom'){
								game.getDB('image','control_style',function(fileToLoad){
									if(!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function(fileLoadedEvent){
										if(ui.css.control_stylesheet){
											ui.css.control_stylesheet.remove();
										}
										ui.css.control_stylesheet=lib.init.sheet('#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:url("'+fileLoadedEvent.target.result+'")}');
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
							}
							else if(layout!='default'){
								var str='';
								switch(layout){
									case 'wood':str='url("'+lib.assetURL+'theme/woodden/wood.jpg")';break;
									case 'music':str='linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px';break;
									case 'simple':str='linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px';break;
								}
								if(layout=='wood'){
									ui.css.control_stylesheet=lib.init.sheet('#window .control,#window .menubutton,#window #system>div>div,#window #system>div>.pressdown2{background-image:'+str+'}');
								}
								else{
									ui.css.control_stylesheet=lib.init.sheet('#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:'+str+'}');
								}
							}
						},
						unfrequent:true,
					},
					custom_button:{
						name:'自定义按钮高度',
						init:false,
						unfrequent:true,
						onclick:function(bool){
							if(bool!=='skip'){
								game.saveConfig('custom_button',bool);
							}
							if(ui.css.buttonsheet){
								ui.css.buttonsheet.remove();
							}
							if(lib.config.custom_button){
								var cbnum1=6+(parseInt(lib.config.custom_button_system_top)||0);
								var cbnum2=6+(parseInt(lib.config.custom_button_system_bottom)||0);
								var cbnum3=3+(parseInt(lib.config.custom_button_control_top)||0);
								var cbnum4=3+(parseInt(lib.config.custom_button_control_bottom)||0);
								var cbnum5=2;
								var cbnum6=2;
								if(cbnum3<0){
									cbnum5+=cbnum3;
									cbnum3=0;
								}
								if(cbnum4<0){
									cbnum6+=cbnum4;
									cbnum4=0;
								}
								ui.css.buttonsheet=lib.init.sheet(
									'#system>div>div, .caption>div>.tdnode{padding-top:'+cbnum1+'px !important;padding-bottom:'+cbnum2+'px !important}',
									'#control>.control>div{padding-top:'+cbnum3+'px;padding-bottom:'+cbnum4+'px}',
									'#control>.control{padding-top:'+cbnum5+'px;padding-bottom:'+cbnum6+'px}'
								);
							}
						}
					},
					custom_button_system_top:{
						name:'菜单上部高度',
						init:'0x',
						item:{
							'-5x':'-5px',
							'-4x':'-4px',
							'-3x':'-3px',
							'-2x':'-2px',
							'-1x':'-1px',
							'0x':'默认',
							'1x':'1px',
							'2x':'2px',
							'3x':'3px',
							'4x':'4px',
							'5x':'5px',
						},
						unfrequent:true,
						onclick:function(item){
							game.saveConfig('custom_button_system_top',item);
							lib.configMenu.appearence.config.custom_button.onclick('skip');
						}
					},
					custom_button_system_bottom:{
						name:'菜单下部高度',
						init:'0x',
						item:{
							'-5x':'-5px',
							'-4x':'-4px',
							'-3x':'-3px',
							'-2x':'-2px',
							'-1x':'-1px',
							'0x':'默认',
							'1x':'1px',
							'2x':'2px',
							'3x':'3px',
							'4x':'4px',
							'5x':'5px',
						},
						unfrequent:true,
						onclick:function(item){
							game.saveConfig('custom_button_system_bottom',item);
							lib.configMenu.appearence.config.custom_button.onclick('skip');
						}
					},
					custom_button_control_top:{
						name:'技能上部高度',
						init:'0x',
						item:{
							'-5x':'-5px',
							'-4x':'-4px',
							'-3x':'-3px',
							'-2x':'-2px',
							'-1x':'-1px',
							'0x':'默认',
							'1x':'1px',
							'2x':'2px',
							'3x':'3px',
							'4x':'4px',
							'5x':'5px',
						},
						unfrequent:true,
						onclick:function(item){
							game.saveConfig('custom_button_control_top',item);
							lib.configMenu.appearence.config.custom_button.onclick('skip');
						}
					},
					custom_button_control_bottom:{
						name:'技能下部高度',
						init:'0x',
						item:{
							'-5x':'-5px',
							'-4x':'-4px',
							'-3x':'-3px',
							'-2x':'-2px',
							'-1x':'-1px',
							'0x':'默认',
							'1x':'1px',
							'2x':'2px',
							'3x':'3px',
							'4x':'4px',
							'5x':'5px',
						},
						unfrequent:true,
						onclick:function(item){
							game.saveConfig('custom_button_control_bottom',item);
							lib.configMenu.appearence.config.custom_button.onclick('skip');
						}
					},
					radius_size:{
						name:'圆角大小',
						init:'default',
						item:{
							off:'关闭',
							reduce:'减小',
							default:'默认',
							increase:'增大',
						},
						unfrequent:true,
						onclick:function(item){
							game.saveConfig('radius_size',item);
							ui.window.dataset.radius_size=item;
						}
					},
					glow_phase:{
						name:'当前回合角色高亮',
						unfrequent:true,
						init:'yellow',
						intro:'设置当前回合角色的边框颜色',
						item:{
							none:'无',
							yellow:'黄色',
							green:'绿色',
							purple:'紫色',
						},
						onclick:function(bool){
							game.saveConfig('glow_phase',bool);
							lib.init.cssstyles();
						}
					},
					fold_card:{
						name:'折叠手牌',
						init:true,
						unfrequent:true,
					},
					fold_mode:{
						name:'折叠模式菜单',
						intro:'关闭后模式菜单中“更多”内的项目将直接展开',
						init:true,
						unfrequent:true,
					},
					seperate_control:{
						name:'分离选项条',
						init:true,
						unfrequent:true,
						intro:'开启后玩家在进行选择时不同的选项将分开，而不是连在一起',
					},
					blur_ui:{
						name:'模糊效果',
						intro:'在暂停或打开菜单时开启模糊效果',
						init:false,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('blur_ui',bool);
							if(bool){
								ui.window.classList.add('blur_ui');
							}
							else{
								ui.window.classList.remove('blur_ui');
							}
						}
					},
					glass_ui:{
						name:'玻璃主题',
						intro:'为游戏主题打开玻璃效果（手机暂不支持）',
						init:false,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('glass_ui',bool);
							if(bool){
								ui.window.classList.add('glass_ui');
							}
							else{
								ui.window.classList.remove('glass_ui');
							}
						}
					},
					damage_shake:{
						name:'伤害抖动',
						intro:'角色受到伤害时的抖动效果',
						init:true,
						unfrequent:true,
					},
					button_press:{
						name:'按钮效果',
						intro:'选项条被按下时将有按下效果',
						init:true,
						unfrequent:true,
					},
					jiu_effect:{
						name:'喝酒效果',
						init:true,
						unfrequent:true,
					},
					animation:{
						name:'游戏特效',
						intro:'开启后出现属性伤害、回复体力等情况时会显示动画',
						init:false,
						unfrequent:true,
					},
					skill_animation_type:{
						name:'技能特效',
						intro:'开启后觉醒技、限定技将显示全屏文字',
						init:'default',
						unfrequent:true,
						item:{
							default:'默认',
							old:'旧版',
							off:'关闭'
						}
					},
					die_move:{
						name:'阵亡效果',
						intro:'阵亡后武将的显示效果',
						init:'flip',
						unfrequent:true,
						item:{
							off:'关闭',
							move:'移动',
							flip:'翻面',
						}
					},
					target_shake:{
						name:'目标效果',
						intro:'一名玩家成为卡牌或技能的目标时的显示效果',
						init:'off',
						item:{
							off:'关闭',
							zoom:'缩放',
							shake:'抖动',
						},
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('target_shake',bool);
							ui.arena.dataset.target_shake=bool;
						}
					},
					turned_style:{
						name:'翻面文字',
						intro:'角色被翻面时显示“翻面”',
						init:true,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('turned_style',bool);
							if(bool){
								ui.arena.classList.remove('hide_turned');
							}
							else{
								ui.arena.classList.add('hide_turned');
							}
						}
					},
					link_style2:{
						name:'横置样式',
						intro:'设置角色被横置时的样式',
						init:'chain',
						unfrequent:true,
						item:{
							chain:'铁索',
							rotate:'横置',
							mark:'标记'
						},
						onclick:function(style){
							var list=[];
							for(var i=0;i<game.players.length;i++){
								if(game.players[i].isLinked()){
									list.push(game.players[i]);
								}
							}
							game.saveConfig('link_style2',style);
							for(var i=0;i<list.length;i++){
								if(get.is.linked2(list[i])){
									list[i].classList.add('linked2');
									list[i].classList.remove('linked');
								}
								else{
									list[i].classList.add('linked');
									list[i].classList.remove('linked2');
								}
							}
							if(style=='chain'){
								ui.arena.classList.remove('nolink');
							}
							else{
								ui.arena.classList.add('nolink');
							}
							ui.updatem();
						}
					},
					cardshape:{
						name:'手牌显示',
						intro:'将手牌设置为正方形或长方形',
						init:'default',
						unfrequent:true,
						item:{
							default:'默认',
							oblong:'长方',
						},
						onclick:function(item){
							var linked=false;
							if(game.me&&game.me.isLinked()){
								linked=true;
							}
							game.saveConfig('cardshape',item);
							if(item=='oblong'&&(game.layout=='long'||game.layout=='mobile'||game.layout=='long2'||game.layout=='nova')){
								ui.arena.classList.add('oblongcard');
								ui.window.classList.add('oblongcard');
							}
							else{
								ui.arena.classList.remove('oblongcard');
								ui.window.classList.remove('oblongcard');
							}
							if(linked){
								if(get.is.linked2(game.me)){
									game.me.classList.remove('linked');
									game.me.classList.add('linked2');
								}
								else{
									game.me.classList.add('linked');
									game.me.classList.remove('linked2');
								}
							}
						}
					},
					cardtempname:{
						name:'视为卡牌名称显示',
						intro:'显示强制视为类卡牌（如武魂），包括拆顺对话框内的判定牌（国色）转换等名称的显示方式',
						init:'image',
						unfrequent:true,
						item:{
							default:'纵向',
							horizon:'横向',
							image:'图片',
							off:'禁用',
						},
						onclick:function(item){
							game.saveConfig('cardtempname',item);
							if(!game.me||!game.me.getCards) return;
							var hs=game.me.getCards('h');
							for(var i=0;i<hs.length;i++){
								if(hs[i]._tempName){
									switch(item){
										case 'default':
										case 'horizon':
										case 'image':
											ui.create.cardTempName(hs[i]);
											break;
										default:
											hs[i]._tempName.delete();
											delete hs[i]._tempName;
									}
								}
							}
						}
					},
					/*textequip:{
						name:'装备显示',
						init:'image',
						unfrequent:true,
						item:{
							image:'图片',
							text:'文字',
						},
						onclick:function(item){
							game.saveConfig('textequip',item);
							if(item=='text'&&(game.layout=='long'||game.layout=='mobile')){
								ui.arena.classList.add('textequip');
							}
							else{
								ui.arena.classList.remove('textequip');
							}
						}
					},*/
					buttoncharacter_style:{
						name:'选将样式',
						init:'default',
						item:{
							default:'默认',
							simple:'精简',
							old:'旧版'
						},
						unfrequent:true,
					},
					buttoncharacter_prefix:{
						name:'武将前缀',
						init:'default',
						item:{
							default:'默认',
							simple:'不显示颜色',
							off:'不显示前缀'
						},
						unfrequent:true,
					},
					cursor_style:{
						name:'鼠标指针',
						init:'auto',
						intro:'设置为固定后鼠标指针将不随移动到的区域而变化',
						unfrequent:true,
						item:{
							auto:'自动',
							pointer:'固定'
						},
						onclick:function(item){
							game.saveConfig('cursor_style',item);
							if(item=='pointer'){
								ui.window.classList.add('nopointer');
							}
							else{
								ui.window.classList.remove('nopointer');
							}
						}
					},
					name_font:{
						name:'人名字体',
						init:'xingkai',
						unfrequent:true,
						item:{},
						textMenu:function(node,link){
							if(link!='default'){
								node.style.fontFamily=link;
							}
							node.style.fontSize='20px';
						},
						onclick:function(font){
							game.saveConfig('name_font',font);
							lib.init.cssstyles();
						}
					},
					identity_font:{
						name:'身份字体',
						init:'huangcao',
						unfrequent:true,
						item:{},
						textMenu:function(node,link){
							if(link!='default'){
								node.style.fontFamily=link;
							}
							node.style.fontSize='20px';
						},
						onclick:function(font){
							game.saveConfig('identity_font',font);
							lib.init.cssstyles();
						}
					},
					cardtext_font:{
						name:'卡牌字体',
						init:'default',
						unfrequent:true,
						item:{},
						textMenu:function(node,link){
							if(link!='default'){
								node.style.fontFamily=link;
							}
							node.style.fontSize='20px';
						},
						onclick:function(font){
							game.saveConfig('cardtext_font',font);
							lib.init.cssstyles();
						}
					},
					global_font:{
						name:'界面字体',
						init:'default',
						unfrequent:true,
						item:{},
						textMenu:function(node,link){
							if(link!='default'){
								node.style.fontFamily=link;
							}
							else{
								node.style.fontFamily="'STHeiti','SimHei','Microsoft JhengHei','Microsoft YaHei','WenQuanYi Micro Hei','Suits',Helvetica,Arial,sans-serif";
							}
							node.style.fontSize='20px';
						},
						onclick:function(font){
							game.saveConfig('global_font',font);
							lib.init.cssstyles();
						}
					},
					suits_font:{
						name:'替换花色字体',
						init:true,
						unfrequent:true,
						intro:'使用全角字符的花色替代系统自带的花色（重启游戏后生效）',
						onclick:function(bool){
							game.saveConfig('suits_font',bool);
						}
					},
					update:function(config,map){
						if(lib.config.custom_button){
							map.custom_button_system_top.show();
							map.custom_button_system_bottom.show();
							map.custom_button_control_top.show();
							map.custom_button_control_bottom.show();
						}
						else{
							map.custom_button_system_top.hide();
							map.custom_button_system_bottom.hide();
							map.custom_button_control_top.hide();
							map.custom_button_control_bottom.hide();
						}
						if(lib.config.change_skin){
							map.change_skin_auto.show();
						}
						else{
							map.change_skin_auto.hide();
						}
						if(lib.config.image_background_random){
							map.image_background_blur.show();
							map.image_background.hide();
							// map.import_background.hide();
						}
						else{
							map.image_background.show();
							if(lib.config.image_background=='default'){
								map.image_background_blur.hide();
							}
							else{
								map.image_background_blur.show();
							}
							// if(lib.config.image_background=='custom'&&lib.db){
							// 	map.import_background.show();
							// }
							// else{
							// 	map.import_background.hide();
							// }
						}
						if(lib.config.layout=='long'||lib.config.layout=='mobile'){
							//map.textequip.show();
							map.cardshape.show();
							map.phonelayout.show();
						}
						else{
							//map.textequip.hide();
							if(lib.config.layout=='long2'||lib.config.layout=='nova'){
								map.phonelayout.show();
								map.cardshape.show();
							}
							else{
								map.phonelayout.hide();
								map.cardshape.hide();
							}
						}
						if(lib.config.layout=='long'){
							// map.fewplayer.show();
							map.player_height.show();
						}
						else{
							// map.fewplayer.hide();
							if(lib.config.layout=='long2'){
								map.player_height.show();
							}
							else{
								map.player_height.hide();
							}
						}
						if(lib.config.layout=='nova'){
							map.player_height_nova.show();
						}
						else{
							map.player_height_nova.hide();
						}
						if(lib.config.touchscreen){
							map.cursor_style.hide();
						}
						else{
							map.cursor_style.show();
						}
						if(lib.config.border_style=='auto'){
							map.autoborder_count.show();
							map.autoborder_start.show();
						}
						else{
							map.autoborder_count.hide();
							map.autoborder_start.hide();
						}
					},
				}
			},
			view:{
				name:'显示',
				config:{
					update:function(config,map){
						if(lib.config.mode=='versus'||lib.config.mode=='chess'||lib.config.mode=='tafang'||lib.config.mode=='boss'){
							map.show_handcardbutton.show();
						}
						else{
							map.show_handcardbutton.hide();
						}
						if(lib.config.touchscreen){
							map.pop_logv.hide();
						}
						else{
							map.pop_logv.show();
						}
						if(lib.device){
							if(lib.device=='android'){
								map.show_statusbar_android.show();
								map.show_statusbar_ios.hide();
							}
							else if(lib.device=='ios'){
								map.show_statusbar_ios.show();
								map.show_statusbar_android.hide();
							}
							if(!game.download){
								setTimeout(function(){
									if(!window.StatusBar){
										map.show_statusbar.hide();
									}
								},5000);
							}
						}
						else{
							map.show_statusbar_ios.hide();
							map.show_statusbar_android.hide();
						}
						if(get.is.phoneLayout()){
							map.remember_round_button.show();
							map.popequip.show();
							map.filternode_button.show();
							map.show_pause.hide();
							map.show_auto.hide();
							map.show_replay.hide();
							map.show_round_menu.show();
						}
						else{
							map.show_pause.show();
							map.show_auto.show();
							map.show_replay.show();
							map.show_round_menu.hide();
							map.remember_round_button.hide();
							map.popequip.hide();
							map.filternode_button.hide();
						}
						if(lib.config.show_card_prompt){
							map.hide_card_prompt_basic.show();
							map.hide_card_prompt_equip.show();
						}
						else{
							map.hide_card_prompt_basic.hide();
							map.hide_card_prompt_equip.hide();
						}
						if(lib.config.show_log!='off'){
							map.clear_log.show();
						}
						else{
							map.clear_log.hide();
						}
						if(get.is.phoneLayout()){
							map.show_time2.show();
							map.show_time.hide();
							if(lib.config.show_time2){
								map.watchface.show();
							}
							else{
								map.watchface.hide();
							}
						}
						else{
							map.show_time2.hide();
							map.show_time.show();
							map.watchface.hide();
						}
						if(lib.config.show_extensionmaker){
							map.show_extensionshare.show();
						}
						else{
							map.show_extensionshare.hide();
						}
					},
					show_history:{
						name:'出牌记录栏',
						init:'off',
						intro:'在屏幕左侧或右侧显示出牌记录',
						unfrequent:true,
						item:{
							off:'关闭',
							left:'靠左',
							right:'靠右',
						},
						onclick:function(bool){
							if(lib.config.show_history=='right') ui.window.animate('rightbar2');
							game.saveConfig('show_history',bool);
							if(_status.video||!_status.prepareArena) return;
							if(bool=='left'){
								ui.window.classList.add('leftbar');
								ui.window.classList.remove('rightbar');
							}
							else if(bool=='right'){
								ui.window.classList.remove('leftbar');
								ui.window.classList.add('rightbar');
							}
							else{
								ui.window.classList.remove('leftbar');
								ui.window.classList.remove('rightbar');
							}
						}
					},
					pop_logv:{
						name:'自动弹出记录',
						init:false,
						unfrequent:true
					},
					show_log:{
						name:'历史记录栏',
						init:'off',
						intro:'在屏幕中部显示出牌文字记录',
						unfrequent:true,
						item:{
							off:'关闭',
							left:'靠左',
							center:'居中',
							right:'靠右',
						},
						onclick:function(bool){
							game.saveConfig('show_log',bool);
							if(lib.config.show_log!='off'){
								ui.arenalog.style.display='';
								ui.arenalog.dataset.position=bool;
							}
							else{
								ui.arenalog.style.display='none';
								ui.arenalog.innerHTML='';
							}
						}
					},
					clear_log:{
						name:'自动清除历史记录',
						init:false,
						unfrequent:true,
						intro:'开启后将定时清除历史记录栏的条目（而不是等记录栏满后再清除）'
					},
					log_highlight:{
						name:'历史记录高亮',
						init:true,
						unfrequent:true,
						intro:'开启后历史记录不同类别的信息将以不同颜色显示',
					},
					show_time:{
						name:'显示时间',
						intro:'在屏幕顶部显示当前时间',
						init:false,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_time',bool);
							if(bool){
								ui.time.style.display='';
							}
							else{
								ui.time.style.display='none';
							}
						}
					},
					show_time2:{
						name:'显示时间',
						intro:'在触屏按钮处显示当前时间',
						init:false,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_time2',bool);
							if(bool){
								ui.roundmenu.classList.add('clock');
							}
							else{
								ui.roundmenu.classList.remove('clock');
							}
						}
					},
					watchface:{
						name:'表盘样式',
						init:'none',
						unfrequent:true,
						item:{
							none:'默认',
							simple:'简约',
						},
						onclick:function(item){
							game.saveConfig('watchface',item);
							ui.roundmenu.dataset.watchface=item;
						}
					},
					show_time3:{
						name:'显示游戏时间',
						init:false,
						unfrequent:true
					},
					show_statusbar_android:{
						name:'显示状态栏',
						init:false,
						unfrequent:true,
						content:function(bool){
							game.saveConfig('show_statusbar',bool);
							if(window.StatusBar&&lib.device=='android'){
								if(bool){
									window.StatusBar.overlaysWebView(false);
									window.StatusBar.backgroundColorByName('black');
									window.StatusBar.show();
								}
								else{
									window.StatusBar.hide();
								}
							}
						}
					},
					show_statusbar_ios:{
						name:'显示状态栏',
						init:'off',
						unfrequent:true,
						item:{
							default:'默认',
							overlay:'嵌入',
							auto:'自动',
							off:'关闭'
						},
						onclick:function(bool){
							game.saveConfig('show_statusbar_ios',bool);
							if(window.StatusBar&&lib.device=='ios'){
								if(bool!='off'&&bool!='auto'){
									if(lib.config.show_statusbar_ios=='default'){
										window.StatusBar.overlaysWebView(false);
										document.body.classList.remove('statusbar');
									}
									else{
										window.StatusBar.overlaysWebView(true);
										document.body.classList.add('statusbar');
									}
									window.StatusBar.backgroundColorByName('black');
									window.StatusBar.show();
								}
								else{
									document.body.classList.remove('statusbar');
									window.StatusBar.hide();
								}
							}
						}
					},
					show_card_prompt:{
						name:'显示出牌信息',
						intro:'出牌时在使用者上显示卡牌名称',
						init:true,
						unfrequent:true,
					},
					hide_card_prompt_basic:{
						name:'隐藏基本牌信息',
						intro:'不显示基本牌名称',
						init:false,
						unfrequent:true,
					},
					hide_card_prompt_equip:{
						name:'隐藏装备牌信息',
						intro:'不显示装备牌名称',
						init:false,
						unfrequent:true,
					},
					show_phase_prompt:{
						name:'显示阶段信息',
						intro:'在当前回合不同阶段开始时显示阶段名称',
						init:true,
						unfrequent:true,
					},
					show_phaseuse_prompt:{
						name:'出牌阶段提示',
						intro:'在你出牌时显示提示文字',
						init:true,
						unfrequent:true,
					},
					auto_popped_config:{
						name:'自动弹出选项',
						intro:'鼠标移至选项按钮时弹出模式选择菜单',
						init:true,
						unfrequent:true,
					},
					auto_popped_history:{
						name:'自动弹出历史',
						intro:'鼠标移至暂停按钮时弹出历史记录菜单',
						init:false,
						unfrequent:true,
					},
					show_round_menu:{
						name:'显示触屏按钮',
						init:true,
						unfrequent:true,
						onclick:function(bool){
							if(get.is.nomenu('show_round_menu',bool)) return false;
							game.saveConfig('show_round_menu',bool);
							if(bool&&ui.roundmenu){
								ui.roundmenu.style.display='';
							}
							else{
								ui.roundmenu.style.display='none';
								alert('关闭触屏按钮后可通过手势打开菜单（默认为下划）')
							}
						}
					},
					remember_round_button:{
						name:'记住按钮位置',
						intro:'重新开始后触屏按钮将保存的上一局的位置',
						init:false,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('remember_round_button',bool);
							if(!bool){
								ui.click.resetround();
							}
						}
					},
					remember_dialog:{
						name:'记住对话框位置',
						intro:'移动对话框后新的对话框也将在移动后的位置显示',
						init:false,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('remember_dialog',bool);
							if(!bool){
								if(ui.dialog){
									var dialog=ui.dialog;
									dialog.style.transform='';
									dialog._dragtransform=[0,0];
									dialog.style.transition='all 0.3s';
									dialog._dragtouches;
									dialog._dragorigin;
									dialog._dragorigintransform;
									setTimeout(function(){
										dialog.style.transition='';
									},500);
								}
								game.saveConfig('dialog_transform',[0,0]);
							}
						}
					},
					transparent_dialog:{
						name:'堆叠对话框虚化',
						init:false,
						intro:'当具有static属性的对话框堆叠（如五谷丰登对话框中提示无懈可击）时，将后方的对话框变为半透明',
						onclick:function(bool){
							game.saveConfig('transparent_dialog',bool);
							if(bool){
								for(var i=0;i<ui.dialogs.length;i++){
									if(ui.dialogs[i]!=ui.dialog&&ui.dialogs[i].static){
										ui.dialogs[i].unfocus();
									}
								}
							}
							else{
								for(var i=0;i<ui.dialogs.length;i++){
									if(ui.dialogs[i]!=ui.dialog&&ui.dialogs[i].static){
										ui.dialogs[i].refocus();
									}
								}
							}
						}
					},
					show_rarity:{
						name:'显示武将评级',
						init:false,
						intro:'仅供娱乐，重启后生效',
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_rarity',bool);
						}
					},
					mark_identity_style:{
						name:'标记身份操作',
						intro:'设置单击身份按钮时的操作',
						unfrequent:true,
						init:'menu',
						item:{
							menu:'菜单',
							click:'单击',
						},
					},
					character_dialog_tool:{
						name:'自由选将显示',
						intro:'点击自由选将时默认显示的条目',
						init:'最近',
						item:{
							'收藏':'收藏',
							'最近':'最近',
							'all':'全部'
						},
						unfrequent:true,
					},
					recent_character_number:{
						name:'最近使用武将',
						intro:'自由选将对话框中最近使用武将的数量',
						init:'12',
						item:{
							'6':'6',
							'12':'12',
							'20':'24',
							'30':'36',
						},
						unfrequent:true
					},
					popequip:{
						name:'触屏装备选择',
						intro:'设置触屏布局中选择装备的方式',
						init:true,
						unfrequent:true,
					},
					filternode_button:{
						name:'触屏筛选按钮',
						intro:'设置自由选将对话框中筛选按钮的样式',
						init:true,
						unfrequent:true,
					},
					show_charactercard:{
						name:'显示武将资料',
						intro:'在武将界面单击时弹出武将资料卡',
						init:true,
						unfrequent:true
					},
					show_favourite:{
						name:'显示添加收藏',
						intro:'在角色的右键菜单中显示添加收藏',
						init:false,
						unfrequent:true
					},
					show_favmode:{
						name:'显示模式收藏',
						intro:'快捷菜单中显示收藏模式',
						init:true,
						unfrequent:true
					},
					show_favourite_menu:{
						name:'显示收藏菜单',
						intro:'在选项-武将中显示收藏一栏',
						init:true,
						unfrequent:true
					},
					show_ban_menu:{
						name:'显示禁将菜单',
						intro:'在选项-武将中显示禁将一栏',
						init:true,
						unfrequent:true
					},
					right_range:{
						name:'显示距离信息',
						intro:'在角色的右键菜单中显示距离等信息',
						init:true,
						unfrequent:true
					},
					hide_card_image:{
						name:'隐藏卡牌背景',
						intro:'所有卡牌将使用文字作为背景',
						init:false,
						unfrequent:true,
						restart:true,
					},
					show_name:{
						name:'显示角色名称',
						init:false,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_name',bool);
							if(bool){
								ui.arena.classList.remove('hide_name');
							}
							else{
								ui.arena.classList.add('hide_name');
							}
						}
					},
					show_sex:{
						name:'显示角色性别',
						intro:'在角色的右键菜单中显示角色性别',
						init:true,
						unfrequent:true
					},
					show_group:{
						name:'显示角色势力',
						intro:'在角色的右键菜单中显示角色势力',
						init:true,
						unfrequent:true
					},
					show_replay:{
						name:'显示重来按钮',
						init:false,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_replay',bool);
							if(lib.config.show_replay){
								ui.replay.style.display='';
							}
							else{
								ui.replay.style.display='none';
							}
						}
					},
					show_playerids:{
						name:'显示身份按钮',
						init:true,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_playerids',bool);
							if(lib.config.show_playerids){
								ui.playerids.style.display='';
							}
							else{
								ui.playerids.style.display='none';
							}
						}
					},
					show_sortcard:{
						name:'显示整理手牌按钮',
						init:true,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_sortcard',bool);
							if(lib.config.show_sortcard){
								ui.sortCard.style.display='';
							}
							else{
								ui.sortCard.style.display='none';
							}
						}
					},
					show_pause:{
						name:'显示暂停按钮',
						init:true,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_pause',bool);
							if(lib.config.show_pause){
								ui.pause.style.display='';
							}
							else{
								ui.pause.style.display='none';
							}
						}
					},
					show_auto:{
						name:'显示托管按钮',
						init:true,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_auto',bool);
							if(lib.config.show_auto){
								ui.auto.style.display='';
							}
							else{
								ui.auto.style.display='none';
							}
						}
					},
					show_volumn:{
						name:'显示音量按钮',
						init:true,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_volumn',bool);
							if(lib.config.show_volumn){
								ui.volumn.style.display='';
							}
							else{
								ui.volumn.style.display='none';
							}
						}
					},
					show_cardpile:{
						name:'显示牌堆按钮',
						init:true,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_cardpile',bool);
							if(bool){
								ui.cardPileButton.style.display='';
							}
							else{
								ui.cardPileButton.style.display='none';
							}
						}
					},
					show_cardpile_number:{
						name:'显示剩余牌数',
						init:false,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_cardpile_number',bool);
							if(bool){
								ui.cardPileNumber.style.display='';
							}
							else{
								ui.cardPileNumber.style.display='none';
							}
						}
					},
					show_handcardbutton:{
						name:'显示手牌按钮',
						init:true,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_handcardbutton',bool);
						}
					},
					show_giveup:{
						name:'显示投降按钮',
						init:true,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_giveup',bool);
						}
					},
					show_wuxie:{
						name:'显示无懈按钮',
						intro:'在右上角显示不询问无懈',
						init:false,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_wuxie',bool);
							if(lib.config.show_wuxie){
								ui.wuxie.style.display='';
							}
							else{
								ui.wuxie.style.display='none';
							}
						}
					},
					wuxie_right:{
						name:'无懈按钮靠左',
						init:true,
						unfrequent:true,
					},
					show_discardpile:{
						name:'暂停时显示弃牌堆',
						init:false,
						unfrequent:true,
					},
					show_extensionmaker:{
						name:'显示制作扩展',
						init:true,
						unfrequent:true,
					},
					show_extensionshare:{
						name:'显示分享扩展',
						init:true,
						unfrequent:true,
					},
					show_characternamepinyin:{
						name:'显示武将名注解',
						intro:'在武将资料卡显示武将名及其注解、性别、势力、体力等信息',
						init:'showPinyin',
						unfrequent:true,
						item:{
							doNotShow:'不显示',
							showPinyin:'拼音(样式一)',
							showCodeIdentifier:'代码ID(样式一)',
							showPinyin2:'拼音(样式二)',
							showCodeIdentifier2:'代码ID(样式二)',
						},
						visualMenu:(node,link,name)=>{
							node.classList.add('button','character');
							const style=node.style;
							style.alignItems='center';
							style.animation='background-position-left-center-right-center-left-center 15s ease infinite';
							style.background='linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB)';
							style.backgroundSize='400% 400%';
							style.display='flex';
							style.height='60px';
							style.justifyContent='center';
							style.width='180px';
							const firstChild=node.firstChild;
							firstChild.removeAttribute('class');
							firstChild.style.position='initial';
							if(link=='doNotShow') return;
							const ruby=document.createElement('ruby');
							ruby.textContent=name;
							const rt=document.createElement('rt');
							rt.style.fontSize='smaller';
							if(link=='showPinyin2'||link=='showCodeIdentifier2'){
								rt.textContent=link=='showCodeIdentifier2'?'['+link+']':'['+get.pinyin(name)+']';
								ruby.appendChild(rt);
							}else{
								const leftParenthesisRP=document.createElement('rp');
								leftParenthesisRP.textContent='（';
								ruby.appendChild(leftParenthesisRP);
								rt.textContent=link=='showCodeIdentifier'?link:get.pinyin(name).join(' ');
								ruby.appendChild(rt);
								const rightParenthesisRP=document.createElement('rp');
								rightParenthesisRP.textContent='）';
								ruby.appendChild(rightParenthesisRP);
							}
							firstChild.innerHTML=ruby.outerHTML;
						}
					},
					show_skillnamepinyin:{
						name:'显示技能名注解',
						intro:'在武将资料卡显示技能名注解',
						get init(){
							return lib.configMenu.view.config.show_characternamepinyin.init;
						},
						get unfrequent(){
							return lib.configMenu.view.config.show_characternamepinyin.unfrequent;
						},
						get item(){
							return lib.configMenu.view.config.show_characternamepinyin.item;
						},
						get visualMenu(){
							return lib.configMenu.view.config.show_characternamepinyin.visualMenu;
						}
					}
				}
			},
			audio:{
				name:'音效',
				config:{
					update:function(config,map){
						if(lib.config.background_music=='music_custom'&&(lib.device||lib.node)){
							map.import_music.show();
						}
						else{
							map.import_music.hide();
						}
						map.clear_background_music[get.is.object(lib.config.customBackgroundMusic)?'show':'hide']();
						ui.background_music_setting=map.background_music;
						map.background_music._link.config.updatex.call(map.background_music,[]);
					},
					background_music:{
						updatex:function(){
							this.lastChild.innerHTML=this._link.config.item[lib.config.background_music];
							var menu=this._link.menu;
							for(var i=0;i<menu.childElementCount;i++){
								if(!['music_off','music_custom','music_random'].concat(lib.config.all.background_music).contains(menu.childNodes[i]._link)) menu.childNodes[i].delete();
							}
						},
						name:'背景音乐',
						init:true,
						item:{
							music_default:'默认',
						},
						onclick:function(item){
							game.saveConfig('background_music',item);
							game.playBackgroundMusic();
						}
					},
					import_music:{
						name:'<div style="white-space:nowrap;width:calc(100% - 5px)">'+
						'<input type="file" style="width:calc(100% - 40px)" accept="audio/*">'+
						'<button style="width:40px">确定</button></div>',
						clear:true,
					},
					background_audio:{
						name:'游戏音效',
						init:true,
					},
					background_speak:{
						name:'人物配音',
						init:true,
					},
					equip_audio:{
						name:'装备配音',
						init:false,
					},
					repeat_audio:{
						name:'播放重复语音',
						init:false,
					},
					volumn_audio:{
						name:'音效音量',
						init:8,
						item:{
							'0':'〇',
							'1':'一',
							'2':'二',
							'3':'三',
							'4':'四',
							'5':'五',
							'6':'六',
							'7':'七',
							'8':'八',
						},
						onclick:function(volume){
							game.saveConfig('volumn_audio',parseInt(volume));
						}
					},
					volumn_background:{
						name:'音乐音量',
						init:8,
						item:{
							'0':'〇',
							'1':'一',
							'2':'二',
							'3':'三',
							'4':'四',
							'5':'五',
							'6':'六',
							'7':'七',
							'8':'八',
						},
						onclick:function(volume){
							game.saveConfig('volumn_background',parseInt(volume));
							ui.backgroundMusic.volume=volume/8;
						}
					},
					clear_background_music:{
						name:'清除自定义背景音乐',
						clear:true,
						onclick:function(){
							if(confirm('是否清除已导入的所有自定义背景音乐？（该操作不可撤销！）')){
								for(var i in lib.config.customBackgroundMusic){
									lib.config.all.background_music.remove(i);
									if(i.startsWith('cdv_')){
										game.removeFile('audio/background/'+i+'.mp3');
									}
									else{
										game.deleteDB('audio',i);
									}
								}
								lib.config.customBackgroundMusic=null;
								game.saveConfig('customBackgroundMusic',null);
								game.saveConfig('background_music','music_off');
								if(!_status._aozhan) game.playBackgroundMusic();
							}
						},
					},
				}
			},
			skill:{
				name:'技能',
				config:{
					update:function(config,map){
						for(var i in map){
							if(map[i]._link.config.type=='autoskill'){
								if(!lib.config.autoskilllist.contains(i)){
									map[i].classList.add('on');
								}
								else{
									map[i].classList.remove('on');
								}
							}
							else if(map[i]._link.config.type=='banskill'){
								if(!lib.config.forbidlist.contains(i)){
									map[i].classList.add('on');
								}
								else{
									map[i].classList.remove('on');
								}
							}
						}
					}
				}
			},
			others:{
				name:'其它',
				config:{
					// reset_database:{
					// 	name:'重置游戏',
					// 	onclick:function(){
					// 		var node=this;
					// 		if(node._clearing){
					// 			if(indexedDB) indexedDB.deleteDatabase(lib.configprefix+'data');
					// 			game.reload();
					// 			return;
					// 		}
					// 		node._clearing=true;
					// 		node.innerHTML='单击以确认 (3)';
					// 		setTimeout(function(){
					// 			node.innerHTML='单击以确认 (2)';
					// 			setTimeout(function(){
					// 				node.innerHTML='单击以确认 (1)';
					// 				setTimeout(function(){
					// 					node.innerHTML='重置游戏录像';
					// 					delete node._clearing;
					// 				},1000);
					// 			},1000);
					// 		},1000);
					// 	},
					// 	clear:true
					// },
					reset_game:{
						name:'重置游戏设置',
						onclick:function(){
							var node=this;
							if(node._clearing){
								var noname_inited=localStorage.getItem('noname_inited');
								var onlineKey=localStorage.getItem(lib.configprefix+'key');
								localStorage.clear();
								if(noname_inited){
									localStorage.setItem('noname_inited',noname_inited);
								}
								if(onlineKey){
									localStorage.setItem(lib.configprefix+'key',onlineKey);
								}
								game.deleteDB('config');
								game.deleteDB('data');
								game.reload();
								return;
							}
							node._clearing=true;
							node.firstChild.innerHTML='单击以确认 (3)';
							setTimeout(function(){
								node.firstChild.innerHTML='单击以确认 (2)';
								setTimeout(function(){
									node.firstChild.innerHTML='单击以确认 (1)';
									setTimeout(function(){
										node.firstChild.innerHTML='重置游戏设置';
										delete node._clearing;
									},1000);
								},1000);
							},1000);
						},
						clear:true
					},
					reset_hiddenpack:{
						name:'重置隐藏内容',
						onclick:function(){
							if(this.firstChild.innerHTML!='已重置'){
								this.firstChild.innerHTML='已重置'
								game.saveConfig('hiddenModePack',[]);
								game.saveConfig('hiddenCharacterPack',[]);
								game.saveConfig('hiddenCardPack',[]);
								game.saveConfig('hiddenPlayPack',[]);
								game.saveConfig('hiddenBackgroundPack',[]);
								var that=this;
								setTimeout(function(){
									that.firstChild.innerHTML='重置隐藏内容';
									setTimeout(function(){
										if(confirm('是否重新启动使改变生效？')){
											game.reload();
										}
									});
								},500);
							}
						},
						clear:true
					},
					reset_tutorial:{
						name:'重置新手向导',
						onclick:function(){
							if(this.firstChild.innerHTML!='已重置'){
								this.firstChild.innerHTML='已重置'
								game.saveConfig('new_tutorial',false);
								game.saveConfig('prompt_hidebg');
								game.saveConfig('prompt_hidepack');
								var that=this;
								setTimeout(function(){
									that.firstChild.innerHTML='重置新手向导';
								},500);
							}
						},
						clear:true
					},
					import_data:{
						name:'导入游戏设置',
						onclick:function(){
							ui.import_data_button.classList.toggle('hidden');
						},
						clear:true
					},
					import_data_button:{
						name:'<div style="white-space:nowrap;width:calc(100% - 10px)">'+
						'<input type="file" accept="*/*" style="width:calc(100% - 40px)">'+
						'<button style="width:40px">确定</button></div>',
						clear:true,
					},
					export_data:{
						name:'导出游戏设置',
						onclick:function(){
							var data;
							var export_data=function(data){
								game.export(lib.init.encode(JSON.stringify(data)),'无名杀 - 数据 - '+(new Date()).toLocaleString());
							}
							if(!lib.db){
								data={};
								for(var i in localStorage){
									if(i.startsWith(lib.configprefix)){
										data[i]=localStorage[i];
									}
								}
								export_data(data);
							}
							else{
								game.getDB('config',null,function(data1){
									game.getDB('data',null,function(data2){
										export_data({
											config:data1,
											data:data2
										});
									});
								});
							}

						},
						clear:true
					},
					redownload_game:{
						name:'重新下载游戏',
						onclick:function(){
							var node=this;
							if(node._clearing){
								localStorage.removeItem('noname_inited');
								game.reload();
								return;
							}
							node._clearing=true;
							node.firstChild.innerHTML='单击以确认 (3)';
							setTimeout(function(){
								node.firstChild.innerHTML='单击以确认 (2)';
								setTimeout(function(){
									node.firstChild.innerHTML='单击以确认 (1)';
									setTimeout(function(){
										node.firstChild.innerHTML='重新下载游戏';
										delete node._clearing;
									},1000);
								},1000);
							},1000);
						},
						clear:true
					},
					update:function(config,map){
						if(lib.device||lib.node){
							map.redownload_game.show();
						}
						else{
							map.redownload_game.hide();
						}
					}
					// trim_game:{
					// 	name:'隐藏非官方扩展包',
					// 	onclick:function(){
					// 		if(this.innerHTML!='已隐藏'){
					// 			this.innerHTML='已隐藏';
					//      						 var pack=lib.config.all.cards.slice(0);
					//      						 if(Array.isArray(lib.config.hiddenCardPack)){
					//      									  for(var i=0;i<lib.config.hiddenCardPack.length;i++){
					//      															pack.add(lib.config.hiddenCardPack[i]);
					//      									  }
					//      						 }
					//      						 for(var i=0;i<pack.length;i++){
					//      									  if(lib.config.all.sgscards.contains(pack[i])){
					//      															pack.splice(i--,1);
					//      									  }
					//      						 }
					// 			game.saveConfig('hiddenCardPack',pack);
					//
					//      						 var pack=lib.config.all.characters.slice(0);
					//      						 if(Array.isArray(lib.config.hiddenCharacterPack)){
					//      									  for(var i=0;i<lib.config.hiddenCharacterPack.length;i++){
					//      															pack.add(lib.config.hiddenCharacterPack[i]);
					//      									  }
					//      						 }
					//      						 for(var i=0;i<pack.length;i++){
					//      									  if(lib.config.all.sgscharacters.contains(pack[i])){
					//      															pack.splice(i--,1);
					//      									  }
					//      						 }
					// 			game.saveConfig('hiddenCharacterPack',pack);
					//
					//      						 var pack=lib.config.all.mode.slice(0);
					//      						 if(Array.isArray(lib.config.hiddenModePack)){
					//      									  for(var i=0;i<lib.config.hiddenModePack.length;i++){
					//      															pack.add(lib.config.hiddenModePack[i]);
					//      									  }
					//      						 }
					//      						 for(var i=0;i<pack.length;i++){
					//      									  if(lib.config.all.sgsmodes.contains(pack[i])){
					//      															pack.splice(i--,1);
					//      									  }
					//      						 }
					// 			game.saveConfig('hiddenModePack',pack);
					//
					// 			var that=this;
					// 			setTimeout(function(){
					// 				that.innerHTML='隐藏非官方扩展包';
					// 			},500);
					// 		}
					// 	},
					// 	clear:true
					// }
				}
			}
		},
		extensionMenu:{
			cardpile:{
				enable:{
					name:'开启',
					init:false,
					restart:true,
				},
				intro:{
					name:'将杀闪等牌在牌堆中的比例维持在与军争牌堆相同，防止开启扩展包后被过多地稀释',
					clear:true,
					nopointer:true,
				},
				sha:{
					name:'杀',
					init:'1',
					item:{
						'1':'补充全部',
						'0.5':'补充一半',
						'0':'不补充'
					}
				},
				huosha:{
					name:'火杀',
					init:'1',
					item:{
						'1':'补充全部',
						'0.5':'补充一半',
						'0':'不补充'
					}
				},
				leisha:{
					name:'雷杀',
					init:'1',
					item:{
						'1':'补充全部',
						'0.5':'补充一半',
						'0':'不补充'
					}
				},
				shan:{
					name:'闪',
					init:'1',
					item:{
						'1':'补充全部',
						'0.5':'补充一半',
						'0':'不补充'
					}
				},
				tao:{
					name:'桃',
					init:'0',
					item:{
						'1':'补充全部',
						'0.5':'补充一半',
						'0':'不补充'
					}
				},
				jiu:{
					name:'酒',
					init:'0',
					item:{
						'1':'补充全部',
						'0.5':'补充一半',
						'0':'不补充'
					}
				},
				wuxie:{
					name:'无懈可击',
					init:'0.5',
					item:{
						'1':'补充全部',
						'0.5':'补充一半',
						'0':'不补充'
					}
				},
				nanman:{
					name:'南蛮入侵',
					init:'0',
					item:{
						'1':'补充全部',
						'0.5':'补充一半',
						'0':'不补充'
					}
				},
				wanjian:{
					name:'万箭齐发',
					init:'0',
					item:{
						'1':'补充全部',
						'0.5':'补充一半',
						'0':'不补充'
					}
				},
				guohe:{
					name:'过河拆桥',
					init:'0',
					item:{
						'1':'补充全部',
						'0.5':'补充一半',
						'0':'不补充'
					}
				},
				shunshou:{
					name:'顺手牵羊',
					init:'0',
					item:{
						'1':'补充全部',
						'0.5':'补充一半',
						'0':'不补充'
					}
				},
				tiesuo:{
					name:'铁索连环',
					init:'0',
					item:{
						'1':'补充全部',
						'0.5':'补充一半',
						'0':'不补充'
					}
				},
				hide:{
					name:'隐藏此扩展',
					clear:true,
					onclick:function(){
						if(this.firstChild.innerHTML=='隐藏此扩展'){
							this.firstChild.innerHTML='此扩展将在重启后隐藏';
							lib.config.hiddenPlayPack.add('cardpile');
							if(!lib.config.prompt_hidepack){
								alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
								game.saveConfig('prompt_hidepack',true);
							}
						}
						else{
							this.firstChild.innerHTML='隐藏此扩展';
							lib.config.hiddenPlayPack.remove('cardpile');
						}
						game.saveConfig('hiddenPlayPack',lib.config.hiddenPlayPack);
					}
				},
			},
			boss:{
				enable:{
					name:'开启',
					init:false,
					restart:true,
					onswitch:function(bool){
						if(bool){
							var storage={boss:{},versus:{},translate:{}};
							var loadversus=function(){
								game.loadModeAsync('versus',function(mode){
									for(var i in mode.translate){
										storage.translate[i]=mode.translate[i];
									}
									for(var i in mode.jiangeboss){
										if(mode.jiangeboss[i][4].contains('bossallowed')){
											storage.versus[i]=mode.jiangeboss[i];
										}
									}
									localStorage.setItem('boss_storage_playpackconfig',JSON.stringify(storage));
								});
							};
							game.loadModeAsync('boss',function(mode){
								for(var i in mode.translate){
									storage.translate[i]=mode.translate[i];
								}
								for(var i in mode.characterPack.mode_boss){
									if(mode.characterPack.mode_boss[i][4].contains('bossallowed')){
										storage.boss[i]=mode.characterPack.mode_boss[i];
									}
								}
								loadversus();
							});
						}
						else{
							localStorage.removeItem('boss_storage_playpackconfig');
						}
					}
				},
				intro:{
					name:'将剑阁和挑战模式的武将添加到其它模式',
					clear:true,
					nopointer:true,
				},
				enableai:{
					name:'随机选将可用',
					init:false
				},
				hide:{
					name:'隐藏此扩展',
					clear:true,
					onclick:function(){
						if(this.firstChild.innerHTML=='隐藏此扩展'){
							this.firstChild.innerHTML='此扩展将在重启后隐藏';
							lib.config.hiddenPlayPack.add('boss');
							if(!lib.config.prompt_hidepack){
								alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
								game.saveConfig('prompt_hidepack',true);
							}
						}
						else{
							this.firstChild.innerHTML='隐藏此扩展';
							lib.config.hiddenPlayPack.remove('boss');
						}
						game.saveConfig('hiddenPlayPack',lib.config.hiddenPlayPack);
					}
				},
			},
			wuxing:{
				enable:{
					name:'开启',
					init:false,
					restart:true,
				},
				intro:{
					name:'每名角色和部分卡牌在游戏开始时随机获得一个属性',
					clear:true,
					nopointer:true,
				},
				num:{
					name:'带属性卡牌',
					init:'0.3',
					item:{
						'0.1':'10%',
						'0.2':'20%',
						'0.3':'30%',
						'0.5':'50%',
					}
				},
				hide:{
					name:'隐藏此扩展',
					clear:true,
					onclick:function(){
						if(this.firstChild.innerHTML=='隐藏此扩展'){
							this.firstChild.innerHTML='此扩展将在重启后隐藏';
							lib.config.hiddenPlayPack.add('wuxing');
							if(!lib.config.prompt_hidepack){
								alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
								game.saveConfig('prompt_hidepack',true);
							}
						}
						else{
							this.firstChild.innerHTML='隐藏此扩展';
							lib.config.hiddenPlayPack.remove('wuxing');
						}
						game.saveConfig('hiddenPlayPack',lib.config.hiddenPlayPack);
					}
				},
			},
			coin:{
				enable:{
					name:'开启',
					init:false,
					restart:true,
					onclick:function(bool){
						if(bool){
							lib.config.plays.add('coin');
						}
						else{
							lib.config.plays.remove('coin');
						}
						game.saveConfig('plays',lib.config.plays);
					}
				},
				intro:{
					name:'每完成一次对局，可获得一定数量的金币；金币可用于购买游戏特效',
					clear:true,
					nopointer:true,
				},
				display:{
					name:'金币显示',
					init:'text',
					item:{
						symbol:'符号',
						text:'文字'
					},
					onclick:function(item){
						game.saveConfig('coin_display_playpackconfig',item);
						if(game.changeCoin) game.changeCoin(0);
					}
				},
				canvas:{
					name:'特效置顶',
					init:false,
					onclick:function(bool){
						game.saveConfig('coin_canvas_playpackconfig',bool);
						if(bool){
							ui.window.classList.add('canvas_top');
						}
						else{
							ui.window.classList.remove('canvas_top');
						}
					}
				},
				hide:{
					name:'隐藏此扩展',
					clear:true,
					onclick:function(){
						if(this.firstChild.innerHTML=='隐藏此扩展'){
							this.firstChild.innerHTML='此扩展将在重启后隐藏';
							lib.config.hiddenPlayPack.add('coin');
							if(!lib.config.prompt_hidepack){
								alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
								game.saveConfig('prompt_hidepack',true);
							}
						}
						else{
							this.firstChild.innerHTML='隐藏此扩展';
							lib.config.hiddenPlayPack.remove('coin');
						}
						game.saveConfig('hiddenPlayPack',lib.config.hiddenPlayPack);
					}
				},
			},
		},
		mode:{
			identity:{
				name:'身份',
				connect:{
					update:function(config,map){
						if(config.connect_identity_mode=='zhong'){
							map.connect_player_number.hide();
							map.connect_limit_zhu.hide();
							map.connect_enhance_zhu.hide();
							map.connect_double_nei.hide();
							map.connect_zhong_card.show();
							map.connect_special_identity.hide();
							map.connect_double_character.show();
						}
						else if(config.connect_identity_mode=='purple'){
							map.connect_player_number.hide();
							map.connect_limit_zhu.hide();
							map.connect_enhance_zhu.hide();
							map.connect_double_nei.hide();
							map.connect_zhong_card.hide();
							map.connect_special_identity.hide();
							map.connect_double_character.hide();
						}
						else{
							map.connect_double_character.show();
							map.connect_player_number.show();
							map.connect_limit_zhu.show();
							map.connect_enhance_zhu.show();
							if(config.connect_player_number!='2'){
								map.connect_double_nei.show();
							}
							else{
								map.connect_double_nei.hide();
							}
							map.connect_zhong_card.hide();

							if(config.connect_player_number=='8'){
								map.connect_special_identity.show();
							}
							else{
								map.connect_special_identity.hide();
							}
						}
					},
					connect_identity_mode:{
						name:'游戏模式',
						init:'normal',
						item:{
							normal:'标准',
							zhong:'明忠',
							purple:'3v3v2',
						},
						restart:true,
						frequent:true,
						intro:'明忠模式和3v3v2模式详见帮助'
					},
					connect_player_number:{
						name:'游戏人数',
						init:'8',
						item:{
							'2':'两人',
							'3':'三人',
							'4':'四人',
							'5':'五人',
							'6':'六人',
							'7':'七人',
							'8':'八人'
						},
						frequent:true,
						restart:true,
					},
					connect_limit_zhu:{
						name:'常备主候选武将数',
						init:'group',
						restart:true,
						item:{
							off:'不限制',
							group:'按势力筛选',
							'4':'四',
							'6':'六',
							'8':'八',
						},
					},
					connect_zhong_card:{
						name:'明忠卡牌替换',
						init:true,
						frequent:true,
						restart:true
					},
					connect_double_nei:{
						name:'双内奸',
						init:false,
						restart:true,
						// frequent:true,
						intro:'开启后游戏中将有两个内奸（内奸胜利条件仍为主内1v1时击杀主公）'
					},
					connect_double_character:{
						name:'双将模式',
						init:false,
						frequent:true,
						restart:true,
					},
					connect_change_card:{
						name:'启用手气卡',
						init:false,
						frequent:true,
						restart:true,
					},
					connect_special_identity:{
						name:'特殊身份',
						init:false,
						restart:true,
						frequent:true,
						intro:'开启后游戏中将增加军师、大将、贼首三个身份'
					},
					// connect_ban_weak:{
					// 	name:'屏蔽弱将',
					// 	init:true,
					// 	restart:true,
					// },
					// connect_ban_strong:{
					// 	name:'屏蔽强将',
					// 	init:false,
					// 	restart:true,
					// },
					connect_enhance_zhu:{
						name:'加强主公',
						init:false,
						restart:true,
						intro:'为主公增加一个额外技能'
					},
				},
				config:{
					update:function(config,map){
						if(config.identity_mode=='zhong'){
							map.player_number.hide();
							map.enhance_zhu.hide();
							map.double_nei.hide();
							map.auto_identity.hide();
							map.choice_zhu.hide();
							map.limit_zhu.hide();
							map.choice_zhong.hide();
							map.choice_nei.hide();
							map.choice_fan.hide();
							map.ban_identity.hide();
							map.ban_identity2.hide();
							map.ban_identity3.hide();
							map.zhong_card.show();
							map.special_identity.hide();
							map.choose_group.show();
							map.change_choice.show();
							map.auto_mark_identity.show();
							map.double_character.show();
							map.free_choose.show();
							map.change_identity.show();
							if(config.double_character){
								map.double_hp.show();
							}
							else{
								map.double_hp.hide();
							}
							map.continue_game.show();
						}
						else if(config.identity_mode=='purple'){
							map.player_number.hide();
							map.enhance_zhu.hide();
							map.double_nei.hide();
							map.auto_identity.hide();
							map.choice_zhu.hide();
							map.limit_zhu.hide();
							map.choice_zhong.hide();
							map.choice_nei.hide();
							map.choice_fan.hide();
							map.ban_identity.hide();
							map.ban_identity2.hide();
							map.ban_identity3.hide();
							map.zhong_card.hide();
							map.special_identity.hide();
							map.double_character.hide();
							map.double_hp.hide();
							map.choose_group.hide();
							map.auto_mark_identity.hide();
							map.change_choice.hide();
							map.free_choose.hide();
							map.change_identity.hide();
							map.continue_game.hide();
						}
						else{
							map.continue_game.show();
							map.player_number.show();
							map.enhance_zhu.show();
							map.auto_identity.show();
							if(config.player_number!='2'){
								map.double_nei.show();
							}
							else{
								map.double_nei.hide();
							}
							map.choice_zhu.show();
							map.limit_zhu.show();
							map.choice_zhong.show();
							map.choice_nei.show();
							map.choice_fan.show();
							map.ban_identity.show();
							if(config.ban_identity=='off'){
								map.ban_identity2.hide();
							}
							else{
								map.ban_identity2.show();
							}
							if(config.ban_identity=='off'||config.ban_identity2=='off'){
								map.ban_identity3.hide();
							}
							else{
								map.ban_identity3.show();
							}
							map.zhong_card.hide();
							map.choose_group.show();
							map.auto_mark_identity.show();
							map.change_choice.show();
							map.free_choose.show();
							map.change_identity.show();
							if(config.player_number=='8'){
								map.special_identity.show();
							}
							else{
								map.special_identity.hide();
							}
							map.double_character.show();
							if(config.double_character){
								map.double_hp.show();
							}
							else{
								map.double_hp.hide();
							}
						}
					},
					identity_mode:{
						name:'游戏模式',
						init:'normal',
						item:{
							normal:'标准',
							zhong:'明忠',
							purple:'3v3v2',
						},
						restart:true,
						frequent:true,
						intro:'明忠模式详见帮助'
					},
					player_number:{
						name:'游戏人数',
						init:'8',
						item:{
							'2':'两人',
							'3':'三人',
							'4':'四人',
							'5':'五人',
							'6':'六人',
							'7':'七人',
							'8':'八人'
						},
						frequent:true,
						restart:true,
					},
					double_nei:{
						name:'双内奸',
						init:false,
						restart:true,
						frequent:true,
						intro:'开启后游戏中将有两个内奸（内奸胜利条件仍为主内1v1时击杀主公）'
					},
					choose_group:{
						name:'神武将选择势力',
						init:true,
						restart:true,
						frequent:true,
						intro:'若开启此选项，选择神武将的玩家需在亮出自己的武将牌之前为自己选择一个势力。'
					},
					nei_fullscreenpop:{
						name:'主内单挑特效',
						intro:'在进入主内单挑时，弹出全屏文字特效',
						init:true,
						unfrequent:true,
					},
					double_character:{
						name:'双将模式',
						init:false,
						frequent:true,
						restart:true,
					},
					special_identity:{
						name:'特殊身份',
						init:false,
						restart:true,
						frequent:true,
						intro:'开启后游戏中将增加军师、大将、贼首三个身份'
					},
					zhong_card:{
						name:'明忠卡牌替换',
						init:true,
						frequent:true,
						restart:true
					},
					double_hp:{
						name:'双将体力上限',
						init:'pingjun',
						item:{
							hejiansan:'和减三',
							pingjun:'平均值',
							zuidazhi:'最大值',
							zuixiaozhi:'最小值',
							zonghe:'相加',
						},
						restart:true,
					},
					auto_identity:{
						name:'自动显示身份',
						item:{
							off:'关闭',
							one:'一轮',
							two:'两轮',
							three:'三轮',
							always:'始终'
						},
						init:'off',
						onclick:function(bool){
							game.saveConfig('auto_identity',bool,this._link.config.mode);
							if(get.config('identity_mode')=='zhong') return;
							var num;
							switch(bool){
								case '一轮':num=1;break;
								case '两轮':num=2;break;
								case '三轮':num=3;break;
								default:num=0;break;
							}
							if(num&!_status.identityShown&&game.phaseNumber>game.players.length*num&&game.showIdentity){
								_status.identityShown=true;
								game.showIdentity(false);
							}
						},
						intro:'游戏进行若干轮将自动显示所有角色的身份',
					},
					auto_mark_identity:{
						name:'自动标记身份',
						init:true,
						intro:'根据角色的出牌行为自动标记可能的身份',
					},
					// ban_weak:{
					// 	name:'屏蔽弱将',
					// 	init:true,
					// 	restart:true,
					// },
					// ban_strong:{
					// 	name:'屏蔽强将',
					// 	init:false,
					// 	restart:true,
					// },
					enhance_zhu:{
						name:'加强主公',
						init:false,
						restart:true,
						intro:'为主公增加一个额外技能'
					},
					free_choose:{
						name:'自由选将',
						init:true,
						onclick:function(bool){
							game.saveConfig('free_choose',bool,this._link.config.mode);
							if(get.mode()!=this._link.config.mode||!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat2&&get.config('free_choose')) ui.create.cheat2();
							else if(ui.cheat2&&!get.config('free_choose')){
								ui.cheat2.close();
								delete ui.cheat2;
							}
						}
					},
					change_identity:{
						name:'自由选择身份和座位',
						init:true,
						onclick:function(bool){
							game.saveConfig('change_identity',bool,this._link.config.mode);
							if(get.mode()!='identity'||!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							var dialog;
							if(ui.cheat2&&ui.cheat2.backup) dialog=ui.cheat2.backup;
							else dialog=_status.event.dialog;
							if(!_status.brawl||!_status.brawl.noAddSetting){
								if(!dialog.querySelector('table')&&get.config('change_identity')) _status.event.getParent().addSetting(dialog);
								else _status.event.getParent().removeSetting(dialog);
							}
							ui.update();
						}
					},
					change_choice:{
						name:'开启换将卡',
						init:true,
						onclick:function(bool){
							game.saveConfig('change_choice',bool,this._link.config.mode);
							if(get.mode()!='identity'||!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat&&get.config('change_choice')) ui.create.cheat();
							else if(ui.cheat&&!get.config('change_choice')){
								ui.cheat.close();
								delete ui.cheat;
							}
						}
					},
					change_card:{
						name:'开启手气卡',
						init:'disabled',
						item:{
							disabled:'禁用',
							once:'一次',
							twice:'两次',
							unlimited:'无限',
						},
					},
					continue_game:{
						name:'显示再战',
						init:false,
						onclick:function(bool){
							game.saveConfig('continue_game',bool,this._link.config.mode);
							if(get.config('continue_game')&&get.mode()=='identity'){
								if(!ui.continue_game&&_status.over&&!_status.brawl&&!game.no_continue_game){
									ui.continue_game=ui.create.control('再战',game.reloadCurrent);
								}
							}
							else if(ui.continue_game){
								ui.continue_game.close();
								delete ui.continue_game;
							}
						},
						intro:'游戏结束后可选择用相同的武将再进行一局游戏'
					},
					dierestart:{
						name:'死亡后显示重来',
						init:true,
						onclick:function(bool){
							game.saveConfig('dierestart',bool,this._link.config.mode);
							if(get.config('dierestart')&&get.mode()=='identity'){
								if(!ui.restart&&game.me.isDead()&&!_status.connectMode){
									ui.restart=ui.create.control('restart',game.reload);
								}
							}
							else if(ui.restart){
								ui.restart.close();
								delete ui.restart;
							}
						}
					},
					revive:{
						name:'死亡后显示复活',
						init:false,
						onclick:function(bool){
							game.saveConfig('revive',bool,this._link.config.mode);
							if(get.config('revive')&&get.mode()=='identity'){
								if(!ui.revive&&game.me.isDead()){
									ui.revive=ui.create.control('revive',ui.click.dierevive);
								}
							}
							else if(ui.revive){
								ui.revive.close();
								delete ui.revive;
							}
						}
					},
					ban_identity:{
						name:'屏蔽身份',
						init:'off',
						item:{
							off:'关闭',
							zhu:'主公',
							zhong:'忠臣',
							nei:'内奸',
							fan:'反贼',
						},
					},
					ban_identity2:{
						name:'屏蔽身份2',
						init:'off',
						item:{
							off:'关闭',
							zhu:'主公',
							zhong:'忠臣',
							nei:'内奸',
							fan:'反贼',
						},
					},
					ban_identity3:{
						name:'屏蔽身份3',
						init:'off',
						item:{
							off:'关闭',
							zhu:'主公',
							zhong:'忠臣',
							nei:'内奸',
							fan:'反贼',
						},
					},
					ai_strategy:{
						name:'内奸策略',
						init:'ai_strategy_1',
						item:{
							ai_strategy_1:'均衡',
							ai_strategy_2:'偏反',
							ai_strategy_3:'偏忠',
							ai_strategy_4:'酱油',
							ai_strategy_5:'天使',
							ai_strategy_6:'仇主',
						},
						intro:'设置内奸对主忠反的态度'
					},
					difficulty:{
						name:'AI对人类态度',
						init:'normal',
						item:{
							easy:'友好',
							normal:'一般',
							hard:'仇视',
						},
					},
					choice_zhu:{
						name:'主公候选武将数',
						init:'3',
						restart:true,
						item:{
							'3':'三',
							'4':'四',
							'5':'五',
							'6':'六',
							'8':'八',
							'10':'十',
						},
					},
					limit_zhu:{
						name:'常备主候选武将数',
						init:'group',
						restart:true,
						item:{
							off:'不限制',
							group:'按势力筛选',
							'4':'四',
							'6':'六',
							'8':'八',
						},
					},
					choice_zhong:{
						name:'忠臣候选武将数',
						init:'4',
						restart:true,
						item:{
							'3':'三',
							'4':'四',
							'5':'五',
							'6':'六',
							'8':'八',
							'10':'十',
						},
					},
					choice_nei:{
						name:'内奸候选武将数',
						init:'5',
						restart:true,
						item:{
							'3':'三',
							'4':'四',
							'5':'五',
							'6':'六',
							'8':'八',
							'10':'十',
						},
					},
					choice_fan:{
						name:'反贼候选武将数',
						init:'3',
						restart:true,
						item:{
							'3':'三',
							'4':'四',
							'5':'五',
							'6':'六',
							'8':'八',
							'10':'十',
						},
					},
				}
			},
			guozhan:{
				name:'国战',
				connect:{
					connect_guozhan_mode:{
						name:'游戏模式',
						init:'normal',
						item:{
							normal:'势备',
							yingbian:'应变',
							old:'怀旧',
						},
						frequent:true,
						restart:true,
						intro:'<li>势备：默认模式，使用线下《君临天下·势备篇》的牌堆进行游戏。<br><li>应变：使用OL的应变国战牌堆进行游戏。<br><li>怀旧：使用传统国战的牌堆进行游戏。',
					},
					connect_player_number:{
						name:'游戏人数',
						init:'8',
						item:{
							'3':'三人',
							'4':'四人',
							'5':'五人',
							'6':'六人',
							'7':'七人',
							'8':'八人'
						},
						frequent:true,
						restart:true,
					},
					connect_initshow_draw:{
						name:'首亮奖励',
						item:{
							'off':'关闭',
							'draw':'摸牌',
							'mark':'标记',
						},
						init:'mark',
						frequent:true,
						intro:'第一个明置武将牌的角色可获得首亮奖励'
					},
					connect_aozhan:{
						name:'鏖战模式',
						init:true,
						intro:'若开启此选项，则将在游戏中引入“鏖战模式”的规则：<br>当游戏中仅剩四名或更少角色时（七人以下游戏时改为三名或更少），若此时全场没有超过一名势力相同的角色，则从一个新的回合开始，游戏进入鏖战模式直至游戏结束。<br>◇在鏖战模式下，【桃】只能当做【杀】或【闪】使用或打出，不能用来回复体力。<br>注：进入鏖战模式后，即使之后有两名或者更多势力相同的角色出现，仍然不会取消鏖战模式。',
						frequent:true,
						restart:true,
					},
					connect_viewnext:{
						name:'观看下家副将',
						init:false,
						intro:'若开启此选项，所有的玩家将在挑选武将后，分发起始手牌之前，分别观看自己下家的副将。',
					},
					connect_zhulian:{
						name:'珠联璧合',
						init:true,
						// frequent:true,
						intro:'主将和副将都明置后，若为特定组合，可获得【珠联璧合】标记'
					},
					connect_junzhu:{
						name:'替换君主',
						init:true,
						// frequent:true,
						restart:true,
						intro:'若开启此选项，玩家的第一个回合开始时，若其主武将牌有对应的君主武将牌，则其可以将此武将牌替换为对应的君主武将牌，然后重新调整体力上限。若玩家的体力上限因此增大，则玩家回复等量的体力。'
					},
					connect_change_card:{
						name:'启用手气卡',
						init:false,
						frequent:true,
						restart:true,
					},
					// connect_ban_weak:{
					// 	name:'屏蔽弱将',
					// 	init:false,
					// 	restart:true,
					// },
					// connect_ban_strong:{
					// 	name:'屏蔽强将',
					// 	init:false,
					// 	restart:true,
					// },
				},
				config:{
					update:function(config,map){
						if(config.onlyguozhan){
							map.junzhu.show();
						}
						else{
							map.junzhu.hide();
						}
						ui.aozhan_bgm=map.aozhan_bgm;
						map.aozhan_bgm._link.config.updatex.call(map.aozhan_bgm,[]);
					},
					guozhan_mode:{
						name:'游戏模式',
						init:'normal',
						item:{
							normal:'势备',
							yingbian:'应变',
							old:'怀旧',
							free:'自由',
						},
						frequent:true,
						restart:true,
						intro:'<li>势备：默认模式，使用线下《君临天下·势备篇》的牌堆进行游戏。<br><li>应变：使用OL的应变国战牌堆进行游戏。<br><li>怀旧：使用传统国战的牌堆进行游戏。<br><li>自由：使用玩家的自定义牌堆进行游戏。',
					},
					player_number:{
						name:'游戏人数',
						init:'8',
						item:{
							'3':'三人',
							'4':'四人',
							'5':'五人',
							'6':'六人',
							'7':'七人',
							'8':'八人'
						},
						frequent:true,
						restart:true,
					},
					initshow_draw:{
						name:'首亮奖励',
						item:{
							'off':'关闭',
							'draw':'摸牌',
							'mark':'标记',
						},
						init:'mark',
						frequent:true,
						intro:'第一个明置身份牌的角色可获得摸牌奖励'
					},
					aozhan:{
						name:'鏖战模式',
						init:true,
						frequent:true,
						restart:true,
						intro:'若开启此选项，则将在游戏中引入“鏖战模式”的规则：<br>当游戏中仅剩四名或更少角色时（七人以下游戏时改为三名或更少），若此时全场没有超过一名势力相同的角色，则从一个新的回合开始，游戏进入鏖战模式直至游戏结束。<br>◇在鏖战模式下，【桃】只能当做【杀】或【闪】使用或打出，不能用来回复体力。<br>注：进入鏖战模式后，即使之后有两名或者更多势力相同的角色出现，仍然不会取消鏖战模式。',
					},
					viewnext:{
						name:'观看下家副将',
						init:false,
						intro:'若开启此选项，所有的玩家将在挑选武将后，分发起始手牌之前，分别观看自己下家的副将。',
					},
					aozhan_bgm:{
						updatex:function(){
							this.lastChild.innerHTML=this._link.config.item[lib.config.mode_config.guozhan.aozhan_bgm];
							if(!Array.isArray(_status.aozhanBGMToRemove)) return;
							const menu=this._link.menu;
							for(let i=0;i<menu.childElementCount;i++){
								const link=menu.childNodes[i]._link;
								if(['disabled','random'].includes(link)||!_status.aozhanBGMToRemove.includes(link)) continue;
								_status.aozhanBGMToRemove.remove(link);
								menu.childNodes[i].delete();
							}
						},
						name:'鏖战背景音乐',
						item:{
							disabled:'不启用',
							online:'Online',
							rewrite:'Rewrite',
							chaoming:'潮鸣',
							random:'随机播放',
						},
						init:'rewrite',
						onclick:function(item){
							game.saveConfig('aozhan_bgm',item,this._link.config.mode);
							if(_status._aozhan==true) game.playBackgroundMusic();
						},
					},
					zhulian:{
						name:'珠联璧合',
						init:true,
						// frequent:true,
						intro:'主将和副将都明置后，若为特定组合，可获得【珠联璧合】标记'
					},
					changeViceType:{
						name:'副将变更方式',
						init:'default',
						item:{
							default:'发现式',
							online:'随机式',
						},
						frequent:true,
						restart:true,
					},
					onlyguozhan:{
						name:'使用国战武将',
						init:true,
						frequent:true,
						restart:true,
						intro:'开启武将技能将替换为国战版本并禁用非国战武将'
					},
					guozhanSkin:{
						name:'使用国战皮肤',
						init:true,
						frequent:true,
						restart:true,
						intro:'开启此选项后，将会把有国战专属皮肤的武将替换为国战皮肤'
					},
					junzhu:{
						name:'替换君主',
						init:true,
						// frequent:true,
						restart:true,
						intro:'若开启此选项，玩家的第一个回合开始时，若其主武将牌有对应的君主武将牌，则其可以将此武将牌替换为对应的君主武将牌，然后重新调整体力上限。若玩家的体力上限因此增大，则玩家回复等量的体力。'
					},
					double_hp:{
						name:'双将体力上限',
						init:'pingjun',
						item:{
							hejiansan:'和减三',
							pingjun:'平均值',
							zuidazhi:'最大值',
							zuixiaozhi:'最小值',
							zonghe:'相加',
						},
						restart:true,
					},
					// ban_weak:{
					// 	name:'屏蔽弱将',
					// 	init:true,
					// 	restart:true,
					// },
					// ban_strong:{
					// 	name:'屏蔽强将',
					// 	init:false,
					// 	restart:true,
					// },
					free_choose:{
						name:'自由选将',
						init:true,
						onclick:function(bool){
							game.saveConfig('free_choose',bool,this._link.config.mode);
							if(get.mode()!=this._link.config.mode||!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat2&&get.config('free_choose')) ui.create.cheat2();
							else if(ui.cheat2&&!get.config('free_choose')){
								ui.cheat2.close();
								delete ui.cheat2;
							}
						}
					},
					onlyguozhanexpand:{
						name:'默认展开自由选将',
						init:false,
						restart:true,
						intro:'开启后自由选将对话框将默认显示全部武将'
					},
					change_identity:{
						name:'自由选择座位',
						init:true,
						onclick:function(bool){
							game.saveConfig('change_identity',bool,this._link.config.mode);
							if(get.mode()!='guozhan'||!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							var dialog;
							if(ui.cheat2&&ui.cheat2.backup) dialog=ui.cheat2.backup;
							else dialog=_status.event.dialog;
							if(!_status.brawl||!_status.brawl.noAddSetting){
								if(!dialog.querySelector('table')&&get.config('change_identity')) _status.event.getParent().addSetting(dialog);
								else _status.event.getParent().removeSetting(dialog);
							}
							ui.update();
						}
					},
					change_choice:{
						name:'开启换将卡',
						init:true,
						onclick:function(bool){
							game.saveConfig('change_choice',bool,this._link.config.mode);
							if(get.mode()!='guozhan'||!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat&&get.config('change_choice')) ui.create.cheat();
							else if(ui.cheat&&!get.config('change_choice')){
								ui.cheat.close();
								delete ui.cheat;
							}
						}
					},
					change_card:{
						name:'开启手气卡',
						init:'disabled',
						item:{
							disabled:'禁用',
							once:'一次',
							twice:'两次',
							unlimited:'无限',
						}
					},
					continue_game:{
						name:'显示再战',
						init:true,
						intro:'游戏结束后可选择用相同的武将再进行一局游戏',
						onclick:function(bool){
							game.saveConfig('continue_game',bool,this._link.config.mode);
							if(get.config('continue_game')&&get.mode()=='guozhan'){
								if(!ui.continue_game&&_status.over&&!_status.brawl&&!game.no_continue_game){
									ui.continue_game=ui.create.control('再战',game.reloadCurrent);
								}
							}
							else if(ui.continue_game){
								ui.continue_game.close();
								delete ui.continue_game;
							}
						}
					},
					dierestart:{
						name:'死亡后显示重来',
						init:true,
						onclick:function(bool){
							game.saveConfig('dierestart',bool,this._link.config.mode);
							if(get.config('dierestart')&&get.mode()=='guozhan'){
								if(!ui.restart&&game.me.isDead()&&!_status.connectMode){
									ui.restart=ui.create.control('restart',game.reload);
								}
							}
							else if(ui.restart){
								ui.restart.close();
								delete ui.restart;
							}
						}
					},
					revive:{
						name:'死亡后显示复活',
						init:false,
						onclick:function(bool){
							game.saveConfig('revive',bool,this._link.config.mode);
							if(get.config('revive')&&get.mode()=='guozhan'){
								if(!ui.revive&&game.me.isDead()){
									ui.revive=ui.create.control('revive',ui.click.dierevive);
								}
							}
							else if(ui.revive){
								ui.revive.close();
								delete ui.revive;
							}
						}
					},
					difficulty:{
						name:'AI对人类态度',
						init:'normal',
						item:{
							easy:'友好',
							normal:'一般',
							hard:'仇视',
						}
					},
					choice_num:{
						name:'候选武将数',
						init:'7',
						restart:true,
						item:{
							'5':'五',
							'6':'六',
							'7':'七',
							'8':'八',
							'9':'九',
							'10':'十',
						}
					},
				}
			},
			versus:{
				name:'对决',
				connect:{
					update:function(config,map){
						if(config.connect_versus_mode=='1v1'){
							map.connect_choice_num.show();
							map.connect_replace_number.show();
						}
						else{
							map.connect_choice_num.hide();
							map.connect_replace_number.hide();
						}
						if(config.connect_versus_mode=='2v2'||config.connect_versus_mode=='3v3'){
							map.connect_replace_handcard.show();
						}
						else{
							map.connect_replace_handcard.hide();
						}
					},
					connect_versus_mode:{
						name:'游戏模式',
						init:'1v1',
						item:{
							'1v1':'1v1',
							'2v2':'2v2',
							'3v3':'3v3',
							'4v4':'4v4',
							'guandu':'官渡',
						},
						frequent:true
					},
					connect_replace_handcard:{
						name:'四号位保护',
						init:true,
						frequent:true,
						intro:'最后行动的角色起始手牌数+1'
					},
					connect_choice_num:{
						name:'侯选武将数',
						init:'20',
						frequent:true,
						item:{
							'12':'12人',
							'16':'16人',
							'20':'20人',
							'24':'24人',
							'40':'40人',
						}
					},
					connect_replace_number:{
						name:'替补人数',
						init:'2',
						frequent:true,
						item:{
							'0':'无',
							'1':'1人',
							'2':'2人',
							'3':'3人',
							'4':'4人',
							'5':'5人',
						}
					},
					// connect_ban_weak:{
					// 	name:'屏蔽弱将',
					// 	init:true,
					// 	restart:true,
					// },
					// connect_ban_strong:{
					// 	name:'屏蔽强将',
					// 	init:false,
					// 	restart:true,
					// },
				},
				config:{
					update:function(config,map){
						if(config.versus_mode=='four'){
							map.change_choice.hide();
							map.ladder.show();
							if(config.ladder){
								map.ladder_monthly.show();
								map.ladder_reset.show();
							}
							else{
								map.ladder_monthly.hide();
								map.ladder_reset.hide();
							}
							map.enable_all.show();
							map.enable_all_cards_four.show();
							map.four_assign.show();
							map.four_phaseswap.show();
							map.expand_dialog.show();
							map.fouralign.show();
							map.edit_character_four.show();
							map.reset_character_four.show();
						}
						else{
							map.change_choice.show();
							map.ladder.hide();
							map.ladder_monthly.hide();
							map.ladder_reset.hide();
							map.enable_all.hide();
							map.enable_all_cards_four.hide();
							map.four_assign.hide();
							map.four_phaseswap.hide();
							map.expand_dialog.hide();
							map.fouralign.hide();
							map.edit_character_four.hide();
							map.reset_character_four.hide();
						}
						if(config.versus_mode=='three'){
							map.edit_character_three.show();
							map.reset_character_three.show();
						}
						else{
							map.edit_character_three.hide();
							map.reset_character_three.hide();
						}
						if(config.versus_mode=='three'||config.versus_mode=='one'){
							map.enable_all_three.show();
							map.enable_all_cards.show();
						}
						else{
							map.enable_all_three.hide();
							map.enable_all_cards.hide();
						}
						if(config.versus_mode=='jiange'||config.versus_mode=='two'||config.versus_mode=='endless'||
							config.versus_mode=='three'||config.versus_mode=='one'||config.versus_mode=='siguo'){
							map.free_choose.show();
						}
						else{
							map.free_choose.hide();
						}
						if(config.versus_mode=='jiange'){
							map.double_character_jiange.show();
						}
						else{
							map.double_character_jiange.hide();
						}
						if(config.versus_mode=='two'){
							map.replace_handcard_two.show();
							map.replace_character_two.show();
							map.two_assign.show();
							map.two_phaseswap.show();
						}
						else{
							map.replace_handcard_two.hide();
							map.replace_character_two.hide();
							map.two_assign.hide();
							map.two_phaseswap.hide();
						}
						if(config.versus_mode=='two'||config.versus_mode=='siguo'||config.versus_mode=='four'){
							if(config.versus_mode=='four'&&(config.four_assign||config.four_phaseswap)){
								map.change_identity.hide();
							}
							else{
								map.change_identity.show();
							}
						}
						else{
							map.change_identity.hide();
						}
						if(config.versus_mode=='siguo'){
							map.siguo_character.show();
						}
						else{
							map.siguo_character.hide();
						}
					},
					versus_mode:{
						name:'游戏模式',
						init:'four',
						item:{
							four:'对抗',
							three:'统率',
							two:'欢乐',
							guandu:'官渡',
							jiange:'剑阁',
							siguo:'四国',
							standard:'自由'
							// endless:'无尽',
							// triple:'血战',
							// one:'<span style="display:inline-block;width:100%;text-align:center">1v1</span>',
						},
						restart:true,
						frequent:true,
					},
					ladder:{
						name:'天梯模式',
						init:true,
						frequent:true,
						restart:true
					},
					ladder_monthly:{
						name:'每月重置天梯',
						init:true,
						frequent:true,
					},
					enable_all:{
						name:'启用全部武将',
						init:false,
						frequent:true,
						restart:true,
					},
					enable_all_cards_four:{
						name:'启用全部卡牌',
						init:false,
						frequent:true,
						restart:true,
					},
					enable_all_three:{
						name:'启用全部武将',
						init:false,
						frequent:true,
						restart:true,
					},
					enable_all_cards:{
						name:'启用全部卡牌',
						init:false,
						frequent:true,
						restart:true,
					},
					four_assign:{
						name:'代替队友选将',
						init:false,
						restart:true,
					},
					four_phaseswap:{
						name:'代替队友行动',
						init:false,
						restart:true,
					},
					two_assign:{
						name:'代替队友选将',
						init:false,
						restart:true,
					},
					two_phaseswap:{
						name:'代替队友行动',
						init:false,
						restart:true,
					},
					free_choose:{
						name:'自由选将',
						init:true,
						frequent:true,
						onclick:function(bool){
							game.saveConfig('free_choose',bool,this._link.config.mode);
							if(!ui.create.cheat2) return;
							if(get.mode()!=this._link.config.mode||!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat2&&get.config('free_choose')) ui.create.cheat2();
							else if(ui.cheat2&&!get.config('free_choose')){
								ui.cheat2.close();
								delete ui.cheat2;
							}
						}
					},
					fouralign:{
						name:'自由选择阵型',
						init:false
					},
					change_identity:{
						name:'自由选择座位',
						init:true,
						onclick:function(bool){
							game.saveConfig('change_identity',bool,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(_status.mode=='four'){
								if(get.config('four_assign')||get.config('four_phaseswap')) return;
								if(bool){
									if(_status.event.parent.addSetting){
										_status.event.parent.addSetting();
									}
								}
								else{
									var seats=_status.event.parent.seatsbutton;
									if(seats){
										while(seats.length){
											seats.shift().remove();
										}
										delete _status.event.parent.seatsbutton;
									}
								}
							}
							else{
								var dialog;
								if(ui.cheat2&&ui.cheat2.backup) dialog=ui.cheat2.backup;
								else dialog=_status.event.dialog;
								if(!_status.brawl||!_status.brawl.noAddSetting){
									if(!dialog.querySelector('table')&&get.config('change_identity')) _status.event.getParent().addSetting(dialog);
									else _status.event.getParent().removeSetting(dialog);
								}
								ui.update();
							}
						}
					},
					change_choice:{
						name:'开启换将卡',
						init:true,
						onclick:function(bool){
							game.saveConfig('change_choice',bool,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat&&get.config('change_choice')) ui.create.cheat();
							else if(ui.cheat&&!get.config('change_choice')){
								ui.cheat.close();
								delete ui.cheat;
							}
						},
						frequent:true,
					},
					double_character_jiange:{
						name:'双将模式',
						init:false,
						frequent:true,
					},
					replace_handcard_two:{
						name:'四号位保护',
						init:true,
						frequent:true,
						intro:'最后行动的角色起始手牌+1'
					},
					replace_character_two:{
						name:'替补模式',
						init:false,
						frequent:true,
						intro:'每个额外选择一名武将，死亡后用该武将代替重新上场，替补武将用完时失败'
					},
					expand_dialog:{
						name:'默认展开选将框',
						intro:'选将框打开时直接显示全部武将（可能使游戏在开始时卡顿）',
						init:false,
					},
					siguo_character:{
						name:'专属武将出场率',
						init:'increase',
						item:{
							increase:'大概率',
							normal:'默认概率',
							off:'不出现',
						},
						frequent:true
					},
					// ban_weak:{
					// 	name:'屏蔽弱将',
					// 	init:true,
					// 	restart:true,
					// },
					// ban_strong:{
					// 	name:'屏蔽强将',
					// 	init:false,
					// 	restart:true
					// },
					ladder_reset:{
						name:'重置天梯数据',
						onclick:function(){
							var node=this;
							if(node._clearing){
								game.save('ladder',{
									current:900,
									top:900,
									month:(new Date()).getMonth()
								});
								ui.ladder.innerHTML='卫士五';
								clearTimeout(node._clearing);
								node.firstChild.innerHTML='重置天梯数据';
								delete node._clearing;
								return;
							}
							node.firstChild.innerHTML='单击以确认 (3)';
							node._clearing=setTimeout(function(){
								node.firstChild.innerHTML='单击以确认 (2)';
								node._clearing=setTimeout(function(){
									node.firstChild.innerHTML='单击以确认 (1)';
									node._clearing=setTimeout(function(){
										node.firstChild.innerHTML='重置天梯数据';
										delete node._clearing;
									},1000);
								},1000);
							},1000);
						},
						clear:true,
					},
					edit_character_three:{
						name:'编辑统率将池',
						clear:true,
						onclick:function(){
							if(get.mode()!='versus'){
								alert('请进入对决模式，然后再编辑将池');
								return;
							}
							var container=ui.create.div('.popup-container.editor');
							var node=container;
							var map=get.config('character_three')||lib.choiceThree;
							var str='character=[\n    ';
							for(var i=0;i<map.length;i++){
								str+='"'+map[i]+'",';
								if(i+1<map.length&&(i+1)%5==0) str+='\n    ';
							}
							str+='\n];';
							node.code=str;
							ui.window.classList.add('shortcutpaused');
							ui.window.classList.add('systempaused');
							var saveInput=function(){
								var code;
								if(container.editor){
									code=container.editor.getValue();
								}
								else if(container.textarea){
									code=container.textarea.value;
								}
								try{
									var character=null;
									eval(code);
									if(!Array.isArray(character)){
										throw('err');
									}
								}
								catch(e){
									var tip=lib.getErrorTip(e)||'';
									alert('代码语法有错误，请仔细检查（' + e + '）' + tip);
									window.focus();
									if(container.editor){
										container.editor.focus();
									}
									else if(container.textarea){
										container.textarea.focus();
									}
									return;
								}
								game.saveConfig('character_three',character,'versus');
								ui.window.classList.remove('shortcutpaused');
								ui.window.classList.remove('systempaused');
								container.delete();
								container.code=code;
								delete window.saveNonameInput;
							};
							window.saveNonameInput=saveInput;
							var editor=ui.create.editor(container,saveInput);
							if(node.aced){
								ui.window.appendChild(node);
								node.editor.setValue(node.code,1);
							}
							else if(lib.device=='ios'){
								ui.window.appendChild(node);
								if(!node.textarea){
									var textarea=document.createElement('textarea');
									editor.appendChild(textarea);
									node.textarea=textarea;
									lib.setScroll(textarea);
								}
								node.textarea.value=node.code;
							}
							else{
								if(!window.CodeMirror){
									lib.init.js(lib.assetURL+'game','codemirror',()=>lib.codeMirrorReady(node,editor));
									lib.init.css(lib.assetURL+'layout/default','codemirror');
								}
								else{
									lib.codeMirrorReady(node,editor);
								}
							};
						},
					},
					reset_character_three:{
						name:'重置统率将池',
						intro:'将统率三军模式下的将池重置为默认将池',
						clear:true,
						onclick:function(){
							if(confirm('该操作不可撤销！是否清除统率三军模式的自定义将池，并将其重置为默认将池？')){
								game.saveConfig('character_three',null,'versus');
								alert('将池已重置');
							}
						},
					},
					edit_character_four:{
						name:'编辑4v4将池',
						clear:true,
						onclick:function(){
							if(get.mode()!='versus'){
								alert('请进入对决模式，然后再编辑将池');
								return;
							}
							var container=ui.create.div('.popup-container.editor');
							var node=container;
							var map=get.config('character_four')||lib.choiceFour;
							var str='character=[\n    ';
							for(var i=0;i<map.length;i++){
								str+='"'+map[i]+'",';
								if(i+1<map.length&&(i+1)%5==0) str+='\n    ';
							}
							str+='\n];';
							node.code=str;
							ui.window.classList.add('shortcutpaused');
							ui.window.classList.add('systempaused');
							var saveInput=function(){
								var code;
								if(container.editor){
									code=container.editor.getValue();
								}
								else if(container.textarea){
									code=container.textarea.value;
								}
								try{
									var character=null;
									eval(code);
									if(!Array.isArray(character)){
										throw('err');
									}
								}
								catch(e){
									var tip=lib.getErrorTip(e)||'';
									alert('代码语法有错误，请仔细检查（'+e+'）'+tip);
									window.focus();
									if(container.editor){
										container.editor.focus();
									}
									else if(container.textarea){
										container.textarea.focus();
									}
									return;
								}
								game.saveConfig('character_four',character,'versus');
								ui.window.classList.remove('shortcutpaused');
								ui.window.classList.remove('systempaused');
								container.delete();
								container.code=code;
								delete window.saveNonameInput;
							};
							window.saveNonameInput=saveInput;
							var editor=ui.create.editor(container,saveInput);
							if(node.aced){
								ui.window.appendChild(node);
								node.editor.setValue(node.code,1);
							}
							else if(lib.device=='ios'){
								ui.window.appendChild(node);
								if(!node.textarea){
									var textarea=document.createElement('textarea');
									editor.appendChild(textarea);
									node.textarea=textarea;
									lib.setScroll(textarea);
								}
								node.textarea.value=node.code;
							}
							else{
								if(!window.CodeMirror){
									lib.init.js(lib.assetURL+'game','codemirror',()=>lib.codeMirrorReady(node,editor));
									lib.init.css(lib.assetURL+'layout/default','codemirror');
								}
								else{
									lib.codeMirrorReady(node,editor);
								}
							};
						},
					},
					reset_character_four:{
						name:'重置4v4将池',
						intro:'将4v4模式下的将池重置为默认将池',
						clear:true,
						onclick:function(){
							if(confirm('该操作不可撤销！是否清除4v4模式的自定义将池，并将其重置为默认将池？')){
								game.saveConfig('character_four',null,'versus');
								alert('将池已重置');
							}
						},
					},
				}
			},
			connect:{
				name:'联机',
				config:{
					connect_nickname:{
						name:'联机昵称',
						input:true,
						frequent:true,
					},
					connect_avatar:{
						name:'联机头像',
						init:'caocao',
						item:{},
						frequent:true,
						onclick:function(item){
							game.saveConfig('connect_avatar',item);
							game.saveConfig('connect_avatar',item,'connect');
						}
					},
					hall_ip:{
						name:'联机大厅',
						input:true,
						frequent:true,
					},
					hall_button:{
						name:'联机大厅按钮',
						init:true,
						frequent:true,
						onclick:function(bool){
							game.saveConfig('hall_button',bool,'connect');
							if(ui.hall_button){
								if(bool){
									ui.hall_button.style.display='';
								}
								else{
									ui.hall_button.style.display='none';
								}
							}
						}
					},
					wss_mode:{
						name:'使用WSS协议',
						init:false,
						frequent:true,
						intro:'在用户填写的IP地址没有直接指定使用WS/WSS协议的情况下，默认使用WSS协议，而非WS协议来连接到联机服务器。<br>请不要轻易勾选此项！',
					},
				}
			},
			boss:{
				name:'挑战',
				config:{
					free_choose:{
						name:'自由选将',
						init:true,
						frequent:true,
						onclick:function(bool){
							game.saveConfig('free_choose',bool,this._link.config.mode);
							if(get.mode()!=this._link.config.mode||!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat2&&get.config('free_choose')) ui.create.cheat2();
							else if(ui.cheat2&&!get.config('free_choose')){
								ui.cheat2.close();
								delete ui.cheat2;
							}
						}
					},
					change_choice:{
						name:'开启换将卡',
						init:true,
						onclick:function(bool){
							game.saveConfig('change_choice',bool,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat&&get.config('change_choice')) ui.create.cheat();
							else if(ui.cheat&&!get.config('change_choice')){
								ui.cheat.close();
								delete ui.cheat;
							}
						},
						frequent:true,
					},
					single_control:{
						name:'单人控制',
						init:true,
						frequent:true,
						onclick:function(bool){
							game.saveConfig('single_control',bool,this._link.config.mode);
							if(ui.single_swap&&game.me!=game.boss){
								if(bool){
									ui.single_swap.style.display='none';
								}
								else{
									ui.single_swap.style.display='';
								}
							}
						},
						intro:'只控制一名角色，其他角色由AI控制'
					},
					// ban_weak:{
					// 	name:'屏蔽弱将',
					// 	init:true,
					// 	restart:true,
					// },
					// ban_strong:{
					// 	name:'屏蔽强将',
					// 	init:false,
					// 	restart:true,
					// },
				}
			},
			doudizhu:{
				name:'斗地主',
				connect:{
					update:function(config,map){
						if(config.connect_doudizhu_mode=='online'){
							map.connect_change_card.hide();
						}
						else{
							map.connect_change_card.show();
						}
						if(config.connect_doudizhu_mode!='normal'){
							map.connect_double_character.hide();
						}
						else{
							map.connect_double_character.show();
						}
					},
					connect_doudizhu_mode:{
						name:'游戏模式',
						init:'normal',
						item:{
							normal:'休闲',
							kaihei:'开黑',
							huanle:'欢乐',
							binglin:'兵临',
							online:'智斗',
						},
						restart:true,
						frequent:true,
					},
					connect_double_character:{
						name:'双将模式',
						init:false,
						frequent:true,
						restart:true,
					},
					connect_change_card:{
						name:'启用手气卡',
						init:false,
						frequent:true,
						restart:true,
					},
				},
				config:{
					update:function(config,map){
						if(config.doudizhu_mode=='online'){
							map.change_card.hide();
							map.edit_character.show();
							map.reset_character.show();
						}
						else{
							map.change_card.show();
							map.edit_character.hide();
							map.reset_character.hide();
						}
						if(config.doudizhu_mode!='normal'){
							map.double_character.hide();
							map.free_choose.hide();
							map.change_identity.hide();
							map.change_choice.hide();
							map.continue_game.hide();
							map.dierestart.hide();
							map.choice_zhu.hide();
							map.choice_fan.hide();
							map.revive.hide();
						}
						else{
							map.double_character.show();
							map.free_choose.show();
							map.change_identity.show();
							map.change_choice.show();
							map.continue_game.show();
							map.dierestart.show();
							map.choice_zhu.show();
							map.choice_fan.show();
							map.revive.show();
						}
						if(config.double_character&&config.doudizhu_mode=='normal'){
							map.double_hp.show();
						}
						else{
							map.double_hp.hide();
						}
					},
					doudizhu_mode:{
						name:'游戏模式',
						init:'normal',
						item:{
							normal:'休闲',
							kaihei:'开黑',
							huanle:'欢乐',
							binglin:'兵临',
							online:'智斗',
						},
						restart:true,
						frequent:true,
					},
					double_character:{
						name:'双将模式',
						init:false,
						frequent:true,
						restart:true,
					},
					double_hp:{
						name:'双将体力上限',
						init:'pingjun',
						item:{
							hejiansan:'和减三',
							pingjun:'平均值',
							zuidazhi:'最大值',
							zuixiaozhi:'最小值',
							zonghe:'相加',
						},
						restart:true,
					},
					free_choose:{
						name:'自由选将',
						init:true,
						onclick:function(bool){
							game.saveConfig('free_choose',bool,this._link.config.mode);
							if(get.mode()!=this._link.config.mode||!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat2&&get.config('free_choose')) ui.create.cheat2();
							else if(ui.cheat2&&!get.config('free_choose')){
								ui.cheat2.close();
								delete ui.cheat2;
							}
						}
					},
					change_identity:{
						name:'自由选择身份和座位',
						init:true,
						onclick:function(bool){
							game.saveConfig('change_identity',bool,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							var dialog;
							if(ui.cheat2&&ui.cheat2.backup) dialog=ui.cheat2.backup;
							else dialog=_status.event.dialog;
							if(!_status.brawl||!_status.brawl.noAddSetting){
								if(!dialog.querySelector('table')&&get.config('change_identity')) _status.event.getParent().addSetting(dialog);
								else _status.event.getParent().removeSetting(dialog);
							}
							ui.update();
						}
					},
					change_choice:{
						name:'开启换将卡',
						init:true,
						onclick:function(bool){
							game.saveConfig('change_choice',bool,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat&&get.config('change_choice')) ui.create.cheat();
							else if(ui.cheat&&!get.config('change_choice')){
								ui.cheat.close();
								delete ui.cheat;
							}
						}
					},
					change_card:{
						name:'开启手气卡',
						init:'disabled',
						item:{
							disabled:'禁用',
							once:'一次',
							twice:'两次',
							unlimited:'无限',
						},
					},
					continue_game:{
						name:'显示再战',
						init:false,
						onclick:function(bool){
							game.saveConfig('continue_game',bool,this._link.config.mode);
							if(get.config('continue_game')){
								if(!ui.continue_game&&_status.over&&!_status.brawl&&!game.no_continue_game){
									ui.continue_game=ui.create.control('再战',game.reloadCurrent);
								}
							}
							else if(ui.continue_game){
								ui.continue_game.close();
								delete ui.continue_game;
							}
						},
						intro:'游戏结束后可选择用相同的武将再进行一局游戏'
					},
					dierestart:{
						name:'死亡后显示重来',
						init:true,
						onclick:function(bool){
							game.saveConfig('dierestart',bool,this._link.config.mode);
							if(get.config('dierestart')){
								if(!ui.restart&&game.me.isDead()&&!_status.connectMode){
									ui.restart=ui.create.control('restart',game.reload);
								}
							}
							else if(ui.restart){
								ui.restart.close();
								delete ui.restart;
							}
						}
					},
					revive:{
						name:'死亡后显示复活',
						init:false,
						onclick:function(bool){
							game.saveConfig('revive',bool,this._link.config.mode);
							if(get.config('revive')){
								if(!ui.revive&&game.me.isDead()){
									ui.revive=ui.create.control('revive',ui.click.dierevive);
								}
							}
							else if(ui.revive){
								ui.revive.close();
								delete ui.revive;
							}
						}
					},
					choice_zhu:{
						name:'地主候选武将数',
						init:'3',
						restart:true,
						item:{
							'3':'三',
							'4':'四',
							'5':'五',
							'6':'六',
							'8':'八',
							'10':'十',
						},
					},
					choice_fan:{
						name:'农民候选武将数',
						init:'3',
						restart:true,
						item:{
							'3':'三',
							'4':'四',
							'5':'五',
							'6':'六',
							'8':'八',
							'10':'十',
						},
					},
					edit_character:{
						name:'编辑将池',
						clear:true,
						onclick:function(){
							if(get.mode()!='doudizhu'){
								alert('请进入斗地主模式，然后再编辑将池');
								return;
							}
							var container=ui.create.div('.popup-container.editor');
							var node=container;
							var map=get.config('character_online')||lib.characterOnline;
							node.code='character='+get.stringify(map)+'\n/*\n    这里是智斗三国模式的武将将池。\n    您可以在这里编辑对武将将池进行编辑，然后点击“保存”按钮即可保存。\n    将池中的Key势力武将，仅同时在没有被禁用的情况下，才会出现在选将框中。\n    而非Key势力的武将，只要所在的武将包没有被隐藏，即可出现在选将框中。\n    该将池为单机模式/联机模式通用将池。在这里编辑后，即使进入联机模式，也依然会生效。\n    但联机模式本身禁用的武将（如神貂蝉）不会出现在联机模式的选将框中。\n*/';
							ui.window.classList.add('shortcutpaused');
							ui.window.classList.add('systempaused');
							var saveInput=function(){
								var code;
								if(container.editor){
									code=container.editor.getValue();
								}
								else if(container.textarea){
									code=container.textarea.value;
								}
								try{
									var character=null;
									eval(code);
									if(!get.is.object(character)){
										throw('err');
									}
									var groups=[];
									for(var i in character){
										if(!Array.isArray(character[i])) throw('type');
										if(character[i].length>=3) groups.push(i);
									}
									if(groups.length<3) throw('enough');
								}
								catch(e){
									if(e=='type'){
										alert('请严格按照格式填写，不要写入不为数组的数据');
									}
									else if(e=='enough'){
										alert('请保证至少写入了3个势力，且每个势力至少有3个武将');
									}
									else if(e=='err'){
										alert('代码格式有错误，请对比示例代码仔细检查');
									}
									else{
										var tip=lib.getErrorTip(e)||'';
										alert('代码语法有错误，请仔细检查（'+e+'）'+tip);
									}
									window.focus();
									if(container.editor){
										container.editor.focus();
									}
									else if(container.textarea){
										container.textarea.focus();
									}
									return;
								}
								game.saveConfig('character_online',character,'doudizhu');
								ui.window.classList.remove('shortcutpaused');
								ui.window.classList.remove('systempaused');
								container.delete();
								container.code=code;
								delete window.saveNonameInput;
							};
							window.saveNonameInput=saveInput;
							var editor=ui.create.editor(container,saveInput);
							if(node.aced){
								ui.window.appendChild(node);
								node.editor.setValue(node.code,1);
							}
							else if(lib.device=='ios'){
								ui.window.appendChild(node);
								if(!node.textarea){
									var textarea=document.createElement('textarea');
									editor.appendChild(textarea);
									node.textarea=textarea;
									lib.setScroll(textarea);
								}
								node.textarea.value=node.code;
							}
							else{
								if(!window.CodeMirror){
									lib.init.js(lib.assetURL+'game','codemirror',()=>lib.codeMirrorReady(node,editor));
									lib.init.css(lib.assetURL+'layout/default','codemirror');
								}
								else{
									lib.codeMirrorReady(node,editor);
								}
							};
						},
					},
					reset_character:{
						name:'重置将池',
						intro:'将智斗三国模式下的将池重置为默认将池',
						clear:true,
						onclick:function(){
							if(confirm('该操作不可撤销！是否清除智斗三国模式的自定义将池，并将其重置为默认将池？')){
								game.saveConfig('character_online',null,'doudizhu');
								alert('将池已重置');
							}
						},
					},
				}
			},
			single:{
				name:'单挑',
				connect:{
					connect_single_mode:{
						name:'游戏模式',
						init:'normal',
						item:{
							normal:'新1v1',
							dianjiang:'点将单挑',
							changban:'血战长坂坡',
						},
						restart:true,
						frequent:true,
					},
					connect_enable_jin:{
						name:'启用晋势力武将',
						init:false,
						restart:true,
						frequent:true,
					},
					update:function(config,map){
						if(config.connect_single_mode!='normal'){
							map.connect_enable_jin.hide();
						}
						else{
							map.connect_enable_jin.show();
						}
					},
				},
				config:{
					single_mode:{
						name:'游戏模式',
						init:'normal',
						item:{
							normal:'新1v1',
							dianjiang:'点将单挑',
							changban:'血战长坂坡',
						},
						restart:true,
						frequent:true,
					},
					enable_jin:{
						name:'启用晋势力武将',
						init:false,
						restart:true,
						frequent:true,
					},
					update:function(config,map){
						if(config.single_mode!='normal'){
							map.enable_jin.hide();
						}
						else{
							map.enable_jin.show();
						}
					},
				}
			},
			chess:{
				name:'战棋',
				config:{
					chess_mode:{
						name:'游戏模式',
						init:'combat',
						item:{
							combat:'自由',
							three:'统率',
							leader:'君主',
						},
						restart:true,
						frequent:true,
					},
					update:function(config,map){
						if(config.chess_mode=='leader'){
							map.chess_leader_save.show();
							map.chess_leader_clear.show();
							map.chess_leader_allcharacter.show();
							map.chess_character.hide();
						}
						else{
							map.chess_leader_save.hide();
							map.chess_leader_clear.hide();
							map.chess_leader_allcharacter.hide();
							map.chess_character.show();
						}
						if(config.chess_mode=='combat'){
							// map.battle_number.show();
							// map.chess_ordered.show();
							map.free_choose.show();
							map.change_choice.show();
						}
						else{
							// map.battle_number.hide();
							// map.chess_ordered.hide();
							map.free_choose.hide();
							map.change_choice.hide();
						}
						// if(config.chess_mode!='leader'){
						// 	map.ban_weak.show();
						// 	map.ban_strong.show();
						// }
						// else{
						// 	map.ban_weak.hide();
						// 	map.ban_strong.hide();
						// }
					},
					chess_leader_save:{
						name:'选择历程',
						init:'save1',
						item:{
							save1:'一',
							save2:'二',
							save3:'三',
							save4:'四',
							save5:'五',
						},
						restart:true,
						frequent:true,
					},
					chess_leader_allcharacter:{
						name:'启用全部角色',
						init:true,
						onclick:function(bool){
							if(confirm('调整该设置将清除所有进度，是否继续？')){
								for(var i=1;i<6;i++) game.save('save'+i,null,'chess');
								game.saveConfig('chess_leader_allcharacter',bool,'chess')
								if(get.mode()=='chess') game.reload();
								return;
							}
							else this.classList.toggle('on');
						},
					},
					chess_leader_clear:{
						name:'清除进度',
						onclick:function(){
							var node=this;
							if(node._clearing){
								for(var i=1;i<6;i++) game.save('save'+i,null,'chess');
								game.reload();
								return;
							}
							node._clearing=true;
							node.firstChild.innerHTML='单击以确认 (3)';
							setTimeout(function(){
								node.firstChild.innerHTML='单击以确认 (2)';
								setTimeout(function(){
									node.firstChild.innerHTML='单击以确认 (1)';
									setTimeout(function(){
										node.firstChild.innerHTML='清除进度';
										delete node._clearing;
									},1000);
								},1000);
							},1000);
						},
						clear:true,
						frequent:true,
					},
					// chess_treasure:{
					// 	name:'战场机关',
					// 	init:'0',
					// 	frequent:true,
					// 	item:{
					// 		'0':'关闭',
					// 		'0.1':'较少出现',
					// 		'0.2':'偶尔出现',
					// 		'0.333':'时常出现',
					// 		'0.5':'频繁出现',
					// 	}
					// },
					chess_obstacle:{
						name:'随机路障',
						init:'0.2',
						item:{
							'0':'关闭',
							'0.2':'少量',
							'0.333':'中量',
							'0.5':'大量',
						},
						frequent:true,
					},
					show_range:{
						name:'显示卡牌范围',
						init:true,
					},
					show_distance:{
						name:'显示距离',
						init:true,
					},
					chess_character:{
						name:'战棋武将',
						init:true,
						frequent:true,
					},
					chess_card:{
						name:'战棋卡牌',
						init:true,
						frequent:true,
					},
					free_choose:{
						name:'自由选将',
						init:true,
						onclick:function(bool){
							game.saveConfig('free_choose',bool,this._link.config.mode);
							if(get.mode()!=this._link.config.mode||!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat2&&get.config('free_choose')) ui.create.cheat2();
							else if(ui.cheat2&&!get.config('free_choose')){
								ui.cheat2.close();
								delete ui.cheat2;
							}
						},
					},
					change_choice:{
						name:'开启换将卡',
						init:true,
						onclick:function(bool){
							game.saveConfig('change_choice',bool,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat&&get.config('change_choice')) ui.create.cheat();
							else if(ui.cheat&&!get.config('change_choice')){
								ui.cheat.close();
								delete ui.cheat;
							}
						},
					},
					// ban_weak:{
					// 	name:'屏蔽弱将',
					// 	init:true,
					// 	restart:true,
					// },
					// ban_strong:{
					// 	name:'屏蔽强将',
					// 	init:false,
					// 	restart:true,
					// },
					chessscroll_speed:{
						name:'边缘滚动速度',
						init:'20',
						intro:'鼠标移至屏幕边缘时自动滚屏',
						item:{
							'0':'不滚动',
							'10':'10格/秒',
							'20':'20格/秒',
							'30':'30格/秒',
						}
					},
				}
			},
			tafang:{
				name:'塔防',
				config:{
					tafang_turn:{
						name:'游戏胜利',
						init:'10',
						frequent:true,
						item:{
							'10':'十回合',
							'20':'二十回合',
							'30':'三十回合',
							'1000':'无限',
						}
					},
					// tafang_size:{
					// 	name:'战场大小',
					// 	init:'9',
					// 	frequent:true,
					// 	item:{
					// 		'6':'小',
					// 		'9':'中',
					// 		'12':'大',
					// 	}
					// },
					tafang_difficulty:{
						name:'战斗难度',
						init:'2',
						frequent:true,
						item:{
							'1':'简单',
							'2':'普通',
							'3':'困难',
						}
					},
					show_range:{
						name:'显示卡牌范围',
						init:true,
					},
					show_distance:{
						name:'显示距离',
						init:true,
					},
					// ban_weak:{
					// 	name:'屏蔽弱将',
					// 	init:true,
					// 	restart:true,
					// },
					// ban_strong:{
					// 	name:'屏蔽强将',
					// 	init:false,
					// 	restart:true,
					// },
					chessscroll_speed:{
						name:'边缘滚动速度',
						intro:'鼠标移至屏幕边缘时自动滚屏',
						init:'20',
						item:{
							'0':'不滚动',
							'10':'10格/秒',
							'20':'20格/秒',
							'30':'30格/秒',
						}
					},
				}
			},
			brawl:{
				name:'乱斗',
				config:{
					huanhuazhizhan:{
						name:'幻化之战',
						init:true,
						frequent:true
					},
					qunxionggeju:{
						name:'群雄割据',
						init:true,
						frequent:true
					},
					duzhansanguo:{
						name:'毒战三国',
						init:true,
						frequent:true
					},
					daozhiyueying:{
						name:'导师月英',
						init:true,
						frequent:true
					},
					weiwoduzun:{
						name:'唯我独尊',
						init:true,
						frequent:true
					},
					tongxingzhizheng:{
						name:'同姓之争',
						init:true,
						frequent:true
					},
					jiazuzhizheng:{
						name:'家族之争',
						init:true,
						frequent:true
					},
					tongqueduopao:{
						name:'铜雀夺袍',
						init:true,
						frequent:true
					},
					tongjiangmoshi:{
						name:'同将模式',
						init:true,
						frequent:true
					},
					baiyidujiang:{
						name:'白衣渡江',
						init:true,
						frequent:true
					},
					qianlidanji:{
						name:'千里单骑',
						init:true,
						frequent:true
					},
					liangjunduilei:{
						name:'两军对垒',
						init:true,
						frequent:true
					},
					scene:{
						name:'创建场景',
						init:true,
						frequent:true
					}
				}
			},
			stone:{
				name:'炉石',
				config:{
					// update:function(config,map){
					// 	if(config.stone_mode=='deck'){
					// 		// map.deck_length.show();
					// 		// map.deck_repeat.show();
					// 		map.random_length.hide();
					// 		map.skill_bar.show();
					// 	}
					// 	else{
					// 		// map.deck_length.hide();
					// 		// map.deck_repeat.hide();
					// 		map.random_length.show();
					// 		map.skill_bar.hide();
					// 	}
					// },
					// stone_mode:{
					// 	name:'游戏模式',
					// 	init:'deck',
					// 	item:{
					// 		deck:'构筑',
					// 		random:'随机'
					// 	},
					// 	restart:true,
					// 	frequent:true,
					// },
					// deck_length:{
					// 	name:'卡组长度',
					// 	init:'30',
					// 	item:{
					// 		'30':'30张',
					// 		'50':'50张',
					// 		'80':'80张',
					// 	},
					// 	frequent:true,
					// },
					// deck_repeat:{
					// 	name:'重复卡牌',
					// 	init:'2',
					// 	item:{
					// 		'2':'2张',
					// 		'3':'3张',
					// 		'5':'5张',
					// 		'80':'无限',
					// 	},
					// 	frequent:true,
					// },
					// random_length:{
					// 	name:'随从牌数量',
					// 	init:'1/80',
					// 	item:{
					// 		'1/120':'少',
					// 		'1/80':'中',
					// 		'1/50':'多',
					// 	},
					// 	frequent:true,
					// },
					battle_number:{
						name:'出场人数',
						init:'1',
						frequent:true,
						item:{
							'1':'一人',
							'2':'两人',
							'3':'三人',
							'4':'四人',
							'6':'六人',
							'8':'八人',
							'10':'十人',
						},
						onclick:function(num){
							game.saveConfig('battle_number',num,this._link.config.mode);
							if(_status.connectMode) return;
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(_status.event.getParent().changeDialog){
								_status.event.getParent().changeDialog();
							}
						},
					},
					mana_mode:{
						name:'行动值变化',
						init:'inc',
						item:{
							inf:'涨落',
							inc:'递增'
						},
						frequent:true
					},
					skill_bar:{
						name:'怒气值',
						init:true,
						frequent:true,
						restart:true,
					},
					double_character:{
						name:'双将模式',
						init:false,
						frequent:true,
						restart:function(){
							return _status.event.getParent().name!='chooseCharacter'||_status.event.name!='chooseButton';
						}
					},
					free_choose:{
						name:'自由选将',
						init:true,
						onclick:function(bool){
							game.saveConfig('free_choose',bool,this._link.config.mode);
							if(_status.connectMode) return;
							if(get.mode()!=this._link.config.mode||!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat2&&get.config('free_choose')) ui.create.cheat2();
							else if(ui.cheat2&&!get.config('free_choose')){
								ui.cheat2.close();
								delete ui.cheat2;
							}
						},
					},
					change_choice:{
						name:'开启换将卡',
						init:true,
						onclick:function(bool){
							game.saveConfig('change_choice',bool,this._link.config.mode);
							if(_status.connectMode) return;
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat&&get.config('change_choice')) ui.create.cheat();
							else if(ui.cheat&&!get.config('change_choice')){
								ui.cheat.close();
								delete ui.cheat;
							}
						},
					},
					// ban_weak:{
					// 	name:'屏蔽弱将',
					// 	init:true,
					// 	restart:true,
					// },
					// ban_strong:{
					// 	name:'屏蔽强将',
					// 	init:false,
					// 	restart:true,
					// },
				}
			},
		},
		status:{
			running:false,
			canvas:false,
			time:0,
			reload:0,
			delayed:0,
			frameId:0,
			videoId:0,
			globalId:0,
		},
		help:{
			'关于游戏':'<div style="margin:10px">关于无名杀</div><ul style="margin-top:0"><li>无名杀官方发布地址仅有GitHub仓库！<br><a href="https://github.com/libccy/noname">点击前往Github仓库</a><br><li>无名杀基于GPLv3开源协议。<br><a href="https://www.gnu.org/licenses/gpl-3.0.html">点击查看GPLv3协议</a><br><li>其他所有的所谓“无名杀”社群（包括但不限于绝大多数“官方”QQ群、QQ频道等）均为玩家自发组织，与无名杀官方无关！',
			'游戏操作':'<ul><li>长按/鼠标悬停/右键单击显示信息。<li>触屏模式中，双指点击切换暂停；下划显示菜单，上划切换托管。<li>键盘快捷键<br>'+
			'<table><tr><td>A<td>切换托管<tr><td>W<td>切换不询问无懈<tr><td>空格<td>暂停</table><li>编辑牌堆<br>在卡牌包中修改牌堆后，将自动创建一个临时牌堆，在所有模式中共用，当保存当前牌堆后，临时牌堆被清除。每个模式可设置不同的已保存牌堆，设置的牌堆优先级大于临时牌堆。</ul>',
			'游戏命令':'<div style="margin:10px">变量名</div><ul style="margin-top:0"><li>场上角色<br>game.players<li>阵亡角色<br>game.dead'+
			'<li>玩家<br>game.me<li>玩家的上/下家<br>game.me.previous/next'+
			'<li>玩家的上/下家（含阵亡）<br>game.me.previousSeat/<br>nextSeat'+
			'<li>牌堆<br>ui.cardPile<li>弃牌堆<br>ui.discardPile</ul>'+
			'<div style="margin:10px">角色属性</div><ul style="margin-top:0"><li>体力值<br>player.hp'+
			'<li>体力上限<br>player.maxHp<li>身份<br>player.identity<li>手牌<br>player.getCards("h")<li>装备牌<br>player.getCards("e")<li>判定牌<br>player.getCards("j")'+
			'<li>是否存活/横置/翻面<br>player.isAlive()/<br>isLinked()/<br>isTurnedOver()</ul>'+
			'<div style="margin:10px">角色操作</div><ul style="margin-top:0"><li>受到伤害<br>player.damage(source,<br>num)'+
			'<li>回复体力<br>player.recover(num)<li>摸牌<br>player.draw(num)<li>获得牌<br>player.gain(cards)<li>弃牌<br>player.discard(cards)'+
			'<li>使用卡牌<br>player.useCard(card,<br>targets)<li>死亡<br>player.die()<li>复活<br>player.revive(hp)</ul>'+
			'<div style="margin:10px">游戏操作</div><ul style="margin-top:0"><li>在命令框中输出结果<br>game.print(str)<li>清除命令框中的内容<br>cls<li>上一条/下一条输入的内容<br>up/down<li>游戏结束<br>game.over(bool)'+
			'<li>角色资料<br>lib.character<li>卡牌资料<br>lib.card</ul>',
			'游戏名词':'<ul><li>智囊：无名杀默认为过河拆桥/无懈可击/无中生有/洞烛先机。牌堆中没有的智囊牌会被过滤。可在卡牌设置中自行增减。若没有可用的智囊，则改为随机选取的三种锦囊牌的牌名。'+
			'<li>仁库：部分武将使用的游戏外共通区域。至多包含六张牌。当有新牌注入后，若牌数超过上限，则将最早进入仁库的溢出牌置入弃牌堆。'+
			'<li>护甲：和体力类似，每点护甲可抵挡一点伤害，但不影响手牌上限。'+
			'<li>随从：通过技能获得，拥有独立的技能、手牌区和装备区（共享判定区），出场时替代主武将的位置；随从死亡时自动切换回主武将。'+
			'<li>发现：从三张随机亮出的牌中选择一张，若无特殊说明，则获得此牌。'+
			'<li>蓄能技：发动时可以增大黄色的数字。若如此做，红色数字于技能的结算过程中改为原来的两倍。'+
			'<li>施法：若技能的拥有者未拥有等待执行的同名“施法”效果，则其可以发动“施法”技能。其须选择声明一个数字X（X∈[1, 3]），在此之后的第X个回合结束时，其执行“施法”效果，且效果中的数字X视为与技能发动者声明的X相同。'+
			'<li>共同拼点：一种特殊的拼点结算。发起者与被指定的拼点目标同时亮出拼点牌，进行一次决算：其中拼点牌点数唯一最大的角色赢，其他角色均没赢；若没有点数唯一最大的拼点牌，则所有角色拼点均没赢。'+
			'<li>强令：若一名角色拥有带有“强令”的技能，则该技能的发动时机为“出牌阶段开始时”。若技能拥有者发动该技能，其须发布“强令”给一名其他角色，并在对应技能的时间节点加以判断目标角色是否成功完成该强令所要求的任务条件。成功或失败则会根据技能效果执行不同结算流程。'+
			'<li>摧坚：若一名角色拥有带有“摧坚”的技能，则该技能的发动时机为“当你使用伤害牌指定第一个目标后”。你可以对其中一个目标发动“摧坚”技能，然后执行后续效果。其中，后续效果里的X等于该目标的非charlotte技能的数量。'+
			'<li>妄行：一种特殊的选项。若一名角色拥有带有“妄行”的技能，则该技能触发时，你须选择声明一个数字X（X∈{1,2,3,4}），技能后续中的X即为你选择的数字。选择完毕后，你获得如下效果：回合结束时，你选择一项：1.弃置X张牌；2.减1点体力上限。'+
			'<li>搏击：若一名角色拥有带有“搏击”的技能，则当该搏击技能触发时，若本次技能的目标角色在你攻击范围内，且你在其攻击范围内，则你执行技能主体效果时，同时额外执行“搏击”后的额外效果。'+
			'<li>游击：若一名角色拥有带有“游击”的技能，则当该游击技能执行至“游击”处时，若本次技能的目标角色在你的攻击范围内，且你不在其攻击范围内，则你可以执行“游击”后的额外效果。'+
			'<li>激昂：一名角色发动“昂扬技”标签技能后，此技能失效，直至从此刻至满足此技能“激昂”条件后。'+
			''
		},
		path:{},
		getErrorTip:msg=>{
			if(typeof msg!='string'){
				try{
					msg=msg.toString();
					if(typeof msg!='string') throw 'err';
				}catch(_){
					throw '传参错误:'+msg;
				}
			}
			if (msg.startsWith('Uncaught ')) msg=msg.slice(9);
			let newMessage=msg;
			if (/RangeError/.test(newMessage)){
				if(newMessage.includes("Maximum call stack size exceeded")){
					newMessage="堆栈溢出";
				}else if(/argument must be between 0 and 20/.test(newMessage)){
					let funName=newMessage.slice(newMessage.indexOf('RangeError: ')+12,newMessage.indexOf(')')+1);
					newMessage=funName+"参数必须在0和20之间";
				} else {
					newMessage="传递错误值到数值计算方法";
				}
			}else if(/ReferenceError/.test(newMessage)){
				let messageName;
				if (newMessage.includes("is not defined")){
					messageName=newMessage.replace('ReferenceError: ', '').replace(' is not defined', '');
					newMessage="引用了一个未定义的变量："+messageName;
				}else if(newMessage.includes("invalid assignment left-hand side")){
					newMessage = "赋值运算符或比较运算符不匹配";
				}else if(newMessage.includes("Octal literals are not allowed in strict mode")){
					newMessage = "八进制字面量与八进制转义序列语法已经被废弃";
				}else if(newMessage.includes("Illegal 'use strict' directive in function with non-simple parameter list")){
					newMessage = "'use strict'指令不能使用在带有‘非简单参数’列表的函数";
				}else if(newMessage.includes("Invalid left-hand side in assignment")){
					newMessage = "赋值中的左侧无效，即number，string等不可赋值的非变量数据";
				}
			}else if(/SyntaxError/.test(newMessage)){
				let messageName;
				if(newMessage.includes("Unexpected token ")){
					messageName=newMessage.replace('SyntaxError: Unexpected token ','');
					newMessage="使用了未定义或错误的语法 : ("+messageName+")";
				}else if(newMessage.includes(
					"Block-scoped declarations (let, const, function, class) not yet supported outside strict mode")){
					newMessage="请在严格模式下运行let，const，class";
				}else if(newMessage.includes("for-of loop variable declaration may not have an initializer.")){
					newMessage="for...of 循环的头部包含有初始化表达式";
				}else if(newMessage.includes("for-in loop variable declaration may not have an initializer.")){
					newMessage="for...in 循环的头部包含有初始化表达式";
				}else if(newMessage.includes("Delete of an unqualified identifier in strict mode.")){
					newMessage="普通变量不能通过 delete 操作符来删除";
				}else if(newMessage.includes("Unexpected identifier")){
					newMessage="不合法的标识符或错误的语法";
				}else if(newMessage.includes("Invalid or unexpected token")){
					newMessage="非法的或者不期望出现的标记符号出现在不该出现的位置";
				}else if(newMessage.includes("Invalid regular expression flags")){
					newMessage="无效的正则表达式的标记";
				}else if(newMessage.includes("missing ) after argument list")){
					newMessage="参数列表后面缺少 \')\' (丢失运算符或者转义字符等)";
				}else if(newMessage.includes("Invalid shorthand property initializer")){
					newMessage="在定义一个{}对象时，应该使用\':\'而不是\'=\'";
				}else if(newMessage.includes("Missing initializer in const declaration")){
					newMessage="在使用const定义一个对象时，必须指定初始值";
				}else if(newMessage.includes("Unexpected number")||newMessage.includes("Unexpected string")){
					newMessage="在定义函数时，函数参数必须为合法标记符";
				}else if(newMessage.includes("Unexpected end of input")){
					newMessage="遗漏了符号或符号顺序不对(小括号，花括号等)";
				}else if(newMessage.includes("has already been declared")){
					messageName=newMessage.replace('SyntaxError: Identifier ', '').replace(' has already been declared', '');
					newMessage=messageName +"变量已经被声明过，不能被重新声明";
				}else if(newMessage.includes("Invalid or unexpected token")){
					newMessage="查询无效或意外的标记，可能是字符串的引号不成对，错误使用了转义序列，字符串在多行中解析异常";
				}else if(newMessage.includes("Duplicate parameter name not allowed in this context")) {
					newMessage="参数名不允许重复";
				}else if(newMessage.includes("Unexpected reserved word")||newMessage.includes(
					"Unexpected strict mode reserved word")){
					newMessage = "保留字被用作标记符";
				}
			}else if(/TypeError/.test(newMessage)){
				let messageName;
				if(newMessage.includes(" is not a function")){
					messageName=newMessage.replace('TypeError: ', '').replace(' is not a function', '');
					newMessage=messageName+"不是一个函数";
				}else if(newMessage.includes(" is not a constructor")){
					messageName=newMessage.replace('TypeError: ', '').replace(' is not a constructor', '');
					newMessage=messageName+"不是一个构造函数";
				}else if(newMessage.includes("Cannot read property")){
					messageName=newMessage.replace('TypeError: Cannot read property ', '').replace(' of null', '').replace(' of undefined', '');
					let ofName=newMessage.slice(newMessage.indexOf(" of ")+4);
					newMessage="无法读取\'"+ofName+"\'的属性值"+messageName;
				}else if(newMessage.includes("Cannot read properties")){
					messageName=newMessage.slice(newMessage.indexOf("reading '")+9,-2);
					let ofName=newMessage.slice(newMessage.indexOf(" of ")+4,newMessage.indexOf("(")-1);
					newMessage="无法读取\'"+ofName+"\'的属性值"+messageName;
				}else if(newMessage.includes("Property description must be an object")){
					messageName=newMessage.replace('TypeError: Property description must be an object: ', '');
					newMessage=messageName+"是非对象类型的值";
				}else if(newMessage.includes("Cannot assign to read only property ")){
					messageName=newMessage.slice(47,newMessage.lastIndexOf(' of ')+1);
					newMessage=messageName+"属性禁止写入";
				}else if(newMessage.includes("Object prototype may only be an Object or null")){
					newMessage=messageName+"对象原型只能是对象或null";
				}else if(newMessage.includes("Cannot create property")){
					messageName=newMessage.slice(newMessage.indexOf('\'')+1);
					messageName=messageName.slice(0,messageName.indexOf('\''));
					let obj=newMessage.slice(newMessage.indexOf(messageName)+16);
					newMessage=obj+"不能添加或修改\'"+messageName+"\'属性，任何 Primitive 值都不允许有property";
				}else if(newMessage.includes("Can't add property")&&newMessage.includes("is not extensible")){
					newMessage="对象不可添加属性（不可扩展）";
				}else if(newMessage.includes("Cannot redefine property")){
					messageName=newMessage.slice(37);
					newMessage=messageName+"不可配置";
				}else if(newMessage.includes("Converting circular structure to JSON")){
					messageName=newMessage.slice(37);
					newMessage="JSON.stringify() 方法处理循环引用结构的JSON会失败";
				}else if(newMessage.includes("Cannot use 'in' operator to search for ")){
					newMessage="in不能用来在字符串、数字或者其他基本类型的数据中进行检索";
				}else if(newMessage.includes("Right-hand side of 'instanceof' is not an object")){
					newMessage="instanceof 操作符 希望右边的操作数为一个构造对象，即一个有 prototype 属性且可以调用的对象";
				}else if(newMessage.includes("Assignment to constant variable")){
					newMessage="const定义的变量不可修改";
				}else if(newMessage.includes("Cannot delete property")){
					newMessage="不可配置的属性不能删除";
				}else if(newMessage.includes("which has only a getter")){
					newMessage="仅设置了getter特性的属性不可被赋值";
				}else if(newMessage.includes("called on incompatible receiver undefined")){
					newMessage="this提供的绑定对象与预期的不匹配";
				}
			}else if(/URIError/.test(newMessage)){
				newMessage="一个不合法的URI";
			}else if(/EvalError/.test(newMessage)){
				newMessage="非法调用 eval()";
			}else if(/InternalError/.test(newMessage)){
				if(newMessage.includes("too many switch cases")){
					newMessage="过多case子句";
				}else if(newMessage.includes("too many parentheses in regular expression")){
					newMessage="正则表达式中括号过多";
				}else if(newMessage.includes("array initializer too large")){
					newMessage="超出数组大小的限制";
				}else if(newMessage.includes("too much recursion")){
					newMessage="递归过深";
				}
			}
			if(newMessage!=msg){
				return newMessage;
			}
		},
		codeMirrorReady:(node,editor)=>{
			ui.window.appendChild(node);
			node.style.fontSize=20/game.documentZoom+'px';
			const mirror=window.CodeMirror(editor,{
				value:node.code,
				mode:"javascript",
				lineWrapping:!lib.config.touchscreen&&lib.config.mousewheel,
				lineNumbers:true,
				indentUnit:4,
				autoCloseBrackets:true,
				fixedGutter:false,
				hintOptions:{completeSingle:false},
				theme:lib.config.codeMirror_theme||'mdn-like',
				extraKeys:{
					"Ctrl-Z":"undo",//撤销
					"Ctrl-Y":"redo",//恢复撤销
					//"Ctrl-A":"selectAll",//全选
				},
			});
			lib.setScroll(editor.querySelector('.CodeMirror-scroll'));
			node.aced=true;
			node.editor=mirror;
			setTimeout(()=>mirror.refresh(),0);
			node.editor.on('change',(e,change)=>{
				let code;
				if(node.editor){
					code=node.editor.getValue();
				}else if(node.textarea){
					code=node.textarea.value;
				};
				//动态绑定文本
				if(code.length&&change.origin=="+input" &&
					/{|}|\s|=|;|:|,|，|。|？|！|\!|\?|&|#|%|@|‘|’|；/.test(change.text[0])==false&&
					change.text.length==1) {
					//输入了代码，并且不包括空格，{}，=， ; ， : ， 逗号等，才可以自动提示
					node.editor.showHint();
				}
			});
			//防止每次输出字符都创建以下元素
			const event=_status.event;
			const trigger=_status.event;
			const player=ui.create.player().init('sunce');
			const target=player;
			const targets=[player];
			const source=player;
			const card=game.createCard();
			const cards=[card];
			const result={bool:true};
			function forEach(arr,f) {
				Array.from(arr).forEach(v=>f(v));
			}
			function forAllProps(obj,callback){
				if(!Object.getOwnPropertyNames||!Object.getPrototypeOf){
					for(let name in obj) callback(name);
				}else{
					for(let o=obj;o;o=Object.getPrototypeOf(o)) Object.getOwnPropertyNames(o).forEach(callback);
				}
			}
			function scriptHint(editor,keywords,getToken,options){
				//Find the token at the cursor
				let cur=editor.getCursor(),token=editor.getTokenAt(cur);
				if(/\b(?:string|comment)\b/.test(token.type)) return;
				const innerMode=CodeMirror.innerMode(editor.getMode(),token.state);
				if (innerMode.mode.helperType==="json") return;
				token.state=innerMode.state;
				//If it's not a 'word-style' token, ignore the token.
				if (!/^[\w$_]*$/.test(token.string)){
					token={
						start:cur.ch,
						end:cur.ch,
						string:"",
						state:token.state,
						type:token.string=="."?"property":null
					};
				}else if(token.end>cur.ch){
					token.end=cur.ch;
					token.string=token.string.slice(0,cur.ch-token.start);
				}
				let tprop=token,context;
				//If it is a property, find out what it is a property of.
				while (tprop.type=="property"){
					tprop=editor.getTokenAt(CodeMirror.Pos(cur.line,tprop.start));
					if(tprop.string!=".") return;
					tprop=editor.getTokenAt(CodeMirror.Pos(cur.line,tprop.start));
					if(!context) context=[];
					context.push(tprop);
				}
				const list=[];
				let obj;
				if(Array.isArray(context)){
					try {
						const code=context.length==1?context[0].string:context.reduceRight((pre,cur)=>(pre.string||pre)+'.'+cur.string);
						obj=eval(code);
						if(![null,undefined].includes(obj)){
							const keys=Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(obj))).filter(key=>key.startsWith(token.string));
							list.addArray(keys);
						}
					}catch(_){ return;}
				}else if(token&&typeof token.string=='string'){
					//非开发者模式下，提示这些单词
					list.addArray(['player','card','cards','result','trigger','source','target','targets','lib','game','ui','get','ai','_status']);
				}
				return {
					list:[...new Set(getCompletions(token,context,keywords,options).concat(list))]
						.filter(key=>key.startsWith(token.string))
						.sort((a,b)=>(a+'').localeCompare(b+''))
						.map(text=>{
							return {
								render(elt,data,cur) {
									var icon=document.createElement("span");
									var className="cm-completionIcon cm-completionIcon-";
									if(obj){
										const type=typeof obj[text];
										if(type== 'function') {
											className+='function';
										}
										else if(type== 'string') {
											className+='text';
										}
										else if(type== 'boolean') {
											className+='variable';
										}
										else{
											className+='namespace';
										}
									}else{
										if(javascriptKeywords.includes(text)){
											className+='keyword';
										}
										else if(window[text]) {
											const type=typeof window[text];
											if(type=='function'){
											className+='function';
											}
											else if(type=='string'){
												className+='text';
											}
											else if(text=='window'||type=='boolean'){
												className+='variable';
											}
											else{
												className+='namespace';
											}
										}else{
											className+='namespace';
										}
									}
									icon.className=className;
									elt.appendChild(icon);
									elt.appendChild(document.createTextNode(text));
								},
								displayText: text,
								text: text,
							}
						}),
					from:CodeMirror.Pos(cur.line,token.start),
					to:CodeMirror.Pos(cur.line,token.end)
				};
			}
			function javascriptHint(editor,options){
				return scriptHint(editor,javascriptKeywords,function(e,cur){return e.getTokenAt(cur);},options);
			};
			//覆盖原本的javascript提示
			CodeMirror.registerHelper("hint","javascript",javascriptHint);
			const stringProps=Object.getOwnPropertyNames(String.prototype);
			const arrayProps=Object.getOwnPropertyNames(Array.prototype);
			const funcProps=Object.getOwnPropertyNames(Array.prototype);
			const javascriptKeywords=("break case catch class const continue debugger default delete do else export extends from false finally for function " +
				"if in import instanceof let new null return super switch this throw true try typeof var void while with yield").split(" ");
			function getCompletions(token,context,keywords,options){
				let found=[],start=token.string,global=options&&options.globalScope||window;
				function maybeAdd(str){
					if(str.lastIndexOf(start,0)==0&&!found.includes(str)) found.push(str);
				}
				function gatherCompletions(obj){
					if(typeof obj=="string") forEach(stringProps,maybeAdd);
					else if(obj instanceof Array) forEach(arrayProps,maybeAdd);
					else if(obj instanceof Function) forEach(funcProps,maybeAdd);
					forAllProps(obj, maybeAdd);
				}
				if(context&&context.length){
					//If this is a property, see if it belongs to some object we can
					//find in the current environment.
					let obj=context.pop(),base;
					if (obj.type&&obj.type.indexOf("variable")=== 0){
						if(options&&options.additionalContext)
							base=options.additionalContext[obj.string];
						if(!options||options.useGlobalScope!==false)
							base=base||global[obj.string];
					}else if(obj.type=="string"){
						base="";
					}else if(obj.type == "atom"){
						base=1;
					}else if(obj.type == "function"){
						if(global.jQuery!=null&&(obj.string=='$'||obj.string=='jQuery')&&(typeof global.jQuery=='function'))
							base=global.jQuery();
						else if(global._!=null&&(obj.string=='_')&&(typeof global._=='function'))
							base=global._();
					}
					while(base!=null&&context.length)
						base=base[context.pop().string];
					if (base!=null) gatherCompletions(base);
				}else{
					//If not, just look in the global object, any local scope, and optional additional-context
					//(reading into JS mode internals to get at the local and global variables)
					for(let v=token.state.localVars;v;v=v.next) maybeAdd(v.name);
					for(let c=token.state.context;c;c=c.prev) for(let v=c.vars;v;v=v.next) maybeAdd(v.name)
					for(let v=token.state.globalVars;v;v=v.next) maybeAdd(v.name);
					if(options&&options.additionalContext!=null) for(let key in options.additionalContext) maybeAdd(key);
					if(!options||options.useGlobalScope!==false) gatherCompletions(global);
					forEach(keywords,maybeAdd);
				}
				return found.sort((a,b)=>(a+'').localeCompare(b+''));
			}
		},
		setIntro:function(node,func,left){
			if(lib.config.touchscreen){
				if(left){
					node.listen(ui.click.touchintro);
				}
				else{
					lib.setLongPress(node,ui.click.intro);
				}
			}
			else{
				if(left){
					node.listen(ui.click.intro);
				}
				if(lib.config.hover_all){
					lib.setHover(node,ui.click.hoverplayer);
				}
				if(lib.config.right_info){
					node.oncontextmenu=ui.click.rightplayer;
				}
			}
			// if(!left){
			// 	lib.setPressure(node,ui.click.rightpressure);
			// }
			if(func){
				node._customintro=func;
			}
		},
		// setPressure:function(node,func){
		// 	if(window.Pressure){
		// 		window.Pressure.set(node,{change: func}, {polyfill: false});
		// 	}
		// },
		setPopped:function(node,func,width,height,forceclick,paused2){
			node._poppedfunc=func;
			node._poppedwidth=width;
			node._poppedheight=height;
			if(forceclick){
				node.forceclick=true;
			}
			if(lib.config.touchscreen||forceclick){
				node.listen(ui.click.hoverpopped);
			}
			else{
				node.addEventListener('mouseenter',ui.click.hoverpopped);
				// node.addEventListener('mouseleave',ui.click.hoverpopped_leave);
			}
			if(paused2){
				node._paused2=true;
			}
		},
		placePoppedDialog:function(dialog,e){
			if(dialog._place_text){
				if(dialog._place_text.firstChild.offsetWidth>=190||dialog._place_text.firstChild.offsetHeight>=30){
					dialog._place_text.style.marginLeft='14px';
					dialog._place_text.style.marginRight='14px';
					dialog._place_text.style.textAlign='left';
					dialog._place_text.style.width='calc(100% - 28px)';
				}
			}
			if(e.touches&&e.touches[0]){
				e=e.touches[0];
			}
			var height=Math.min(ui.window.offsetHeight-20,dialog.content.scrollHeight);
			if(dialog._mod_height){
				height+=dialog._mod_height;
			}
			dialog.style.height=height+'px';
			if(e.clientX/game.documentZoom<ui.window.offsetWidth/2){
				dialog.style.left=(e.clientX/game.documentZoom+10)+'px';
			}
			else{
				dialog.style.left=(e.clientX/game.documentZoom-dialog.offsetWidth-10)+'px';
			}
			var idealtop=(e.clientY||0)/game.documentZoom-dialog.offsetHeight/2;
			if(typeof idealtop!='number'||isNaN(idealtop)||idealtop<=5){
				idealtop=5;
			}
			else if(idealtop+dialog.offsetHeight+10>ui.window.offsetHeight){
				idealtop=ui.window.offsetHeight-10-dialog.offsetHeight;
			}
			dialog.style.top=idealtop+'px';
		},
		setHover:function(node,func,hoveration,width){
			node._hoverfunc=func;
			if(typeof hoveration=='number'){
				node._hoveration=hoveration;
			}
			if(typeof width=='number'){
				node._hoverwidth=width
			}
			node.addEventListener('mouseenter',ui.click.mouseenter);
			node.addEventListener('mouseleave',ui.click.mouseleave);
			node.addEventListener('mousedown',ui.click.mousedown);
			node.addEventListener('mousemove',ui.click.mousemove);
			return node;
		},
		setScroll:function(node){
			node.ontouchstart=ui.click.touchStart;
			node.ontouchmove=ui.click.touchScroll;
			node.style.WebkitOverflowScrolling='touch';
			return node;
		},
		setMousewheel:function(node){
			if(lib.config.mousewheel) node.onmousewheel=ui.click.mousewheel;
		},
		setLongPress:function(node,func){
			node.addEventListener('touchstart',ui.click.longpressdown);
			node.addEventListener('touchend',ui.click.longpresscancel);
			node._longpresscallback=func;
			return node;
		},
		updateCanvas:function(time){
			if(lib.canvasUpdates.length===0){
				lib.status.canvas=false;
				return false;
			}
			ui.canvas.width=ui.arena.offsetWidth;
			ui.canvas.height=ui.arena.offsetHeight;
			var ctx=ui.ctx;
			ctx.shadowBlur=5;
			ctx.shadowColor='rgba(0,0,0,0.3)';
			ctx.strokeStyle='white';
			// ctx.lineCap='round';
			ctx.lineWidth=3;
			ctx.save();
			for(var i=0;i<lib.canvasUpdates.length;i++){
				ctx.restore();
				ctx.save();
				var update=lib.canvasUpdates[i];
				if(!update.starttime){
					update.starttime=time;
				}
				if(update(time-update.starttime,ctx)===false){
					lib.canvasUpdates.splice(i--,1);
				}
			}
		},
		run:function(time){
			lib.status.time=time;
			for(var i=0;i<lib.updates.length;i++){
				if(!lib.updates[i].hasOwnProperty('_time')){
					lib.updates[i]._time=time;
				}
				if(lib.updates[i](time-lib.updates[i]._time-lib.status.delayed)===false){
					lib.updates.splice(i--,1);
				}
			}
			if(lib.updates.length){
				lib.status.frameId=requestAnimationFrame(lib.run);
			}
			else{
				lib.status.time=0;
				lib.status.delayed=0;
			}
		},
		getUTC:function(date){
			return date.getTime();
		},
		saveVideo:function(){
			if(_status.videoToSave){
				game.export(lib.init.encode(JSON.stringify(_status.videoToSave)),
				'无名杀 - 录像 - '+_status.videoToSave.name[0]+' - '+_status.videoToSave.name[1]);
			}
		},
		genAsync:fn=>gnc.of(fn),
		genAwait:item=>gnc.is.generator(item)?gnc.of(function*(){for(const content of item){yield content;}})():Promise.resolve(item),
		gnc:{
			of:fn=>gnc.of(fn),
			is:{
				coroutine:item=>gnc.is.coroutine(item),
				generatorFunc:item=>gnc.is.generatorFunc(item),
				generator:item=>gnc.is.generator(item)
			}
		},
		comparator:{
			equals:function(){
				if(arguments.length==0) return false;
				if(arguments.length==1) return true;
				for(let i=1;i<arguments.length;++i) if(arguments[i]!==arguments[0])return false;
				return true;
			},
			equalAny:function(){
				if(arguments.length==0) return false;
				if(arguments.length==1) return true;
				for(let i=1;i<arguments.length;++i) if(arguments[i]===arguments[0])return true;
				return false;
			},
			notEquals:function(){
				if(arguments.length==0) return false;
				if(arguments.length==1) return true;
				for(let i=1;i<arguments.length;++i) if(arguments[i]===arguments[0])return false;
				return true;
			},
			notEqualAny:function(){
				if(arguments.length==0) return false;
				if(arguments.length==1) return true;
				for(let i=1;i<arguments.length;++i) if(arguments[i]!==arguments[0])return true;
				return false;
			},
			typeEquals:function(){
				if(arguments.length==0)return false;
				if(arguments.length==1)return arguments[0]!==null;
				const type=typeof arguments[0];
				for(let i=1;i<arguments.length;++i) if(type!==arguments[i])return false;
				return true;
			}
		},
		creation:{
			get array(){
				return [];
			},
			get object(){
				return {};
			},
			get nullObject(){
				return Object.create(null);
			},
			get string(){
				return "";
			}
		},
		linq:{
			cselector:{
				hasAttr:name=>`[${name}]`,
				isAttr:(name,item)=>`[${name}=${item}]`,
				inAttr:(name,item)=>`[${name}~=${item}]`,
				conAttr:(name,item)=>`[${name}*=${item}]`,
				onAttr:(name,item)=>`[${name}|=${item}]`,
				bgnAttr:(name,item)=>`[${name}^=${item}]`,
				endAttr:(name,item)=>`[${name}^=${item}]`,
				merge:function(){return Array.from(arguments).join(" ");},
				of:function(){return Array.from(arguments).join("");},
				class:function(){return `.${Array.from(arguments).join(".")}`;},
				group:function(){return Array.from(arguments).join(",");},
				media:type=>`@media ${type}`
			},
			dom:{
				attributes:{
					style(name,value){
						return {
							_type:"style",
							name:name,
							value:value
						}
					}
				},
				inject(element,options){
					//处理id和class
					if(options.identity){
						for(const item of options.identity){
							if (item.startsWith("#")) element.id = item.slice(1);
							else element.classList.add(item);
						}
					}
					//处理属性
					if(options.attributes){
						for(const item in options.attributes) element.setAttribute(item,options.attributes[item]);
					}
					//处理样式
					if(options.style){
						for(const item in options.style) element.style[item] = options.style[item];
					}
					//处理内容
					if(options.content){
						element.innerHTML=options.content;
					}
					//处理子元素
					if(options.childs){
						for(const item of options.childs){
							element.appendChild(item);
						}
					}
					return element;
				},
				generate(){
					let result=lib.creation.nullObject;
					const args=Array.from(arguments);
					for(const item of args) {
						switch(typeof item) {
							case "object":
								switch (item.constructor) {
									case Object:
									case null:
										if("_type" in item){
											const type=item["_type"];
											if(!(type in result)) result[type]=lib.creation.nullObject;
											result[type][item.name]=item.value;
										}
										else{
											if(!("style" in result)) result.style=lib.creation.nullObject;
											for(const name in item){
												result.style[name]=item[name];
											}
										}
										break;
									default:
										if(!("childs" in result)) result.childs=lib.creation.array;
										result.childs.add(item);
										break;
								}
								break;
							case "string":
								if(/^\.|#/.test(item)){
									if(!("identity" in result)) result.identity=lib.creation.array;
									const identities=item.split(".").filter(Boolean);
									for(const item of identities) result.identity.add(item);
								}
								else result.content = item;
								break;
						}
					}
					return result;
				},
				attribute(name,value){
					return {
						_type:"attributes",
						name:name,
						value:value
					}
				},
				div(){
					const dom=lib.linq.dom;
					return dom.inject(document.createElement("div"),dom.generate(...arguments));
				}
			}
		},
		init:{
			init:function(){
				if(typeof __dirname==='string'&&__dirname.length){
					var dirsplit=__dirname.split('/');
					for(var i=0;i<dirsplit.length;i++){
						if(dirsplit[i]){
							var c=dirsplit[i][0];
							lib.configprefix+=/[A-Z]|[a-z]/.test(c)?c:'_';
						}
					}
					lib.configprefix+='_';
				}
				window.resetGameTimeout=setTimeout(lib.init.reset,parseInt(localStorage.getItem(lib.configprefix+'loadtime'))||10000);
				if(window.cordovaLoadTimeout){
					clearTimeout(window.cordovaLoadTimeout);
					delete window.cordovaLoadTimeout;
				}
				var links=document.head.querySelectorAll('link');
				for(var i=0;i<links.length;i++){
					if(links[i].href.includes('app/color.css')){
						links[i].remove();
						break;
					}
				}
				var index=window.location.href.indexOf('index.html?server=');
				if(index!=-1){
					window.isNonameServer=window.location.href.slice(index+18);
					window.nodb=true;
				}
				else{
					index=localStorage.getItem(lib.configprefix+'asserver');
					if(index){
						window.isNonameServer=index;
						window.isNonameServerIp=lib.hallURL;
					}
				}

				var htmlbg=localStorage.getItem(lib.configprefix+'background');
				if(htmlbg){
					if(htmlbg[0]=='['){
						try{
							htmlbg=JSON.parse(htmlbg);
							htmlbg=htmlbg[get.rand(htmlbg.length)];
							if(htmlbg.startsWith('custom_')){
								throw('err');
							}
							_status.htmlbg=htmlbg;
						}
						catch(e){
							htmlbg=null;
						}
					}
					if(htmlbg){
						document.documentElement.style.backgroundImage='url("'+lib.assetURL+'image/background/'+htmlbg+'.jpg")';
						document.documentElement.style.backgroundSize='cover';
						document.documentElement.style.backgroundPosition='50% 50%';
					}
				}

				lib.get=get;
				lib.ui=ui;
				lib.ai=ai;
				lib.game=game;

				HTMLDivElement.prototype.animate=function(name,time){
					var that;
					if(get.is.mobileMe(this)&&name=='target'){
						that=ui.mebg;
					}
					else{
						that=this;
					}
					that.classList.add(name);
					setTimeout(function(){
						that.classList.remove(name);
					},time||1000);
					return this;
				};
				HTMLDivElement.prototype.hide=function(){
					this.classList.add('hidden');
					return this;
				};
				HTMLDivElement.prototype.unfocus=function(){
					if(lib.config.transparent_dialog) this.classList.add('transparent');
					return this;
				};
				HTMLDivElement.prototype.refocus=function(){
					this.classList.remove('transparent');
					return this;
				};
				HTMLDivElement.prototype.show=function(){
					this.classList.remove('hidden');
					return this;
				};
				HTMLDivElement.prototype.delete=function(time,callback){
					if(this.timeout){
						clearTimeout(this.timeout);
						delete this.timeout;
					}
					if(!this._listeningEnd||this._transitionEnded){
						if(typeof time!='number') time=500;
						this.classList.add('removing');
						var that=this;
						this.timeout=setTimeout(function(){
							that.remove();
							that.classList.remove('removing');
							if(typeof callback=='function'){
								callback();
							}
						},time);
					}
					else{
						this._onEndDelete=true;
					}
					return this;
				};
				HTMLDivElement.prototype.goto=function(position,time){
					if(this.timeout){
						clearTimeout(this.timeout);
						delete this.timeout;
					}

					if(typeof time!='number') time=500;
					this.classList.add('removing');

					var that=this;
					this.timeout=setTimeout(function(){
						if(!that.destroyed){
							position.appendChild(that);
						}
						that.classList.remove('removing');
						delete that.destiny;
					},time);
					this.destiny=position;
					return this;
				};
				HTMLDivElement.prototype.fix=function(){
					clearTimeout(this.timeout);
					delete this.timeout;
					delete this.destiny;
					this.classList.remove('removing');
					return this;
				};
				Object.defineProperty(HTMLDivElement.prototype,'setBackground',{
					configurable:true,
					enumerable:false,
					writable:true,
					value:function(name,type,ext,subfolder){
						if(!name) return;
						let src;
						if(ext=='noskin') ext='.jpg';
						ext=ext||'.jpg';
						subfolder=subfolder||'default';
						if(type){
							let dbimage=null,extimage=null,modeimage=null,nameinfo,gzbool=false;
							const mode=get.mode();
							if(type=='character'){
								if(lib.characterPack[`mode_${mode}`]&&lib.characterPack[`mode_${mode}`][name]){
									if(mode=='guozhan'){
										nameinfo=lib.character[name];
										if(name.startsWith('gz_shibing')) name=name.slice(3,11);
										else{
											if(lib.config.mode_config.guozhan.guozhanSkin&&lib.character[name]&&lib.character[name][4].contains('gzskin')) gzbool=true;
											name=name.slice(3);
										}
									}
									else modeimage=mode;
								}
								else if(name.includes('::')){
									name=name.split('::');
									modeimage=name[0];
									name=name[1];
								}
								else{
									nameinfo=get.character(name);
								}
							}
							if(!modeimage&&nameinfo&&nameinfo[4]) for(const value of nameinfo[4]){
								if(value.startsWith('ext:')){
									extimage=value;
									break;
								}
								else if(value.startsWith('db:')){
									dbimage=value;
									break;
								}
								else if(value.startsWith('mode:')){
									modeimage=value.slice(5);
									break;
								}
								else if(value.startsWith('character:')){
									name=value.slice(10);
									break;
								}
							}
							if(extimage) src=extimage.replace(/^ext:/,'extension/');
							else if(dbimage){
								this.setBackgroundDB(dbimage.slice(3));
								return this;
							}
							else if(modeimage) src=`image/mode/${modeimage}/character/${name}${ext}`;
							else if(type=='character'&&lib.config.skin[name]&&arguments[2]!='noskin') src=`image/skin/${name}/${lib.config.skin[name]}${ext}`;
							else if(type=='character') src=`image/character/${gzbool?'gz_':''}${name}${ext}`;
							else src=`image/${type}/${subfolder}/${name}${ext}`;
						}
						else src=`image/${name}${ext}`;
						this.setBackgroundImage(src);
						this.style.backgroundPositionX='center';
						this.style.backgroundSize='cover';
						return this;
					}
				});
				HTMLDivElement.prototype.setBackgroundDB=function(img){
					var node=this;
					game.getDB('image',img,function(src){
						node.style.backgroundImage="url('"+src+"')";
						node.style.backgroundSize="cover";
					});
				};
				HTMLDivElement.prototype.setBackgroundImage=function(img){
					this.style.backgroundImage='url("'+lib.assetURL+img+'")';
				},
				HTMLDivElement.prototype.listen=function(func){
					if(lib.config.touchscreen){
						this.addEventListener('touchend',function(e){
							if(!_status.dragged){
								func.call(this,e);
							}
						});
						var fallback=function(e){
							if(!_status.touchconfirmed){
								func.call(this,e);
							}
							else{
								this.removeEventListener('click',fallback);
							}
						}
						this.addEventListener('click',fallback);
					}
					else{
						this.addEventListener('click',func);
					}
					return this;
				};
				HTMLDivElement.prototype.listenTransition=function(func,time){
					let done=false;
					const callback=()=>{
						if(!done){
							done=true;
							func.call(this);
						}
						clearTimeout(timer);
						this.removeEventListener('webkitTransitionEnd',callback);
					};
					const timer=setTimeout(callback,time||1000);
					this.addEventListener('webkitTransitionEnd',callback);
					return timer;
				};
				HTMLDivElement.prototype.setPosition=function(){
					var position;
					if(arguments.length==4){
						position=[];
						for(var i=0;i<arguments.length;i++) position.push(arguments[i]);
					}
					else if(arguments.length==1&&Array.isArray(arguments[0])&&arguments[0].length==4){
						position=arguments[0];
					}
					else{
						return this;
					}
					var top='calc('+position[0]+'% ';
					if(position[1]>0) top+='+ '+position[1]+'px)';
					else top+='- '+Math.abs(position[1])+'px)';
					var left='calc('+position[2]+'% ';
					if(position[3]>0) left+='+ '+position[3]+'px)';
					else left+='- '+Math.abs(position[3])+'px)';
					this.style.top=top;
					this.style.left=left;
					return this;
				};
				HTMLDivElement.prototype.css=function(style){
					for(var i in style){
						if(i=='innerHTML'){
							this.innerHTML=style[i];
						}
						else{
							this.style[i]=style[i];
						}
					}
					return this;
				};
				HTMLTableElement.prototype.get=function(row,col){
					if(row<this.childNodes.length){
						return this.childNodes[row].childNodes[col];
					}
				};
				/*处理lib.nature的兼容性问题*/
				const mapHasFunc=function(item){
					return this.has(item)
				};
				Object.defineProperty(Map.prototype, "contains",{
					configurable:true,
					enumerable:false,
					writable:true,
					value:mapHasFunc
				});
				Object.defineProperty(Map.prototype, "includes",{
					configurable:true,
					enumerable:false,
					writable:true,
					value:mapHasFunc
				});
				const mapAddFunc=function(item){
					this.set(item,0);
					return this;
				}
				Object.defineProperty(Map.prototype, "add", {
					configurable:true,
					enumerable:false,
					writable:true,
					value:mapAddFunc
				});
				Object.defineProperty(Map.prototype, "push", {
					configurable:true,
					enumerable:false,
					writable:true,
					value:mapAddFunc
				});
				Object.defineProperty(Map.prototype, "addArray", {
					configurable:true,
					enumerable:false,
					writable:true,
					value:function(arr){
						for(var i=0;i<arr.length;i++){
							this.add(arr[i]);
						}
						return this;
					}
				});
				Object.defineProperty(Map.prototype, "remove", {
					configurable:true,
					enumerable:false,
					writable:true,
					value:function(item){
						this.delete(item);
						return this;
					}
				});
				/*Map prototype end*/
				Object.defineProperty(Array.prototype, "filterInD", {
					configurable:true,
					enumerable:false,
					writable:true,
					value:function(pos){
						if(typeof pos!='string') pos='o';
						return this.filter(card=>pos.includes(get.position(card,true)));
					}
				});
				Object.defineProperty(Array.prototype, "someInD", {
					configurable:true,
					enumerable:false,
					writable:true,
					value:function(pos){
						if(typeof pos!='string') pos='o';
						return this.some(card=>pos.includes(get.position(card,true)));
					}
				});
				/**
				 * @legacy Use `Array.prototype.includes(searchElement)` instead.
				 */
				Object.defineProperty(Array.prototype, "contains", {
					configurable:true,
					enumerable:false,
					writable:true,
					value:Array.prototype.includes
				});
				Object.defineProperty(Array.prototype, "add", {
					configurable:true,
					enumerable:false,
					writable:true,
					value:function(){
						for(var i=0;i<arguments.length;i++){
							if(this.contains(arguments[i])){
								return false;
							}
							this.push(arguments[i]);
						}
						return this;
					}
				});
				Object.defineProperty(Array.prototype, "addArray", {
					configurable:true,
					enumerable:false,
					writable:true,
					value:function(arr){
						for(var i=0;i<arr.length;i++){
							this.add(arr[i]);
						}
						return this;
					}
				});
				Object.defineProperty(Array.prototype, "remove", {
					configurable:true,
					enumerable:false,
					writable:true,
					value:function(item){
						/*if(Array.isArray(item)){
							for(var i=0;i<item.length;i++) this.remove(item[i]);
							return;
						}*/
						var pos=this.indexOf(item);
						if(pos==-1){
							return false;
						}
						this.splice(pos,1);
						return this;
					}
				});
				Object.defineProperty(Array.prototype, "removeArray", {
					configurable:true,
					enumerable:false,
					writable:true,
					value:function(arr){
						for(var i=0;i<arr.length;i++){
							this.remove(arr[i]);
						}
						return this;
					}
				});
				Object.defineProperty(Array.prototype, "randomGet", {
					configurable:true,
					enumerable:false,
					writable:true,
					value:function(){
						var arr=this.slice(0);
						for(var i=0;i<arguments.length;i++) arr.remove(arguments[i]);
						return arr[Math.floor(Math.random()*arr.length)];
					}
				});
				Object.defineProperty(Array.prototype, "randomRemove", {
					configurable:true,
					enumerable:false,
					writable:true,
					value:function(num){
						if(typeof num=='number'){
							var list=[];
							for(var i=0;i<num;i++){
								if(this.length){
									list.push(this.randomRemove());
								}
								else{
									break;
								}
							}
							return list;
						}
						else{
							return this.splice(Math.floor(Math.random()*this.length),1)[0];
						}
					}
				});
				Object.defineProperty(Array.prototype, "randomSort", {
					configurable:true,
					enumerable:false,
					writable:true,
					value:function(){
						var list=[];
						while(this.length){
							list.push(this.randomRemove());
						}
						for(var i=0;i<list.length;i++){
							this.push(list[i]);
						}
						return this;
					}
				});
				Object.defineProperty(Array.prototype, "randomGets", {
					configurable:true,
					enumerable:false,
					writable:true,
					value:function(num){
						if(num>this.length){
							num=this.length;
						}
						var arr=this.slice(0);
						var list=[];
						for(var i=0;i<num;i++){
							list.push(arr.splice(Math.floor(Math.random()*arr.length),1)[0]);
						}
						return list;
					}
				});
				Object.defineProperty(Array.prototype, "sortBySeat", {
					configurable:true,
					enumerable:false,
					writable:true,
					value:function(target){
						lib.tempSortSeat=target;
						this.sort(lib.sort.seat);
						delete lib.tempSortSeat;
						return this;
					}
				});
				//!!!WARNING!!!
				//Will be deprecated in next verision
				Object.defineProperty(Object.prototype,'hasNature',{
					configurable:true,
					enumerable:false,
					writable:true,
					value:function(nature,player){
						var natures=get.natureList(this,player);
						if(!nature) return natures.length>0;
						if(nature=='linked') return natures.some(n=>lib.linked.includes(n));
						return get.is.sameNature(natures,nature);
					}
				});
				if (!('includes' in Array.prototype)) {
					Object.defineProperty(Array.prototype, 'includes', {
						enumerable: false,
						configurable: true,
						writable: true,
						value: function (searchElement, fromIndex) {
							if (this == null) {
								throw new TypeError('"this" is null or not defined');
							}
							var o = Object(this);
							var len = o.length >>> 0;
							if (len === 0) {
								return false;
							}
							var n = fromIndex | 0;
							var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
							function sameValueZero(x, y) {
								return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
							}
							while (k < len) {
								if (sameValueZero(o[k], searchElement)) {
									return true;
								}
								k++;
							}
							return false;
						}
					});
				}
				if(!('flat' in Array.prototype)){
					Object.defineProperty(Array.prototype, "flat", {
						configurable:true,
						enumerable:false,
						writable:true,
						value:function(depth){
							if(typeof depth!='number') depth=1;
							const arr=[];
							for(let i=0;i<this.length;i++){
								let obj=this[i];
								if(depth>0&&Array.isArray(obj)){
									obj.flat(depth-1).forEach(function(item){
										arr.push(item)
									});
								}
								else{
									arr.push(obj);
								}
							}
							return arr;
						}
					});
				}
				if (!("allSettled" in Promise)){
					Object.defineProperty(Promise, "allSettled", {
						configurable:true,
						enumerable:false,
						writable:true,
						value:function allSettled(ary){
							const Promise = this;
							return new Promise((resolve, reject) => {
								// if (Object.prototype.toString.call(arr) != "[object Array]")
								if (!Array.isArray(ary))
								return reject(new TypeError(`${typeof arr} ${ary} is not iterable(cannot read property Symbol(Symbol.iterator))`));
								let args = Array.prototype.slice.call(ary);
								if (args.length == 0) return resolve([]);
								let arrCount = args.length;
								function resolvePromise(index, value) {
									if (typeof value == "object") {
										var then = value.then;
										if (typeof then == "function") {
											then.call(value, (val) => {
												args[index] = { status: "fulfilled", value: val };
												if (--arrCount == 0) resolve(args);
											}, (e) => {
												args[index] = { status: "rejected", reason: e };
												if (--arrCount == 0) resolve(args);
											});
										}
									}
								}

								for (let i = 0; i < args.length; ++i)
									resolvePromise(i, args[i]);
							});
						}
					});
				}
				if(!Object.values){
					Object.defineProperty(Object, 'values', {
						configurable:true,
						enumerable:false,
						writable:true,
						value:function(obj){
							if(obj!== Object(obj)) {
								throw new TypeError('Object.values called on a non-object');
							}
							var values=[];
							for(var key in obj) {
								if(obj.hasOwnProperty(key)){
									values.push(obj[key]);
								}
							}
							return values;
						}
					});
				}
				window.onkeydown=function(e){
					if(!ui.menuContainer||!ui.menuContainer.classList.contains('hidden')){
						if(e.keyCode==116||((e.ctrlKey||e.metaKey)&&e.keyCode==82)){
							if(e.shiftKey){
								if(confirm('是否重置游戏？')){
									var noname_inited=localStorage.getItem('noname_inited');
									var onlineKey=localStorage.getItem(lib.configprefix+'key');
									localStorage.clear();
									if(noname_inited){
										localStorage.setItem('noname_inited',noname_inited);
									}
									if(onlineKey){
										localStorage.setItem(lib.configprefix+'key',onlineKey);
									}
									if(indexedDB) indexedDB.deleteDatabase(lib.configprefix+'data');
									game.reload();
									return;
								}
							}
							else{
								game.reload();
							}
						}
						else if(e.keyCode==83&&(e.ctrlKey||e.metaKey)){
							if(window.saveNonameInput){
								window.saveNonameInput();
							}
							e.preventDefault();
							e.stopPropagation();
							return false;
						}
						else if(e.keyCode==74&&(e.ctrlKey||e.metaKey)&&lib.node){
							lib.node.debug();
						}
					}
					else{
						game.closePopped();
						var dialogs=document.querySelectorAll('#window>.dialog.popped:not(.static)');
						for(var i=0;i<dialogs.length;i++){
							dialogs[i].delete();
						}
						if(e.keyCode==32){
							var node=ui.window.querySelector('pausedbg');
							if(node){
								node.click();
							}
							else{
								ui.click.pause();
							}
						}
						else if(e.keyCode==65){
							if(ui.auto) ui.auto.click();
						}
						else if(e.keyCode==87){
							if(ui.wuxie&&ui.wuxie.style.display!='none'){
								ui.wuxie.classList.toggle('glow')
							}
							else if(ui.tempnowuxie){
								ui.tempnowuxie.classList.toggle('glow')
							}
						}
						else if(e.keyCode==116||((e.ctrlKey||e.metaKey)&&e.keyCode==82)){
							if(e.shiftKey){
								if(confirm('是否重置游戏？')){
									var noname_inited=localStorage.getItem('noname_inited');
									var onlineKey=localStorage.getItem(lib.configprefix+'key');
									localStorage.clear();
									if(noname_inited){
										localStorage.setItem('noname_inited',noname_inited);
									}
									if(onlineKey){
										localStorage.setItem(lib.configprefix+'key',onlineKey);
									}
									if(indexedDB) indexedDB.deleteDatabase(lib.configprefix+'data');
									game.reload();
									return;
								}
							}
							else{
								game.reload();
							}
						}
						else if(e.keyCode==83&&(e.ctrlKey||e.metaKey)){
							e.preventDefault();
							e.stopPropagation();
							return false;
						}
						else if(e.keyCode==74&&(e.ctrlKey||e.metaKey)&&lib.node){
							lib.node.debug();
						}
						// else if(e.keyCode==27){
						// 	if(!ui.arena.classList.contains('paused')) ui.click.config();
						// }
					}
				};
				window.onload=function(){
					if(lib.device){
						var script=document.createElement('script');
						script.src='cordova.js';
						document.body.appendChild(script);
						document.addEventListener('deviceready',function(){
							if(lib.init.cordovaReady){
								lib.init.cordovaReady();
								delete lib.init.cordovaReady;
							}
						});
					}
					if(_status.packLoaded){
						delete _status.packLoaded;
						lib.init.onload();
					}
					else{
						_status.windowLoaded=true;
					}
				};

				window.onerror=function(msg,src,line,column,err){
					const winPath=window.__dirname?('file:///'+(__dirname.replace(new RegExp('\\\\','g'),'/')+'/')):'';
					let str=`错误文件: ${typeof src=='string'?decodeURI(src).replace(lib.assetURL,'').replace(winPath,''):'未知文件'}`;
					str+=`\n错误信息: ${msg}`;
					const tip=lib.getErrorTip(msg);
					if(tip) str+=`\n错误提示: ${tip}`;
					str+=`\n行号: ${line}`;
					str+=`\n列号: ${column}`;
					const version=lib.version||'';
					const reg=/[^\d\.]/;
					const match=version.match(reg)!=null;
					str+='\n'+`${match?'游戏':'无名杀'}版本: ${version||'未知版本'}`;
					if(match) str+='\n⚠️您使用的游戏代码不是源于libccy/noname无名杀官方仓库，请自行寻找您所使用的游戏版本开发者反馈！';
					if(_status&&_status.event){
						let evt=_status.event;
						str+=`\nevent.name: ${evt.name}\nevent.step: ${evt.step}`;
						if(evt.parent) str+=`\nevent.parent.name: ${evt.parent.name}\nevent.parent.step: ${evt.parent.step}`;
						if(evt.parent&&evt.parent.parent) str+=`\nevent.parent.parent.name: ${evt.parent.parent.name}\nevent.parent.parent.step: ${evt.parent.parent.step}`;
						if(evt.player||evt.target||evt.source||evt.skill||evt.card){
							str+='\n-------------'
						}
						if(evt.player){
							if(lib.translate[evt.player.name]) str+=`\nplayer: ${lib.translate[evt.player.name]}[${evt.player.name}]`;
							else str+='\nplayer: '+evt.player.name;
							let distance=get.distance(_status.roundStart,evt.player,'absolute');
							if (distance!=Infinity) {
								str+=`\n座位号: ${distance+1}`;
							}
						}
						if(evt.target){
							if(lib.translate[evt.target.name]) str+=`\ntarget: ${lib.translate[evt.target.name]}[${evt.target.name}]`;
							else str+='\ntarget: '+evt.target.name;
						}
						if(evt.source){
							if(lib.translate[evt.source.name]) str+=`\nsource: ${lib.translate[evt.source.name]}[${evt.source.name}]`;
							else str+='\nsource: '+evt.source.name;
						}
						if(evt.skill){
							if(lib.translate[evt.skill]) str+=`\nskill: ${lib.translate[evt.skill]}[${evt.skill}]`;
							else str+='\nskill: '+evt.skill;
						}
						if(evt.card){
							if(lib.translate[evt.card.name]) str+=`\ncard: ${lib.translate[evt.card.name]}[${evt.card.name}]`;
							else str+='\ncard: '+evt.card.name;
						}
					}
					str+='\n-------------';
					if(typeof line=='number'&&(typeof game.readFile=='function'||location.origin!='file://')){
						function createShowCode(lines){
							let showCode='';
                            if(lines.length>=10){ 
                                if(line>4){ 
                                    for(let i=line-5;i<line+6&&i<lines.length;i++){ 
                                        showCode+=`${i+1}| ${line==i+1?'⚠️':''}${lines[i]}\n`;
                                    } 
                                }else{ 
                                    for(let i=0;i<line+6&&i<lines.length;i++){ 
                                        showCode+=`${i+1}| ${line==i+1?'⚠️':''}${lines[i]}\n`;
                                    } 
                                } 
                            }else{ 
                                showCode=lines.map((_line,i)=>`${i+1}| ${line==i+1?'⚠️':''}${_line}\n`).toString(); 
							} 
							return showCode;
						}
						//协议名须和html一致(网页端防跨域)，且文件是js 
						if (typeof src=='string'&&src.startsWith(location.protocol)&&src.endsWith('.js')){ 
                            //获取代码
                            const codes=lib.init.reqSync('local:'+decodeURI(src).replace(lib.assetURL,'').replace(winPath,''));
                            const lines=codes.split("\n"); 
                            str+='\n'+createShowCode(lines);
                            str+='\n-------------'; 
						}
						//解析parsex里的content fun内容(通常是技能content) 
						else if(err&&err.stack&&err.stack.split('\n')[1].trim().startsWith('at Object.eval [as content]')){
                            const codes=_status.event.content; 
                            if(typeof codes=='function'){
                                const lines=codes.toString().split("\n");
                                str+='\n'+createShowCode(lines);
                                str+='\n-------------'; 
                            }
                        }
                    }
					if(err&&err.stack) str+='\n'+decodeURI(err.stack).replace(new RegExp(lib.assetURL,'g'),'').replace(new RegExp(winPath,'g'),'');
					alert(str);
					window.ea=Array.from(arguments);
					window.em=msg;
					window.el=line;
					window.ec=column;
					window.eo=err;
					game.print(str);
					if(!lib.config.errstop){
						_status.withError=true;
						game.loop();
					}
				};

				if(window.noname_update){
					lib.version=window.noname_update.version;
					lib.changeLog=window.noname_update.changeLog;
					if(window.noname_update.players){
						lib.changeLog.push('players://'+JSON.stringify(window.noname_update.players));
					}
					if(window.noname_update.cards){
						lib.changeLog.push('cards://'+JSON.stringify(window.noname_update.cards));
					}
					delete window.noname_update;
				}
				var noname_inited=localStorage.getItem('noname_inited');
				if(noname_inited&&noname_inited!=='nodejs'){
					var ua=navigator.userAgent.toLowerCase();
					if(ua.includes('android')){
						lib.device='android';
					}
					else if(ua.includes('iphone')||ua.includes('ipad')||ua.includes('macintosh')){
						lib.device='ios';
					}
					lib.assetURL=noname_inited;
				}

				if(lib.assetURL.includes('com.widget.noname.qingyao')){
					alert('您正在一个不受信任的闭源客户端上运行《无名杀》。建议您更换为其他开源的无名杀客户端，避免给您带来不必要的损失。');
				}

				var config3=null;
				var proceed=function(config2){
					if(config3===null){
						config3=config2;
						return;
					}
					if(config2.mode) lib.config.mode=config2.mode;
					if(lib.config.mode_config[lib.config.mode]==undefined) lib.config.mode_config[lib.config.mode]={};
					for(var i in lib.config.mode_config.global){
						if(lib.config.mode_config[lib.config.mode][i]==undefined){
							lib.config.mode_config[lib.config.mode][i]=lib.config.mode_config.global[i];
						}
					}
					if(lib.config.characters){
						lib.config.defaultcharacters=lib.config.characters.slice(0);
					}
					if(lib.config.cards){
						lib.config.defaultcards=lib.config.cards.slice(0);
					}
					for(var i in config2){
						if(i.includes('_mode_config')){
							var thismode=i.substr(i.indexOf('_mode_config')+13);
							if(!lib.config.mode_config[thismode]){
								lib.config.mode_config[thismode]={};
							}
							lib.config.mode_config[thismode][i.substr(0,i.indexOf('_mode_config'))]=config2[i];
						}
						else{
							lib.config[i]=config2[i];
						}
					}
					for(var i in lib.config.translate){
						lib.translate[i]=lib.config.translate[i];
					}

					lib.config.all.characters=[];
					lib.config.all.cards=[];
					lib.config.all.plays=[];
					lib.config.all.mode=[];

					if(lib.config.debug){
						lib.init.js(lib.assetURL+'game','asset',function(){
							lib.skin=window.noname_skin_list;
							delete window.noname_skin_list;
							delete window.noname_asset_list;
						});
					}

					if(window.isNonameServer){
						lib.config.mode='connect';
					}
					var pack=window.noname_package;
					delete window.noname_package;
					for(i in pack.character){
						if(lib.config.all.sgscharacters.contains(i)||lib.config.hiddenCharacterPack.indexOf(i)==-1){
							lib.config.all.characters.push(i);
							lib.translate[i+'_character_config']=pack.character[i];
						}
					}
					for(i in pack.card){
						if(lib.config.all.sgscards.contains(i)||lib.config.hiddenCardPack.indexOf(i)==-1){
							lib.config.all.cards.push(i);
							lib.translate[i+'_card_config']=pack.card[i];
						}
					}
					for(i in pack.play){
						lib.config.all.plays.push(i);
						lib.translate[i+'_play_config']=pack.play[i];
					}
					for(i in pack.submode){
						for(var j in pack.submode[i]){
							lib.translate[i+'|'+j]=pack.submode[i][j];
						}
					}

					if(!lib.config.gameRecord){
						lib.config.gameRecord={};
					}
					for(i in pack.mode){
						if(lib.config.hiddenModePack.indexOf(i)==-1){
							lib.config.all.mode.push(i);
							lib.translate[i]=pack.mode[i];
							if(!lib.config.gameRecord[i]){
								lib.config.gameRecord[i]={data:{}};
							}
						}
					}
					if(lib.config.all.mode.length==0){
						lib.config.all.mode.push('identity');
						lib.translate.identity='身份';
						if(!lib.config.gameRecord.identity){
							lib.config.gameRecord.identity={data:{}};
						}
					}
					if(pack.background){
						for(i in pack.background){
							if(lib.config.hiddenBackgroundPack.contains(i)) continue;
							lib.configMenu.appearence.config.image_background.item[i]=pack.background[i];
						}
						for(var i=0;i<lib.config.customBackgroundPack.length;i++){
							var link=lib.config.customBackgroundPack[i];
							lib.configMenu.appearence.config.image_background.item[link]=link.slice(link.indexOf('_')+1);
						}
						lib.configMenu.appearence.config.image_background.item.default='默认';
					}
					if(pack.music){
						if(lib.device||typeof window.require=='function'){
							lib.configMenu.audio.config.background_music.item.music_custom='自定义音乐';
						}
						lib.config.all.background_music=['music_default'];
						for(i in pack.music){
							lib.config.all.background_music.push(i);
							lib.configMenu.audio.config.background_music.item[i]=pack.music[i];
						}
						if(lib.config.customBackgroundMusic){
							for(i in lib.config.customBackgroundMusic){
								lib.config.all.background_music.push(i);
								lib.configMenu.audio.config.background_music.item[i]=lib.config.customBackgroundMusic[i];
							}
						}
						lib.configMenu.audio.config.background_music.item.music_random='随机播放';
						lib.configMenu.audio.config.background_music.item.music_off='关闭';
					}
					if(pack.theme){
						for(i in pack.theme){
							lib.configMenu.appearence.config.theme.item[i]=pack.theme[i];
						}
					}
					if(lib.config.extension_sources){
						for(i in lib.config.extension_sources){
							lib.configMenu.general.config.extension_source.item[i]=i;
						}
					}

					if(pack.font){
						ui.css.fontsheet=lib.init.sheet();
						const appearenceConfig=lib.configMenu.appearence.config,fontSheet=ui.css.fontsheet.sheet,suitsFont=lib.config.suits_font;
						Object.keys(pack.font).forEach(value=>{
							const font=pack.font[value];
							appearenceConfig.name_font.item[value]=font;
							appearenceConfig.identity_font.item[value]=font;
							appearenceConfig.cardtext_font.item[value]=font;
							appearenceConfig.global_font.item[value]=font;
							fontSheet.insertRule(`@font-face {font-family: '${value}'; src: local('${font}'), url('${lib.assetURL}font/${value}.woff2');}`,0);
							if(suitsFont) fontSheet.insertRule(`@font-face {font-family: '${value}'; src: local('${font}'), url('${lib.assetURL}font/suits.woff2');}`,0);
						});
						if(suitsFont) fontSheet.insertRule(`@font-face {font-family: 'Suits'; src: url('${lib.assetURL}font/suits.woff2');}`,0);
						fontSheet.insertRule(`@font-face {font-family: 'NonameSuits'; src: url('${lib.assetURL}font/suits.woff2');}`,0);
						fontSheet.insertRule(`@font-face {font-family: 'MotoyaLMaru'; src: url('${lib.assetURL}font/motoyamaru.woff2');}`,0)
						appearenceConfig.cardtext_font.item.default='默认';
						appearenceConfig.global_font.item.default='默认';
					}

					var ua=navigator.userAgent.toLowerCase();
					if('ontouchstart' in document){
						if(!lib.config.totouched){
							game.saveConfig('totouched',true);
							if(lib.device){
								game.saveConfig('low_performance',true);
								game.saveConfig('confirm_exit',true);
								game.saveConfig('touchscreen',true);
								game.saveConfig('fold_mode',false);
								if(ua.indexOf('ipad')==-1){
									game.saveConfig('phonelayout',true);
								}
								else if(lib.device=='ios'){
									game.saveConfig('show_statusbar_ios','overlay');
								}
							}
							else if(confirm('是否切换到触屏模式？（触屏模式可提高触屏设备的响应速度，但无法使用鼠标）')){
								game.saveConfig('touchscreen',true);
								if(ua.includes('iphone')||ua.includes('android')){
									game.saveConfig('phonelayout',true);
								}
								game.reload();
							}
						}
					}
					else if(lib.config.touchscreen){
						game.saveConfig('touchscreen',false);
					}
					if(!lib.config.toscrolled&&ua.includes('macintosh')){
						game.saveConfig('toscrolled',true);
						game.saveConfig('mousewheel',false);
					}

					var show_splash=lib.config.show_splash;
					if(show_splash=='off'){
						show_splash=false;
					}
					else if(show_splash=='init'){
						if(localStorage.getItem('show_splash_off')){
							show_splash=false;
						}
					}
					localStorage.removeItem('show_splash_off');
					var extensionlist=[];
					if(!localStorage.getItem(lib.configprefix+'disable_extension')){
						if(lib.config.extensions&&lib.config.extensions.length){
							window.resetExtension=function(){
								for(var i=0;i<lib.config.extensions.length;i++){
									game.saveConfig('extension_'+lib.config.extensions[i]+'_enable',false);
								}
								localStorage.setItem(lib.configprefix+'disable_extension',true);
							}
						}
						for(var i=0;i<lib.config.plays.length;i++){
							if(lib.config.all.plays.includes(lib.config.plays[i])){
								extensionlist.push(lib.config.plays[i]);
							}
						}
						var alerted=false;
						for(var i=0;i<lib.config.extensions.length;i++){
							if(window.bannedExtensions.contains(lib.config.extensions[i])){
								//if(!alerted) alert('读取某些扩展时出现问题。');
								alerted=true;
								continue;
							}
							var extcontent=localStorage.getItem(lib.configprefix+'extension_'+lib.config.extensions[i]);
							if(extcontent){
								//var backup_onload=lib.init.onload;
								_status.evaluatingExtension=true;
								try{
									eval(extcontent);
								}
								catch(e){
									console.log(e);
								}
								//lib.init.onload=backup_onload;
								_status.evaluatingExtension=false;
							}
							else if(lib.config.mode!='connect'||(!localStorage.getItem(lib.configprefix+'directstart')&&show_splash)){
								extensionlist.push(lib.config.extensions[i]);
							}
						}
					}
					else{
						if(lib.config.mode!='connect'||(!localStorage.getItem(lib.configprefix+'directstart')&&show_splash)){
							var alerted=false;
							for(var i=0;i<lib.config.extensions.length;i++){
								if(window.bannedExtensions.contains(lib.config.extensions[i])){
									//if(!alerted) alert('读取某些扩展时出现问题。');
									alerted=true;
									continue;
								}
								game.import('extension',{name:lib.config.extensions[i]});
							}
						}
					}
					const loadPack=()=>{
						const isArray=Array.isArray;
						if (isArray(lib.onprepare)&&lib.onprepare.length){
							_status.onprepare=Object.freeze(lib.onprepare.map(fn=>{
								if(typeof fn!="function") return;
								return (gnc.is.generatorFunc(fn)?gnc.of(fn):fn)();
							}));
						}
						let toLoad=lib.config.all.cards.length+lib.config.all.characters.length+1;
						if(_status.javaScriptExtensions) toLoad+=_status.javaScriptExtensions.reduce((constructingToLoad,javaScriptExtension)=>{
							const lengths=Object.values(javaScriptExtension).reduce((constructingLengths,value)=>{
								if(isArray(value)) constructingLengths.push(value.length);
								return constructingLengths;
							},[]);
							if(!lengths.length) return constructingToLoad+1;
							return constructingToLoad+Math.min(...lengths);
						},0);
						const packLoaded=gnc.of(function*(){
							toLoad--;
							if(toLoad) return;
							if(_status.importing){
								let promises=lib.creation.array;
								for(const type in _status.importing){
									promises.addArray(_status.importing[type])
								}
								yield Promise.allSettled(promises);
								delete _status.importing;
							}
							if(_status.windowLoaded){
								delete _status.windowLoaded;
								lib.init.onload();
							}
							else _status.packLoaded=true;
						});
						if(localStorage.getItem(`${lib.configprefix}playback`)){
							toLoad++;
							lib.init.js(`${lib.assetURL}mode`,lib.config.mode,packLoaded,packLoaded);
						}
						else if((localStorage.getItem(`${lib.configprefix}directstart`)||!show_splash)&&lib.config.all.mode.includes(lib.config.mode)){
							toLoad++;
							lib.init.js(`${lib.assetURL}mode`,lib.config.mode,packLoaded,packLoaded);
						}
						lib.init.js(`${lib.assetURL}card`,lib.config.all.cards,packLoaded,packLoaded);
						lib.init.js(`${lib.assetURL}character`,lib.config.all.characters,packLoaded,packLoaded);
						lib.init.js(`${lib.assetURL}character`,'rank',packLoaded,packLoaded);
						if(!_status.javaScriptExtensions) return;
						const loadJavaScriptExtension=(javaScriptExtension,pathArray,fileArray,onLoadArray,onErrorArray,index)=>{
							if(!pathArray&&!fileArray&&!onLoadArray&&!onErrorArray){
								lib.init.js(javaScriptExtension.path,javaScriptExtension.file,()=>{
									if(typeof javaScriptExtension.onload=='function') javaScriptExtension.onload();
									packLoaded();
								},()=>{
									if(typeof javaScriptExtension.onerror=='function') javaScriptExtension.onerror();
									packLoaded();
								});
								return;
							}
							if(typeof index!='number') index=0;
							if(pathArray&&index>=javaScriptExtension.path.length) return;
							if(fileArray&&index>=javaScriptExtension.file.length) return;
							if(onLoadArray&&index>=javaScriptExtension.onload.length) return;
							if(onErrorArray&&index>=javaScriptExtension.onerror.length) return;
							const path=pathArray?javaScriptExtension.path[index]:javaScriptExtension.path;
							const file=fileArray?javaScriptExtension.file[index]:javaScriptExtension.file;
							const onLoad=onLoadArray?javaScriptExtension.onload[index]:javaScriptExtension.onload;
							const onError=onErrorArray?javaScriptExtension.onerror[index]:javaScriptExtension.onerror;
							const javaScriptExtensionOnLoad=()=>{
								if(typeof onLoad=='function') onLoad();
								loadJavaScriptExtension(javaScriptExtension,pathArray,fileArray,onLoadArray,onErrorArray,index+1);
								packLoaded();
							},jsExtOnError=()=>{
								if(typeof onError=='function') onError();
								loadJavaScriptExtension(javaScriptExtension,pathArray,fileArray,onLoadArray,onErrorArray,index+1);
								packLoaded();
							};
							lib.init.js(path,file,javaScriptExtensionOnLoad,jsExtOnError);
						};
						_status.javaScriptExtensions.forEach(javaScriptExtension=>{
							const pathArray=isArray(javaScriptExtension.path);
							const fileArray=isArray(javaScriptExtension.file);
							const onLoadArray=isArray(javaScriptExtension.onLoad);
							const onErrorArray=isArray(javaScriptExtension.onError);
							loadJavaScriptExtension(javaScriptExtension,pathArray,fileArray,onLoadArray,onErrorArray);
						});
					};

					var layout=lib.config.layout;
					if(layout=='default'||lib.layoutfixed.indexOf(lib.config.mode)!==-1){
						layout='mobile';
					}
					if(layout=='phone'){
						layout='mobile';
						game.saveConfig('layout','mobile');
						game.saveConfig('phonelayout',true);
					}
					game.layout=layout;
					if(lib.config.image_background_random){
						if(_status.htmlbg){
							game.saveConfig('image_background',_status.htmlbg);
						}
						else{
							var list=[];
							for(var i in lib.configMenu.appearence.config.image_background.item){
								if(i=='default') continue;
								list.push(i);
							}
							game.saveConfig('image_background',list.randomGet(lib.config.image_background));
						}
						lib.init.background();
					}
					delete _status.htmlbg;

					window.game=game;
					game.dynamicStyle.init();
					// node:path library alternative
					if (typeof module!="object"||typeof module.exports!="object") lib.init.js(`${lib.assetURL}game`,"path.min",()=>{
						lib.path=window._noname_path;
						delete window._noname_path;
					},e=>{
						console.log(e);
					});
					var styleToLoad=6;
					var styleLoaded=gnc.of(function*(){
						--styleToLoad;
						if(styleToLoad==0){
							if(extensionlist.length&&(lib.config.mode!='connect'||show_splash)){
								_status.extensionLoading=[];
								let extToLoad=extensionlist.length;
								const extLoaded=gnc.of(function*(){
									--extToLoad;
									if(extToLoad==0){
										yield Promise.allSettled(_status.extensionLoading);
										delete _status.extensionLoading;
										loadPack();
									}
								});
								//读取扩展
								var alerted=false;
								for(var i=0;i<extensionlist.length;i++){
									if(window.bannedExtensions.contains(extensionlist[i])){
										alerted=true;
										--extToLoad;
										if(extToLoad==0){
											yield Promise.allSettled(_status.extensionLoading);
											delete _status.extensionLoading;
											loadPack();
										}
										continue;
									}
									lib.init.js(lib.assetURL+'extension/'+extensionlist[i],'extension',extLoaded,(function(i){
										return gnc.of(function*(){
											game.removeExtension(i);
											--extToLoad;
											if(extToLoad==0){
												yield Promise.allSettled(_status.extensionLoading);
												delete _status.extensionLoading;
												loadPack();
											}
										});
									}(extensionlist[i])));
								}
							}
							else{
								loadPack();
							}
						}
					});
					if(lib.config.layout=='default'){
						lib.config.layout='mobile';
					}
					ui.css.layout=lib.init.css(lib.assetURL+'layout/'+layout,'layout',styleLoaded);
					if(get.is.phoneLayout()){
						ui.css.phone=lib.init.css(lib.assetURL+'layout/default','phone',styleLoaded);
					}
					else{
						ui.css.phone=lib.init.css();
						styleToLoad--;
					}
					ui.css.theme=lib.init.css(lib.assetURL+'theme/'+lib.config.theme,'style',styleLoaded);
					ui.css.card_style=lib.init.css(lib.assetURL+'theme/style/card',lib.config.card_style,styleLoaded);
					ui.css.cardback_style=lib.init.css(lib.assetURL+'theme/style/cardback',lib.config.cardback_style,styleLoaded);
					ui.css.hp_style=lib.init.css(lib.assetURL+'theme/style/hp',lib.config.hp_style,styleLoaded);

					if(lib.config.player_style&&lib.config.player_style!='default'&&lib.config.player_style!='custom'){
						var str='';
						switch(lib.config.player_style){
							case 'wood':str='url("'+lib.assetURL+'theme/woodden/wood.jpg")';break;
							case 'music':str='linear-gradient(#4b4b4b, #464646)';break;
							case 'simple':str='linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))';break;
						}
						ui.css.player_stylesheet=lib.init.sheet('#window .player{background-image:'+str+'}');
					}
					if(lib.config.border_style&&lib.config.border_style!='default'&&lib.config.border_style!='custom'&&lib.config.border_style!='auto'){
						ui.css.border_stylesheet=lib.init.sheet();
						var bstyle=lib.config.border_style;
						if(bstyle.startsWith('dragon_')){
							bstyle=bstyle.slice(7);
						}
						ui.css.border_stylesheet.sheet.insertRule('#window .player>.framebg,#window #arena.long.mobile:not(.fewplayer) .player[data-position="0"]>.framebg{display:block;background-image:url("'+lib.assetURL+'theme/style/player/'+bstyle+'1.png")}',0);
						ui.css.border_stylesheet.sheet.insertRule('#window #arena.long:not(.fewplayer) .player>.framebg, #arena.oldlayout .player>.framebg{background-image:url("'+lib.assetURL+'theme/style/player/'+bstyle+'3.png")}',0);
						ui.css.border_stylesheet.sheet.insertRule('.player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}',0);
					}
					if(lib.config.control_style&&lib.config.control_style!='default'&&lib.config.control_style!='custom'){
						var str='';
						switch(lib.config.control_style){
							case 'wood':str='url("'+lib.assetURL+'theme/woodden/wood.jpg")';break;
							case 'music':str='linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px';break;
							case 'simple':str='linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px';break;
						}
						if(lib.config.control_style=='wood'){
							ui.css.control_stylesheet=lib.init.sheet('#window .control,#window .menubutton,#window #system>div>div,#window #system>div>.pressdown2{background-image:'+str+'}');
						}
						else{
							ui.css.control_stylesheet=lib.init.sheet('#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:'+str+'}');
						}
					}
					if(lib.config.menu_style&&lib.config.menu_style!='default'&&lib.config.menu_style!='custom'){
						var str='';
						switch(lib.config.menu_style){
							case 'wood':str='url("'+lib.assetURL+'theme/woodden/wood2.png")';break;
							case 'music':str='linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px';break;
							case 'simple':str='linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px';break;
						}
						ui.css.menu_stylesheet=lib.init.sheet('html #window>.dialog.popped,html .menu,html .menubg{background-image:'+str+'}');
					}

					lib.config.duration=500;

					if(!lib.config.touchscreen){
						document.addEventListener('mousewheel',ui.click.windowmousewheel,{passive:true});
						document.addEventListener('mousemove',ui.click.windowmousemove);
						document.addEventListener('mousedown',ui.click.windowmousedown);
						document.addEventListener('mouseup',ui.click.windowmouseup);
						document.addEventListener('contextmenu',ui.click.right);
					}
					else{
						document.addEventListener('touchstart',ui.click.touchconfirm);
						document.addEventListener('touchstart',ui.click.windowtouchstart);
						document.addEventListener('touchend',ui.click.windowtouchend);
						document.addEventListener('touchmove',ui.click.windowtouchmove);
					}
				};
				var proceed2=()=>{
					if(config3){
						proceed(config3);
					}
					else{
						config3=true;
					}
				};

				ui.css={menu:lib.init.css(lib.assetURL+'layout/default','menu',function(){
					ui.css.default=lib.init.css(lib.assetURL+'layout/default','layout');
					proceed2();
				})};

				if(lib.device){
					lib.init.cordovaReady=function(){
						if(lib.device=='android'){
							document.addEventListener("pause", function(){
								if(!_status.paused2&&(typeof _status.event.isMine=='function'&&!_status.event.isMine())){
									ui.click.pause();
								}
								if(ui.backgroundMusic){
									ui.backgroundMusic.pause();
								}
							});
							document.addEventListener("resume", ()=>{
								if(ui.backgroundMusic) Promise.resolve(ui.backgroundMusic.play()).catch(()=>void 0);
							});
							document.addEventListener("backbutton", function(){
								if(ui.arena&&ui.arena.classList.contains('menupaused')){
									if(window.saveNonameInput){
										window.saveNonameInput();
									}
									else{
										ui.click.configMenu();
									}
								}
								else if(lib.config.confirm_exit){
									navigator.notification.confirm(
										'是否退出游戏？',
										function(index){
											switch(index){
												case 2:game.saveConfig('null');game.reload();break;
												case 3:navigator.app.exitApp();break;
											}
										},
										'确认退出',
										['取消','重新开始','退出']
									);
								}
								else{
									navigator.app.exitApp();
								}
							});
						}
						game.download=function(url,folder,onsuccess,onerror,dev,onprogress){
							if(!url.startsWith('http')){
								url=get.url(dev)+url;
							}
							var fileTransfer = new FileTransfer();
							folder=lib.assetURL+folder;
							if(onprogress){
								fileTransfer.onprogress=function(progressEvent){
									onprogress(progressEvent.loaded,progressEvent.total);
								};
							}
							lib.config.brokenFile.add(folder);
							game.saveConfigValue('brokenFile');
							fileTransfer.download(encodeURI(url),encodeURI(folder),function(){
								lib.config.brokenFile.remove(folder);
								game.saveConfigValue('brokenFile');
								if(onsuccess){
									onsuccess();
								}
							},onerror);
						};
						game.readFile=function(filename,callback,onerror){
							window.resolveLocalFileSystemURL(lib.assetURL,function(entry){
								entry.getFile(filename,{},function(fileEntry){
									fileEntry.file(function(fileToLoad){
										var fileReader = new FileReader();
										fileReader.onload = function(e){
											callback(e.target.result);
										};
										fileReader.readAsArrayBuffer(fileToLoad, "UTF-8");
									},onerror);
								},onerror);
							},onerror);
						};
						game.readFileAsText=function(filename,callback,onerror){
							window.resolveLocalFileSystemURL(lib.assetURL,function(entry){
								entry.getFile(filename,{},function(fileEntry){
									fileEntry.file(function(fileToLoad){
										var fileReader = new FileReader();
										fileReader.onload = function(e){
											callback(e.target.result);
										};
										fileReader.readAsText(fileToLoad, "UTF-8");
									},onerror);
								},onerror);
							},onerror);
						};
						game.writeFile=function(data,path,name,callback){
							game.ensureDirectory(path,function(){
								if(Object.prototype.toString.call(data)=='[object File]'){
								var fileReader = new FileReader();
								fileReader.onload = function(e){
									game.writeFile(e.target.result,path,name,callback);
								};
								fileReader.readAsArrayBuffer(data, "UTF-8");
							}
							else{
								window.resolveLocalFileSystemURL(lib.assetURL+path,function(entry){
									entry.getFile(name,{create:true},function(fileEntry){
										fileEntry.createWriter(function(fileWriter){
											fileWriter.onwriteend=callback;
											fileWriter.write(data);
										});
									});
								});
							}
							});
						};
						game.removeFile=function(dir,callback){
							window.resolveLocalFileSystemURL(lib.assetURL,function(entry){
								entry.getFile(dir,{},function(fileEntry){
									fileEntry.remove();
									if(callback){
										callback();
									}
								});
							});
						};
						game.getFileList=(dir,success,failure)=>{
							var files=[],folders=[];
							window.resolveLocalFileSystemURL(lib.assetURL+dir,entry=>{
								var dirReader=entry.createReader();
								var entries=[];
								var readEntries=()=>{
									dirReader.readEntries(results=>{
										if(!results.length){
											entries.sort();
											for(var i=0;i<entries.length;i++){
												if(entries[i].isDirectory){
													folders.push(entries[i].name);
												}
												else{
													files.push(entries[i].name);
												}
											}
											success(folders,files);
										}
										else{
											entries=entries.concat(Array.from(results));
											readEntries();
										}
									},failure);
								};
								readEntries();
							},failure);
						};
						game.ensureDirectory=(list,callback,file)=>{
							const directoryList=typeof list=='string'?[list]:list.slice().reverse(),num=file?1:0,access=(entry,directory,createDirectory)=>{
								if(directory.length<=num){
									createDirectory();
									return;
								}
								const str=directory.pop();
								return new Promise((resolve,reject)=>entry.getDirectory(str,{
									create:false
								},resolve,reject)).catch(()=>new Promise(resolve=>entry.getDirectory(str,{
									create:true
								},resolve))).then(directoryEntry=>access(directoryEntry,directory,createDirectory));
							};
							return new Promise((resolve,reject)=>window.resolveLocalFileSystemURL(lib.assetURL,rootEntry=>{
								const createDirectory=()=>{
									if(directoryList.length) access(rootEntry,directoryList.pop().split('/').reverse(),createDirectory);
									if(typeof callback=='function') callback();
									resolve();
								};
								createDirectory();
							},reject));
						};
						if(ui.updateUpdate){
							ui.updateUpdate();
						}
						var showbar=function(){
							if(window.StatusBar){
								if(lib.device=='android'){
									if(lib.config.show_statusbar_android){
										window.StatusBar.overlaysWebView(false);
										window.StatusBar.backgroundColorByName('black');
										window.StatusBar.show();
									}
								}
								else if(lib.device=='ios'){
									if(lib.config.show_statusbar_ios!='off'&&lib.config.show_statusbar_ios!='auto'){
										if(lib.config.show_statusbar_ios=='default'){
											window.StatusBar.overlaysWebView(false);
										}
										else{
											window.StatusBar.overlaysWebView(true);
										}
										window.StatusBar.backgroundColorByName('black');
										window.StatusBar.show();
									}
								}
							}
						}
						if(lib.arenaReady){
							lib.arenaReady.push(showbar);
						}
						else{
							showbar();
						}
					}
				}
				else if(typeof window.require=='function'){
					lib.node={
						fs:require('fs'),
						path:require("path"),
						debug:function(){
							require('electron').remote.getCurrentWindow().toggleDevTools();
						}
					};
					lib.path=lib.node.path;
					game.download=function(url,folder,onsuccess,onerror,dev,onprogress){
						if(!url.startsWith('http')){
							url=get.url(dev)+url;
						}
						game.ensureDirectory(folder,function(){
							try{
								var file = lib.node.fs.createWriteStream(__dirname+'/'+folder);
							}
							catch(e){
								onerror();
							}
							lib.config.brokenFile.add(folder);
							game.saveConfigValue('brokenFile');
							if(!lib.node.http) lib.node.http=require('http');
							if(!lib.node.https) lib.node.https=require('https');
							var opts = require('url').parse(encodeURI(url));
							opts.headers={'User-Agent': 'AppleWebkit'};
							(url.startsWith('https')?lib.node.https:lib.node.http).get(opts, function(response) {
								var stream=response.pipe(file);
								stream.on('finish',function(){
									lib.config.brokenFile.remove(folder);
									game.saveConfigValue('brokenFile');
									if(onsuccess){
										onsuccess();
									}
								});
								stream.on('error',onerror);
								if(onprogress){
									var streamInterval=setInterval(function(){
										if(stream.closed){
											clearInterval(streamInterval);
										}
										else{
											onprogress(stream.bytesWritten);
										}
									},200);
								}
							});
						},true);
					};
					game.readFile=function(filename,callback,onerror){
						lib.node.fs.readFile(__dirname+'/'+filename,function(err,data){
							if(err){
								onerror(err);
							}
							else{
								callback(data);
							}
						});
					};
					game.readFileAsText=function(filename,callback,onerror){
						lib.node.fs.readFile(__dirname+'/'+filename,'utf-8',function(err,data){
							if(err){
								onerror(err);
							}
							else{
								callback(data);
							}
						});
					};
					game.writeFile=function(data,path,name,callback){
						game.ensureDirectory(path,function(){
						if(Object.prototype.toString.call(data)=='[object File]'){
							var fileReader = new FileReader();
							fileReader.onload = function(e){
								game.writeFile(e.target.result,path,name,callback);
							};
							fileReader.readAsArrayBuffer(data, "UTF-8");
						}
						else{
							get.zip(function(zip){
								zip.file('i',data);
								lib.node.fs.writeFile(__dirname+'/'+path+'/'+name,zip.files.i.asNodeBuffer(),null,callback);
							});
						}
						});
					};
					game.removeFile=function(filename,callback){
						lib.node.fs.unlink(__dirname+'/'+filename,callback||function(){});
					};
					game.getFileList=(dir,success,failure)=>{
						var files=[],folders=[];
						dir=__dirname+'/'+dir;
						if(typeof failure=="undefined"){
							failure=err=>{
								throw err;
							};
						}
						else if(failure == null){
							failure=()=>{};
						}
						try{
							lib.node.fs.readdir(dir,(err,filelist)=>{
								if(err){
									failure(err);
									return;
								}
								for(var i=0;i<filelist.length;i++){
									if(filelist[i][0]!='.'&&filelist[i][0]!='_'){
										if(lib.node.fs.statSync(dir+'/'+filelist[i]).isDirectory()){
											folders.push(filelist[i]);
										}
										else{
											files.push(filelist[i]);
										}
									}
								}
								success(folders,files);
							});
						}
						catch(e){
							failure(e);
						}
					};
					game.ensureDirectory=(list,callback,file)=>{
						const directoryList=typeof list=='string'?[list]:list.slice().reverse(),number=file?1:0,access=(path,directory,createDirectory)=>{
							if(directory.length<=number){
								createDirectory();
								return;
							}
							path+=`/${directory.pop()}`;
							const fullPath=`${__dirname}${path}`;
							return new Promise((resolve,reject)=>lib.node.fs.access(fullPath,errnoException=>{
								if(errnoException) reject();
								else resolve();
							})).catch(()=>new Promise((resolve,reject)=>lib.node.fs.mkdir(fullPath,errnoException=>{
								if(errnoException) reject(errnoException);
								else resolve();
							}))).then(()=>access(path,directory,createDirectory),console.log);
						};
						return new Promise(resolve=>{
							const createDirectory=()=>{
								if(directoryList.length) access('',directoryList.pop().split('/').reverse(),createDirectory);
								else{
									if(typeof callback=='function') callback();
									resolve();
								}
							};
							createDirectory();
						});
					};
					if(ui.updateUpdate){
						ui.updateUpdate();
					}
				}
				else{
					window.onbeforeunload=function(){
						if(lib.config.confirm_exit&&!_status.reloading){
							return '是否离开游戏？'
						}
						else{
							return null;
						}
					}
				}

				lib.config=window.config;
				lib.configOL={};
				delete window.config;
				let config2;
				if(localStorage.getItem(`${lib.configprefix}nodb`)) window.nodb=true;
				if(window.indexedDB&&!window.nodb) new Promise((resolve,reject)=>{
					const idbOpenDBRequest=window.indexedDB.open(`${lib.configprefix}data`,4);
					idbOpenDBRequest.onerror=reject;
					idbOpenDBRequest.onsuccess=resolve;
					idbOpenDBRequest.onupgradeneeded=idbVersionChangeEvent=>{
						const idbDatabase=idbVersionChangeEvent.target.result;
						if(!idbDatabase.objectStoreNames.contains('video')) idbDatabase.createObjectStore('video',{
							keyPath:'time'
						});
						if(!idbDatabase.objectStoreNames.contains('image')) idbDatabase.createObjectStore('image');
						if(!idbDatabase.objectStoreNames.contains('audio')) idbDatabase.createObjectStore('audio');
						if(!idbDatabase.objectStoreNames.contains('config')) idbDatabase.createObjectStore('config');
						if(!idbDatabase.objectStoreNames.contains('data')) idbDatabase.createObjectStore('data');
					};
				}).then(event=>{
					lib.db=event.target.result;
					return game.getDB('config');
				}).then(object=>{
					if(!object.storageImported){
						try{
							config2=JSON.parse(localStorage.getItem(`${lib.configprefix}config`));
							if(!config2||typeof config2!='object') throw 'err';
						}
						catch(err){
							config2={};
						}
						Object.keys(config2).forEach(key=>game.saveConfig(key,config2[key]));
						Object.keys(lib.mode).forEach(key=>{
							try{
								config2=JSON.parse(localStorage.getItem(`${lib.configprefix}${key}`));
								if(!config2||typeof config2!='object'||get.is.empty(config2)) throw 'err';
							}
							catch(err){
								config2=false;
							}
							localStorage.removeItem(`${lib.configprefix}${key}`);
							if(config2) game.putDB('data',key,config2);
						});
						game.saveConfig('storageImported',true);
						lib.init.background();
						localStorage.removeItem(`${lib.configprefix}config`);
					}
					else config2=object;
					proceed(config2);
				});
				else{
					try{
						config2=JSON.parse(localStorage.getItem(lib.configprefix+'config'));
						if(!config2||typeof config2!='object') throw 'err'
					}
					catch(err){
						config2={};
						localStorage.setItem(lib.configprefix+'config',JSON.stringify({}));
					}
					proceed(config2);
				}
			},
			reset:function(){
				if(window.inSplash) return;
				if(window.resetExtension){
					if(confirm('游戏似乎未正常载入，有可能因为部分扩展未正常载入，或者因为部分扩展未载入完毕。\n是否禁用扩展并重新打开？')){
						window.resetExtension();
						window.location.reload();
					}
				}
				else{
					if(lib.device){
						if(navigator.notification){
							navigator.notification.confirm(
								'游戏似乎未正常载入，是否重置游戏？',
								function(index){
									if(index==2){
										localStorage.removeItem('noname_inited');
										window.location.reload();
									}
									else if(index==3){
										var noname_inited=localStorage.getItem('noname_inited');
										var onlineKey=localStorage.getItem(lib.configprefix+'key');
										localStorage.clear();
										if(noname_inited){
											localStorage.setItem('noname_inited',noname_inited);
										}
										if(onlineKey){
											localStorage.setItem(lib.configprefix+'key',onlineKey);
										}
										if(indexedDB) indexedDB.deleteDatabase(lib.configprefix+'data');
										setTimeout(function(){
											window.location.reload();
										},200);
									}
								},
								'确认退出',
								['取消','重新下载','重置设置']
							);
						}
						else{
							if(confirm('游戏似乎未正常载入，是否重置游戏？')){
								localStorage.removeItem('noname_inited');
								window.location.reload();
							}
						}
					}
					else{
						if(confirm('游戏似乎未正常载入，是否重置游戏？')){
							var onlineKey=localStorage.getItem(lib.configprefix+'key');
							localStorage.clear();
							if(onlineKey){
								localStorage.setItem(lib.configprefix+'key',onlineKey);
							}
							if(indexedDB) indexedDB.deleteDatabase(lib.configprefix+'data');
							setTimeout(function(){
								window.location.reload();
							},200);
						}
					}
				}
			},
			//lib.onload支持传入GeneratorFunction以解决异步函数的问题 by诗笺
			onload:gnc.of(function*(){
				const libOnload=lib.onload;
				delete lib.onload;
				while(Array.isArray(libOnload)&&libOnload.length){
					const fun=libOnload.shift();
					if(typeof fun!="function") continue;
					yield (gnc.is.generatorFunc(fun)?gnc.of(fun):fun)();
				}
				ui.updated();
				game.documentZoom=game.deviceZoom;
				if(game.documentZoom!=1){
					ui.updatez();
				}
				ui.background=ui.create.div('.background');
				ui.background.style.backgroundSize="cover";
				ui.background.style.backgroundPosition='50% 50%';
				if(lib.config.image_background&&lib.config.image_background!='default'&&!lib.config.image_background.startsWith('custom_')){
					ui.background.setBackgroundImage('image/background/'+lib.config.image_background+'.jpg');
					if(lib.config.image_background_blur){
						ui.background.style.filter='blur(8px)';
						ui.background.style.webkitFilter='blur(8px)';
						ui.background.style.transform='scale(1.05)';
					}
				}
				document.documentElement.style.backgroundImage='';
				document.documentElement.style.backgroundSize='';
				document.documentElement.style.backgroundPosition='';
				document.body.insertBefore(ui.background,document.body.firstChild);
				document.body.onresize=ui.updatexr;
				if(lib.config.touchscreen){
					document.body.addEventListener('touchstart',function(e){
						this.startX=e.touches[0].clientX/game.documentZoom;
						this.startY=e.touches[0].clientY/game.documentZoom;
						_status.dragged=false;
					});
					document.body.addEventListener('touchmove',function(e){
						if(_status.dragged) return;
						if (Math.abs(e.touches[0].clientX/game.documentZoom - this.startX) > 10 ||
							Math.abs(e.touches[0].clientY/game.documentZoom - this.startY) > 10) {
							_status.dragged=true;
						}
					});
				}

				if(lib.config.image_background.startsWith('custom_')){
					ui.background.style.backgroundImage="none";
					game.getDB('image',lib.config.image_background,function(fileToLoad){
						if(!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent)
						{
							var data = fileLoadedEvent.target.result;
							ui.background.style.backgroundImage='url('+data+')';
							if(lib.config.image_background_blur){
								ui.background.style.filter='blur(8px)';
								ui.background.style.webkitFilter='blur(8px)';
								ui.background.style.transform='scale(1.05)';
							}
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				}
				if(lib.config.card_style=='custom'){
					game.getDB('image','card_style',function(fileToLoad){
						if(!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent){
							if(ui.css.card_stylesheet){
								ui.css.card_stylesheet.remove();
							}
							ui.css.card_stylesheet=lib.init.sheet('.card:not(*:empty){background-image:url('+fileLoadedEvent.target.result+')}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				}
				if(lib.config.cardback_style=='custom'){
					game.getDB('image','cardback_style',function(fileToLoad){
						if(!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent){
							if(ui.css.cardback_stylesheet){
								ui.css.cardback_stylesheet.remove();
							}
							ui.css.cardback_stylesheet=lib.init.sheet('.card:empty,.card.infohidden{background-image:url('+fileLoadedEvent.target.result+')}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
					game.getDB('image','cardback_style2',function(fileToLoad){
						if(!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent){
							if(ui.css.cardback_stylesheet2){
								ui.css.cardback_stylesheet2.remove();
							}
							ui.css.cardback_stylesheet2=lib.init.sheet('.card.infohidden:not(.infoflip){background-image:url('+fileLoadedEvent.target.result+')}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				}
				if(lib.config.hp_style=='custom'){
					game.getDB('image','hp_style1',function(fileToLoad){
						if(!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent){
							if(ui.css.hp_stylesheet1){
								ui.css.hp_stylesheet1.remove();
							}
							ui.css.hp_stylesheet1=lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="high"]>div:not(.lost){background-image:url('+fileLoadedEvent.target.result+')}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
					game.getDB('image','hp_style2',function(fileToLoad){
						if(!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent){
							if(ui.css.hp_stylesheet2){
								ui.css.hp_stylesheet2.remove();
							}
							ui.css.hp_stylesheet2=lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="mid"]>div:not(.lost){background-image:url('+fileLoadedEvent.target.result+')}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
					game.getDB('image','hp_style3',function(fileToLoad){
						if(!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent){
							if(ui.css.hp_stylesheet3){
								ui.css.hp_stylesheet3.remove();
							}
							ui.css.hp_stylesheet3=lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="low"]>div:not(.lost){background-image:url('+fileLoadedEvent.target.result+')}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
					game.getDB('image','hp_style4',function(fileToLoad){
						if(!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent){
							if(ui.css.hp_stylesheet4){
								ui.css.hp_stylesheet4.remove();
							}
							ui.css.hp_stylesheet4=lib.init.sheet('.hp:not(.text):not(.actcount)>.lost{background-image:url('+fileLoadedEvent.target.result+')}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				}
				if(lib.config.player_style=='custom'){
					ui.css.player_stylesheet=lib.init.sheet('#window .player{background-image:none;background-size:100% 100%;}');
					game.getDB('image','player_style',function(fileToLoad){
						if(!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent){
							if(ui.css.player_stylesheet){
								ui.css.player_stylesheet.remove();
							}
							ui.css.player_stylesheet=lib.init.sheet('#window .player{background-image:url("'+fileLoadedEvent.target.result+'");background-size:100% 100%;}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				}
				if(lib.config.border_style=='custom'){
					game.getDB('image','border_style',function(fileToLoad){
						if(!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent){
							if(ui.css.border_stylesheet){
								ui.css.border_stylesheet.remove();
							}
							ui.css.border_stylesheet=lib.init.sheet();
							ui.css.border_stylesheet.sheet.insertRule('#window .player>.framebg{display:block;background-image:url("'+fileLoadedEvent.target.result+'")}',0);
							ui.css.border_stylesheet.sheet.insertRule('.player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}',0);
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				}
				if(lib.config.control_style=='custom'){
					game.getDB('image','control_style',function(fileToLoad){
						if(!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent){
							if(ui.css.control_stylesheet){
								ui.css.control_stylesheet.remove();
							}
							ui.css.control_stylesheet=lib.init.sheet('#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:url("'+fileLoadedEvent.target.result+'")}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				}
				if(lib.config.menu_style=='custom'){
					game.getDB('image','menu_style',function(fileToLoad){
						if(!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent){
							if(ui.css.menu_stylesheet){
								ui.css.menu_stylesheet.remove();
							}
							ui.css.menu_stylesheet=lib.init.sheet('html #window>.dialog.popped,html .menu,html .menubg{background-image:url("'+fileLoadedEvent.target.result+'");background-size:cover}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				}

				var proceed2=gnc.of(function*(){
					var mode=lib.imported.mode;
					var card=lib.imported.card;
					var character=lib.imported.character;
					var play=lib.imported.play;
					delete window.game;
					var i,j,k;
					for(i in mode[lib.config.mode].element){
						if(!lib.element[i]) lib.element[i]=[];
						for(j in mode[lib.config.mode].element[i]){
							if(j=='init'){
								if(!lib.element[i].inits) lib.element[i].inits=[];
								lib.element[i].inits.push(mode[lib.config.mode].element[i][j]);
							}
							else{
								lib.element[i][j]=mode[lib.config.mode].element[i][j];
							}
						}
					}
					for(i in mode[lib.config.mode].ai){
						if(typeof mode[lib.config.mode].ai[i]=='object'){
							if(ai[i]==undefined) ai[i]={};
							for(j in mode[lib.config.mode].ai[i]){
								ai[i][j]=mode[lib.config.mode].ai[i][j];
							}
						}
						else{
							ai[i]=mode[lib.config.mode].ai[i];
						}
					}
					for(i in mode[lib.config.mode].ui){
						if(typeof mode[lib.config.mode].ui[i]=='object'){
							if(ui[i]==undefined) ui[i]={};
							for(j in mode[lib.config.mode].ui[i]){
								ui[i][j]=mode[lib.config.mode].ui[i][j];
							}
						}
						else{
							ui[i]=mode[lib.config.mode].ui[i];
						}
					}
					for(i in mode[lib.config.mode].game){
						game[i]=mode[lib.config.mode].game[i];
					}
					for(i in mode[lib.config.mode].get){
						get[i]=mode[lib.config.mode].get[i];
					}
					lib.init.start=mode[lib.config.mode].start;
					lib.init.startBefore=mode[lib.config.mode].startBefore;
					if(game.onwash){
						lib.onwash.push(game.onwash);
						delete game.onwash;
					}
					if(game.onover){
						lib.onover.push(game.onover);
						delete game.onover;
					}
					lib.config.banned=lib.config[lib.config.mode+'_banned']||[];
					lib.config.bannedcards=lib.config[lib.config.mode+'_bannedcards']||[];

					lib.rank=window.noname_character_rank;
					delete window.noname_character_rank;
					for(i in mode[lib.config.mode]){
						if(i=='element') continue;
						if(i=='game') continue;
						if(i=='ai') continue;
						if(i=='ui') continue;
						if(i=='get') continue;
						if(i=='config') continue;
						if(i=='onreinit') continue;
						if(i=='start') continue;
						if(i=='startBefore') continue;
						if(lib[i]==undefined) lib[i]=(Array.isArray(mode[lib.config.mode][i]))?[]:{};
						for(j in mode[lib.config.mode][i]){
							lib[i][j]=mode[lib.config.mode][i][j];
						}
					}
					if(typeof mode[lib.config.mode].init=='function'){
						mode[lib.config.mode].init();
					}

					var connectCharacterPack=[];
					var connectCardPack=[];
					for(i in character){
						if(character[i].character){
							const characterPack=lib.characterPack[i];
							if(characterPack) Object.assign(characterPack,character[i].character);
							else lib.characterPack[i]=character[i].character;
						}
						for(j in character[i]){
							if(j=='mode'||j=='forbid') continue;
							if(j=='connect'){
								connectCharacterPack.push(i);
								continue;
							}
							if(j=='character'&&!lib.config.characters.contains(i)&&lib.config.mode!='connect'){
								if(lib.config.mode=='chess'&&get.config('chess_mode')=='leader'&&get.config('chess_leader_allcharacter')){
									for(k in character[i][j]){
										lib.hiddenCharacters.push(k);
									}
								}
								else if(lib.config.mode!='boss'||i!='boss'){
									continue;
								}
							}
							if(Array.isArray(lib[j])&&Array.isArray(character[i][j])){
								lib[j].addArray(character[i][j]);
								continue;
							}
							for(k in character[i][j]){
								if(j=='character'){
									if(!character[i][j][k][4]){
										character[i][j][k][4]=[];
									}
									if(character[i][j][k][4].contains('boss')||
										character[i][j][k][4].contains('hiddenboss')){
										lib.config.forbidai.add(k);
									}
									if(lib.config.forbidai_user&&lib.config.forbidai_user.contains(k)){
										lib.config.forbidai.add(k);
									}
									for(var l=0;l<character[i][j][k][3].length;l++){
										lib.skilllist.add(character[i][j][k][3][l]);
									}
								}
								if(j=='skill'&&k[0]=='_'&&(lib.config.mode!='connect'?(!lib.config.characters.contains(i)):(!character[i].connect))){
									continue;
								}
								if(j=='translate'&&k==i){
									lib[j][k+'_character_config']=character[i][j][k];
								}
								else{
									if(lib[j][k]==undefined){
										if(j=='skill'&&!character[i][j][k].forceLoad&&lib.config.mode=='connect'&&!character[i].connect){
											lib[j][k]={
												nopop:character[i][j][k].nopop,
												derivation:character[i][j][k].derivation
											};
										}
										else{
											Object.defineProperty(lib[j],k,Object.getOwnPropertyDescriptor(character[i][j],k));
										}
										if(j=='card'&&lib[j][k].derivation){
											if(!lib.cardPack.mode_derivation){
												lib.cardPack.mode_derivation=[k];
											}
											else{
												lib.cardPack.mode_derivation.push(k);
											}
										}
									}
									else if(Array.isArray(lib[j][k])&&Array.isArray(character[i][j][k])){
										lib[j][k].addArray(character[i][j][k]);
									}
									else{
										console.log(
											`dublicate ${j} in character ${i}:\n${k}:\nlib.${j}.${k}`,
											lib[j][k],
											`\ncharacter.${i}.${j}.${k}`,
											character[i][j][k]
										);
									}
								}
							}
						}
					}
					var connect_avatar_list=[];
					for(var i in lib.character){
						connect_avatar_list.push(i);
					}
					connect_avatar_list.sort(lib.sort.capt);
					for(var i=0;i<connect_avatar_list.length;i++){
						var ia=connect_avatar_list[i];
						lib.mode.connect.config.connect_avatar.item[ia]=lib.translate[ia];
					}
					if(lib.config.mode!='connect'){
						var pilecfg=lib.config.customcardpile[get.config('cardpilename')||'当前牌堆'];
						if(pilecfg){
							lib.config.bannedpile=get.copy(pilecfg[0]||{});
							lib.config.addedpile=get.copy(pilecfg[1]||{});
						}
						else{
							lib.config.bannedpile={};
							lib.config.addedpile={};
						}
					}
					else{
						lib.cardPackList={};
					}
					for(i in card){
						const cardPack=lib.cardPack[i]?lib.cardPack[i]:lib.cardPack[i]=[];
						if(card[i].card){
							for(var j in card[i].card){
								if(!card[i].card[j].hidden&&card[i].translate[j+'_info']){
									cardPack.push(j);
								}
							}
						}
						for(j in card[i]){
							if(j=='mode'||j=='forbid') continue;
							if(j=='connect'){
								connectCardPack.push(i);
								continue;
							}
							if(j=='list'){
								if(lib.config.mode=='connect'){
									const cardPackList=lib.cardPackList[i];
									if(cardPackList) cardPackList.addArray(card[i][j]);
									else lib.cardPackList[i]=card[i][j];
								}
								else{
									if(lib.config.cards.contains(i)){
										var pile;
										if(typeof card[i][j]=='function'){
											pile=card[i][j]();
										}
										else{
											pile=card[i][j];
										}
										const cardPile=lib.cardPile[i];
										if(cardPile) cardPile.addArray(pile);
										else lib.cardPile[i]=pile.slice(0);
										if(lib.config.bannedpile[i]){
											for(var k=0;k<lib.config.bannedpile[i].length;k++){
												pile[lib.config.bannedpile[i][k]]=null;
											}
										}
										for(var k=0;k<pile.length;k++){
											if(!pile[k]){
												pile.splice(k--,1);
											}
										}
										if(lib.config.addedpile[i]){
											for(var k=0;k<lib.config.addedpile[i].length;k++){
												pile.push(lib.config.addedpile[i][k]);
											}
										}
										lib.card.list.addArray(pile);
									}
								}
							}
							else{
								for(k in card[i][j]){
									if(j=='skill'&&k[0]=='_'&&!card[i][j][k].forceLoad&&(lib.config.mode!='connect'?(!lib.config.cards.contains(i)):(!card[i].connect))){
										continue;
									}
									if(j=='translate'&&k==i){
										lib[j][k+'_card_config']=card[i][j][k];
									}
									else{
										if(lib[j][k]==undefined){
											if(j=='skill'&&!card[i][j][k].forceLoad&&lib.config.mode=='connect'&&!card[i].connect){
												lib[j][k]={
													nopop:card[i][j][k].nopop,
													derivation:card[i][j][k].derivation
												};
											}
											else{
												Object.defineProperty(lib[j],k,Object.getOwnPropertyDescriptor(card[i][j],k));
											}
										}
										else{
											console.log(
												`dublicate ${j} in card ${i}:\n${k}:\nlib.${j}.${k}`,
												lib[j][k],
												`\ncard.${i}.${j}.${k}`,
												card[i][j][k]
											);
										}
										if(j=='card'&&lib[j][k].derivation){
											if(!lib.cardPack.mode_derivation){
												lib.cardPack.mode_derivation=[k];
											}
											else{
												lib.cardPack.mode_derivation.push(k);
											}
										}
									}
								}
							}
						}
					}
					if(lib.cardPack.mode_derivation){
						for(var i=0;i<lib.cardPack.mode_derivation.length;i++){
							if(typeof lib.card[lib.cardPack.mode_derivation[i]].derivation=='string'&&!lib.character[lib.card[lib.cardPack.mode_derivation[i]].derivation]){
								lib.cardPack.mode_derivation.splice(i--,1);
							}
							else if(typeof lib.card[lib.cardPack.mode_derivation[i]].derivationpack=='string'&&!lib.config.cards.contains(lib.card[lib.cardPack.mode_derivation[i]].derivationpack)){
								lib.cardPack.mode_derivation.splice(i--,1);
							}
						}
						if(lib.cardPack.mode_derivation.length==0){
							delete lib.cardPack.mode_derivation;
						}
					}
					if(lib.config.mode!='connect'){
						for(i in play){
							if(lib.config.hiddenPlayPack.contains(i)) continue;
							if(play[i].forbid&&play[i].forbid.contains(lib.config.mode)) continue;
							if(play[i].mode&&play[i].mode.contains(lib.config.mode)==false) continue;
							for(j in play[i].element){
								if(!lib.element[j]) lib.element[j]=[];
								for(k in play[i].element[j]){
									if(k=='init'){
										if(!lib.element[j].inits) lib.element[j].inits=[];
										lib.element[j].inits.push(play[i].element[j][k]);
									}
									else{
										lib.element[j][k]=play[i].element[j][k];
									}
								}
							}
							for(j in play[i].ui){
								if(typeof play[i].ui[j]=='object'){
									if(ui[j]==undefined) ui[j]={};
									for(k in play[i].ui[j]){
										ui[j][k]=play[i].ui[j][k];
									}
								}
								else{
									ui[j]=play[i].ui[j];
								}
							}
							for(j in play[i].game){
								game[j]=play[i].game[j];
							}
							for(j in play[i].get){
								get[j]=play[i].get[j];
							}
							for(j in play[i]){
								if(j=='mode'||j=='forbid'||j=='init'||j=='element'||
								j=='game'||j=='get'||j=='ui'||j=='arenaReady') continue;
								for(k in play[i][j]){
									if(j=='translate'&&k==i){
										// lib[j][k+'_play_config']=play[i][j][k];
									}
									else{
										if(lib[j][k]!=undefined){
											console.log(
												`dublicate ${j} in play ${i}:\n${k}:\nlib.${j}.${k}`,
												lib[j][k],
												`\nplay.${i}.${j}.${k}`,
												play[i][j][k]
											);
										}
										lib[j][k]=play[i][j][k];
									}
								}
							}
							if(typeof play[i].init=='function') play[i].init();
							if(typeof play[i].arenaReady=='function') lib.arenaReady.push(play[i].arenaReady);
						}
					}

					lib.connectCharacterPack=[];
					lib.connectCardPack=[];
					for(var i=0;i<lib.config.all.characters.length;i++){
						var packname=lib.config.all.characters[i];
						if(connectCharacterPack.contains(packname)){
							lib.connectCharacterPack.push(packname)
						}
					}
					for(var i=0;i<lib.config.all.cards.length;i++){
						var packname=lib.config.all.cards[i];
						if(connectCardPack.contains(packname)){
							lib.connectCardPack.push(packname)
						}
					}
					if(lib.config.mode!='connect'){
						for(i=0;i<lib.card.list.length;i++){
							if(lib.card.list[i][2]=='huosha'){
								lib.card.list[i]=lib.card.list[i].slice(0);
								lib.card.list[i][2]='sha';
								lib.card.list[i][3]='fire';
							}
							else if(lib.card.list[i][2]=='leisha'){
								lib.card.list[i]=lib.card.list[i].slice(0);
								lib.card.list[i][2]='sha';
								lib.card.list[i][3]='thunder';
							}
							if(!lib.card[lib.card.list[i][2]]){
								lib.card.list.splice(i,1);i--;
							}
							else if(lib.card[lib.card.list[i][2]].mode&&
								lib.card[lib.card.list[i][2]].mode.contains(lib.config.mode)==false){
								lib.card.list.splice(i,1);i--;
							}
						}
					}

					if(lib.config.mode=='connect'){
						_status.connectMode=true;
					}
					if(window.isNonameServer){
						lib.cheat.i();
					}
					else if(lib.config.dev&&(!_status.connectMode||lib.config.debug)){
						lib.cheat.i();
					}
					lib.config.sort_card=get.sortCard(lib.config.sort);
					delete lib.imported.character;
					delete lib.imported.card;
					delete lib.imported.mode;
					delete lib.imported.play;
					for(var i in lib.init){
						if(i.startsWith('setMode_')){
							delete lib.init[i];
						}
					}
					if(!_status.connectMode){
						for(var i=0;i<lib.extensions.length;i++){
							try{
								_status.extension=lib.extensions[i][0];
								_status.evaluatingExtension=lib.extensions[i][3];
								if (typeof lib.extensions[i][1]=="function") 
									yield (gnc.is.coroutine(lib.extensions[i][1])?gnc.of(lib.extensions[i][1]):lib.extensions[i][1]).call(lib.extensions[i],lib.extensions[i][2],lib.extensions[i][4]);
								if(lib.extensions[i][4]){
									if(lib.extensions[i][4].character){
										for(var j in lib.extensions[i][4].character.character){
											game.addCharacterPack(get.copy(lib.extensions[i][4].character));
											break;
										}
									}
									if(lib.extensions[i][4].card){
										for(var j in lib.extensions[i][4].card.card){
											game.addCardPack(get.copy(lib.extensions[i][4].card));
											break;
										}
									}
									if(lib.extensions[i][4].skill){
										for(var j in lib.extensions[i][4].skill.skill){
											game.addSkill(j,lib.extensions[i][4].skill.skill[j],
											lib.extensions[i][4].skill.translate[j],
											lib.extensions[i][4].skill.translate[j+'_info'],
											lib.extensions[i][4].skill.translate[j+'_append']);
										}
									}
								}
								delete _status.extension;
								delete _status.evaluatingExtension;
							}
							catch(e){
								console.log(e);
							}
						}
					}
					delete lib.extensions;

					if(lib.init.startBefore){
						lib.init.startBefore();
						delete lib.init.startBefore;
					}
					ui.create.arena();
					game.createEvent('game',false).setContent(lib.init.start);
					if(lib.mode[lib.config.mode]&&lib.mode[lib.config.mode].fromextension){
						var startstr=mode[lib.config.mode].start.toString();
						if(startstr.indexOf('onfree')==-1){
							setTimeout(lib.init.onfree,500);
						}
					}
					delete lib.init.start;
					if(Array.isArray(_status.onprepare)&&_status.onprepare.length){
						yield Promise.allSettled(_status.onprepare);
						delete _status.onprepare;
					}
					game.loop();
				})
				var proceed=gnc.of(function*(){
					if(!lib.db){
						try{
							lib.storage=JSON.parse(localStorage.getItem(lib.configprefix+lib.config.mode));
							if(typeof lib.storage!='object') throw('err');
							if(lib.storage==null) throw('err');
						}
						catch(err){
							lib.storage={};
							localStorage.setItem(lib.configprefix+lib.config.mode,"{}");
						}
						yield proceed2();
					}
					else{
						game.getDB('data',lib.config.mode,function(obj){
							lib.storage=obj||{};
							proceed2();
						});
					}
				});
				if(!lib.imported.mode||!lib.imported.mode[lib.config.mode]){
					window.inSplash=true;
					clearTimeout(window.resetGameTimeout);
					delete window.resetGameTimeout;
					var clickedNode=false;
					var clickNode=function(){
						if(clickedNode) return;
						this.classList.add('clicked');
						clickedNode=true;
						lib.config.mode=this.link;
						game.saveConfig('mode',this.link);
						if(this.link=='connect'){
							localStorage.setItem(lib.configprefix+'directstart',true);
							game.reload();
						}
						else{
							if(game.layout!='mobile'&&lib.layoutfixed.indexOf(lib.config.mode)!==-1){
								game.layout='mobile';
								ui.css.layout.href=lib.assetURL+'layout/'+game.layout+'/layout.css';
							}
							else if(game.layout=='mobile'&&lib.config.layout!='mobile'&&lib.layoutfixed.indexOf(lib.config.mode)===-1){
								game.layout=lib.config.layout;
								if(game.layout=='default'){
									ui.css.layout.href='';
								}
								else{
									ui.css.layout.href=lib.assetURL+'layout/'+game.layout+'/layout.css';
								}
							}
							splash.delete(1000);
							delete window.inSplash;
							window.resetGameTimeout=setTimeout(lib.init.reset,10000);
	
							this.listenTransition(function(){
								lib.init.js(lib.assetURL+'mode',lib.config.mode,proceed);
							},500);
						}
					}
					var downNode=function(){
						this.classList.add('glow');
					}
					var upNode=function(){
						this.classList.remove('glow');
					}
					var splash=ui.create.div('#splash',document.body);
					if(lib.config.touchscreen){
						splash.classList.add('touch');
						lib.setScroll(splash);
					}
					if(lib.config.player_border!='wide'){
						splash.classList.add('slim');
					}
					splash.dataset.radius_size=lib.config.radius_size;
					for(var i=0;i<lib.config.all.mode.length;i++){
						var node=ui.create.div('.hidden',splash,clickNode);
						node.link=lib.config.all.mode[i];
						ui.create.div(node,'.splashtext',get.verticalStr(get.translation(lib.config.all.mode[i])));
						if(lib.config.all.stockmode.includes(lib.config.all.mode[i])){
							// 初始启动页设置
							if(lib.config.splash_style==undefined) game.saveConfig('splash_style','style1');
							splash.dataset.splash_style=lib.config.splash_style;
							// 扩展可通过window.splashurl设置素材读取路径
							if(window.splashurl==undefined)window.splashurl='image/splash/';
							if(lib.config.splash_style=='style1'||lib.config.splash_style=='style2'){
								ui.create.div(node,'.avatar').setBackgroundImage('image/splash/'+lib.config.splash_style+'/'+lib.config.all.mode[i]+'.jpg');
							}else{
								ui.create.div(node,'.avatar').setBackgroundImage(splashurl+lib.config.splash_style+'/'+lib.config.all.mode[i]+'.jpg');
							}
						}
						else{
							var avatarnode=ui.create.div(node,'.avatar');
							var avatarbg=lib.mode[lib.config.all.mode[i]].splash;
							if(avatarbg.startsWith('ext:')){
								avatarnode.setBackgroundImage(avatarbg.replace(/^ext:/,'extension/'));
							}
							else{
								avatarnode.setBackgroundDB(avatarbg);
							}
						}
						if(!lib.config.touchscreen){
							node.addEventListener('mousedown',downNode);
							node.addEventListener('mouseup',upNode);
							node.addEventListener('mouseleave',upNode);
						}
						setTimeout((function(node){
							return function(){
								node.show();
							}
						}(node)),i*100);
					}
					if(lib.config.mousewheel){
						splash.onmousewheel=ui.click.mousewheel;
					}
				}
				else{
					yield proceed();
				}
				localStorage.removeItem(lib.configprefix+'directstart');
				delete lib.init.init;
				const libOnload2=lib.onload2;
				delete lib.onload2;
				while(Array.isArray(libOnload2)&&libOnload2.length){
					const fun=libOnload2.shift();
					if(typeof fun!="function") continue;
					yield (gnc.is.generatorFunc(fun)?gnc.of(fun):fun)();
				}
			}),
			startOnline:function(){
				'step 0'
				event._resultid=null;
				event._result=null;
				game.pause();
				'step 1'
				if(result){
					if(event._resultid){
						result.id=event._resultid;
					}
					game.send('result',result);
				}
				event.goto(0);
			},
			onfree:function(){
				if(lib.onfree){
					clearTimeout(window.resetGameTimeout);
					delete window.resetGameTimeout;
					if(!game.syncMenu){
						delete window.resetExtension;
						localStorage.removeItem(lib.configprefix+'disable_extension');
					}

					if(game.removeFile&&lib.config.brokenFile.length){
						while(lib.config.brokenFile.length){
							game.removeFile(lib.config.brokenFile.shift());
						}
						game.saveConfigValue('brokenFile');
					}

					var onfree=lib.onfree;
					delete lib.onfree;
					var loop=function(){
						if(onfree.length){
							(onfree.shift())();
							setTimeout(loop,100);
						}
					};
					setTimeout(loop,500);
					if(!_status.new_tutorial) game.saveConfig('menu_loadondemand',true,lib.config.mode);
				}
			},
			connection:function(ws){
				var client={
					ws:ws,
					id:ws.wsid||get.id(),
					closed:false
				};
				lib.node.clients.push(client);
				for(var i in lib.element.client){
					client[i]=lib.element.client[i];
				}
				if(window.isNonameServer){
					document.querySelector('#server_count').innerHTML=lib.node.clients.length;
				}
				ws.on('message',function(messagestr){
					var message;
					try{
						message=JSON.parse(messagestr);
						if(!Array.isArray(message)||
							typeof lib.message.server[message[0]]!=='function'){
							throw('err');
						}
						for(var i=1;i<message.length;i++){
							message[i]=get.parsedResult(message[i]);
						}
					}
					catch(e){
						console.log(e);
						console.log('invalid message: '+messagestr);
						return;
					}
					lib.message.server[message.shift()].apply(client,message);
				});
				ws.on('close',function(){
					client.close();
				});
				client.send('opened');
			},
			sheet:function(){
				var style=document.createElement('style');
				document.head.appendChild(style);
				for(var i=0;i<arguments.length;i++){
					if(typeof arguments[i]=='string'){
						style.sheet.insertRule(arguments[i],0);
					}
				}
				return style;
			},
			css:(path,file,before)=>{
				const style=document.createElement("link");
				style.rel="stylesheet";
				if(path){
					if(path[path.length-1]=='/') path=path.slice(0,path.length-1);
					if(file) path=`${path}${/^db:extension-[^:]*$/.test(path)?':':'/'}${file}.css`;
					(path.startsWith('db:')?game.getDB('image',path.slice(3)).then(get.objectURL):new Promise(resolve=>resolve(path))).then(resolvedPath=>{
						style.href=resolvedPath;
						if(typeof before=='function'){
							style.addEventListener('load',before);
							document.head.appendChild(style);
						}
						else if(before) document.head.insertBefore(style,before);
						else document.head.appendChild(style);
					});
				}
				return style;
			},
			//在扩展的precontent中调用，用于加载扩展必需的JS文件。
			//If any of the parameters is an Array, corresponding files will be loaded in order
			//如果任意参数为数组，则按顺序加载加载相应的文件
			jsForExtension:(path,file,onLoad,onError)=>{
				if(!_status.javaScriptExtensions) _status.javaScriptExtensions=[];
				_status.javaScriptExtensions.push({
					path:path,
					file:file,
					onLoad:onLoad,
					onError:onError
				});
			},
			js:(path,file,onLoad,onError)=>{
				if(path[path.length-1]=='/') path=path.slice(0,path.length-1);
				if(path==`${lib.assetURL}mode`&&lib.config.all.stockmode.indexOf(file)==-1){
					lib.genAwait(lib.init[`setMode_${file}`]()).then(onLoad);
					return;
				}
				if(Array.isArray(file)){
					file.forEach(value=>lib.init.js(path,value,onLoad,onError));
					return;
				}
				let scriptSource=file?`${path}${/^db:extension-[^:]*$/.test(path)?':':'/'}${file}.js`:path;
				if(path.startsWith('http')) scriptSource+=`?rand=${get.id()}`;
				else if(lib.config.fuck_sojson&&scriptSource.includes('extension')!=-1&&scriptSource.startsWith(lib.assetURL)){
					const pathToRead=scriptSource.slice(lib.assetURL.length);
					const alertMessage=`检测到您安装了使用免费版sojson进行加密的扩展。请谨慎使用这些扩展，避免游戏数据遭到破坏。\n扩展文件：${pathToRead}`;
					if(typeof game.readFileAsText=='function') game.readFileAsText(pathToRead,result=>{
						if(result.includes('sojson')||result.includes('jsjiami')||result.includes('var _0x')) alert(alertMessage);
					},()=>void 0);
					else if(location.origin!='file://') lib.init.reqSync(pathToRead,function(){
						const result = this.responseText;
						if(result.includes('sojson')||result.includes('jsjiami')||result.includes('var _0x')) alert(alertMessage);
					},()=>void 0);
				}
				const script=document.createElement('script');
				(scriptSource.startsWith('db:')?game.getDB('image',scriptSource.slice(3)).then(get.objectURL):new Promise(resolve=>resolve(scriptSource))).then(resolvedScriptSource=>{
					script.src=resolvedScriptSource;
					if(path.startsWith('http')) script.addEventListener('load',()=>script.remove());
					document.head.appendChild(script);
					if(typeof onLoad=='function') script.addEventListener('load',onLoad);
					if(typeof onError=='function') script.addEventListener('error',onError);
				});
				return script;
			},
			/**
			 * 同步lib.init.js
			 * @returns { void }
			 */
			jsSync:(path,file,onLoad,onError)=>{
				if(lib.assetURL.length==0&&location.origin=='file://'&&typeof game.readFile=='undefined'){
					const e=new Error('浏览器file协议下无法使用此api，请在http/https协议下使用此api');
					if(typeof onError=='function') onError(e);
					else throw e;
					return;
				}
				if(path[path.length-1]=='/') path=path.slice(0,path.length-1);
				if(path==`${lib.assetURL}mode`&&lib.config.all.stockmode.indexOf(file)==-1){
					lib.genAwait(lib.init[`setMode_${file}`]()).then(onLoad);
					return;
				}
				if(Array.isArray(file)){
					return file.forEach(value=>lib.init.js(path,value,onLoad,onError));
				}
				let scriptSource;
				if(!file) scriptSource=path;
				else scriptSource=`${path}/${file}.js`;
				if(path.startsWith('http')) scriptSource+=`?rand=${get.id()}`;
				const xmlHttpRequest=new XMLHttpRequest();
				let data;
				xmlHttpRequest.addEventListener("load",()=>{
					data=xmlHttpRequest.responseText;
					if(!data) {
						if(typeof onError=='function') onError(new Error(`${scriptSource}加载失败！`));
						return;
					}
					if(lib.config.fuck_sojson&&scriptSource.includes('extension')!=-1&&scriptSource.startsWith(lib.assetURL)){
						const pathToRead=scriptSource.slice(lib.assetURL.length);
						if(data.includes('sojson')||data.includes('jsjiami')||data.includes('var _0x')) alert(`检测到您安装了使用免费版sojson进行加密的扩展。请谨慎使用这些扩展，避免游戏数据遭到破坏。\n扩展文件：${pathToRead}`);
					}
					try{
						window.eval(data);
						if(typeof onLoad=='function') onLoad();
					}
					catch(error){
						if(typeof onError=='function') onError(error);
					}
				});
				if(typeof onError=='function') xmlHttpRequest.addEventListener("error",onError);
				xmlHttpRequest.open("GET",scriptSource,false);
				xmlHttpRequest.send();
			},
			req:(str,onload,onerror,master)=>{
				let sScriptURL;
				if(str.startsWith('http')) sScriptURL=str;
				else if(str.startsWith('local:')){
					if(lib.assetURL.length==0&&location.origin=='file://'&&typeof game.readFile=='undefined'){
						const e=new Error('浏览器file协议下无法使用此api，请在http/https协议下使用此api');
						if(typeof onerror=='function') onerror(e);
						else throw e;
						return;
					}
					sScriptURL=lib.assetURL+str.slice(6);
				}
				else{
					let url=get.url(master);
					if(url[url.length-1]!='/') url+='/';
					sScriptURL=url+str;
				}
				const oReq=new XMLHttpRequest();
				if(typeof onload=='function') oReq.addEventListener("load",onload);
				if(typeof onerror=='function') oReq.addEventListener("error",onerror);
				oReq.open("GET",sScriptURL);
				oReq.send();
			},
			/**
			 * 同步lib.init.req
			 */
			reqSync:(str,onload,onerror,master)=>{
				let sScriptURL;
				if(str.startsWith('http')) sScriptURL=str;
				else if(str.startsWith('local:')){
					if(lib.assetURL.length==0&&location.origin=='file://'&&typeof game.readFile=='undefined'){
						const e=new Error('浏览器file协议下无法使用此api，请在http/https协议下使用此api');
						if(typeof onerror=='function') onerror(e);
						else throw e;
						return;
					}
					sScriptURL=lib.assetURL+str.slice(6);
				}
				else{
					let url=get.url(master);
					if(url[url.length-1]!='/')url+='/';
					sScriptURL=url+str;
				}
				const oReq=new XMLHttpRequest();
				if(typeof onload=='function') oReq.addEventListener("load",onload);
				if(typeof onerror=='function') oReq.addEventListener("error",onerror);
				oReq.open("GET",sScriptURL,false);
				oReq.send();
				if(typeof onload!=='function') return oReq.responseText;
			},
			json:(url,onload,onerror)=>{
				const oReq=new XMLHttpRequest();
				if(typeof onload=='function') oReq.addEventListener("load",()=>{
					let result;
					try{
						result=JSON.parse(oReq.responseText);
						if(!result) throw('err');
					}
					catch(e){
						if(typeof onerror=='function') onerror(e);
						return;
					}
					onload(result);
				});
				if(typeof onerror=='function') oReq.addEventListener("error",onerror);
				oReq.open("GET",url);
				oReq.send();
			},
			/**
			 * 同步lib.init.json
			 */
			jsonSync:(url,onload,onerror)=>{
				if(lib.assetURL.length==0&&location.origin=='file://'&&typeof game.readFile=='undefined'){
					const e=new Error('浏览器file协议下无法使用此api，请在http/https协议下使用此api');
					if(typeof onerror=='function') onerror(e);
					else throw e;
					return;
				}
				const oReq=new XMLHttpRequest();
				if(typeof onload=='function') oReq.addEventListener("load",()=>{
					let result;
					try{
						result=JSON.parse(oReq.responseText);
						if(!result) throw('err');
					}
					catch(e){
						if(typeof onerror=='function') onerror(e);
						return;
					}
					onload(result);
				});
				if(typeof onerror=='function') oReq.addEventListener("error",onerror);
				oReq.open("GET",url,false);
				oReq.send();
			},
			cssstyles:function(){
				if(ui.css.styles){
					ui.css.styles.remove();
				}
				ui.css.styles=lib.init.sheet();
				ui.css.styles.sheet.insertRule('#arena .player>.name,#arena .button.character>.name {font-family: '+(lib.config.name_font||'xinwei')+',xinwei}',0);
				ui.css.styles.sheet.insertRule('#arena .player>.name,.button.character>.name {font-family: '+(lib.config.name_font||'xinwei')+',xinwei}',0);
				ui.css.styles.sheet.insertRule('#arena .player .identity>div {font-family: '+(lib.config.identity_font||'huangcao')+',xinwei}',0);
				ui.css.styles.sheet.insertRule('.button.character.newstyle>.identity {font-family: '+(lib.config.identity_font||'huangcao')+',xinwei}',0);
				if(lib.config.cardtext_font&&lib.config.cardtext_font!='default'){
					ui.css.styles.sheet.insertRule('.card div:not(.info):not(.background) {font-family: '+lib.config.cardtext_font+';}',0);
				}
				if(lib.config.global_font&&lib.config.global_font!='default'){
					ui.css.styles.sheet.insertRule('#window {font-family: '+lib.config.global_font+',xinwei}',0);
					ui.css.styles.sheet.insertRule('#window #control{font-family: STHeiti,SimHei,Microsoft JhengHei,Microsoft YaHei,WenQuanYi Micro Hei,Suits,Helvetica,Arial,sans-serif}',0);
				}
				switch(lib.config.glow_phase){
					case 'yellow':ui.css.styles.sheet.insertRule('#arena .player:not(.selectable):not(.selected).glow_phase {box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 1px, rgb(217, 152, 62) 0 0 15px, rgb(217, 152, 62) 0 0 15px !important;}',0);break;
					case 'green':ui.css.styles.sheet.insertRule('#arena .player:not(.selectable):not(.selected).glow_phase {box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 1px, rgba(10, 155, 67, 1) 0 0 15px, rgba(10, 155, 67, 1) 0 0 15px !important;}',0);break;
					case 'purple':ui.css.styles.sheet.insertRule('#arena .player:not(.selectable):not(.selected).glow_phase {box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 1px, rgb(189, 62, 170) 0 0 15px, rgb(189, 62, 170) 0 0 15px !important;}',0);break;
				}
			},
			layout:function(layout,nosave){
				if(layout=='default') layout='mobile';
				if(!nosave) game.saveConfig('layout',layout);
				game.layout=layout;
				ui.arena.hide();
				setTimeout(function(){
					if(game.layout=='default'){
						ui.css.layout.href='';
					}
					else{
						ui.css.layout.href=lib.assetURL+'layout/'+game.layout+'/layout.css';
					}
					if(game.layout=='mobile'||game.layout=='long'){
						ui.arena.classList.add('mobile');
					}
					else{
						ui.arena.classList.remove('mobile');
					}
					if(game.layout=='mobile'||game.layout=='long'||game.layout=='long2'||game.layout=='nova'){
						if(game.me&&game.me.node.handcards2.childNodes.length){
							while(game.me.node.handcards2.childNodes.length){
								game.me.node.handcards1.appendChild(game.me.node.handcards2.firstChild);
							}
						}
					}
					if(game.layout=='default'){
						ui.arena.classList.add('oldlayout');
					}
					else{
						ui.arena.classList.remove('oldlayout');
					}
					if(lib.config.cardshape=='oblong'&&(game.layout=='long'||game.layout=='mobile'||game.layout=='long2'||game.layout=='nova')){
						ui.arena.classList.add('oblongcard');
						ui.window.classList.add('oblongcard');
					}
					else{
						ui.arena.classList.remove('oblongcard');
						ui.window.classList.remove('oblongcard');
					}
					//if(lib.config.textequip=='text'&&(game.layout=='long'||game.layout=='mobile')){
					if(game.layout=='long'||game.layout=='mobile'){
						ui.arena.classList.add('textequip');
					}
					else{
						ui.arena.classList.remove('textequip');
					}
					if(get.is.phoneLayout()){
						ui.css.phone.href=lib.assetURL+'layout/default/phone.css';
						ui.arena.classList.add('phone');
					}
					else{
						ui.css.phone.href='';
						ui.arena.classList.remove('phone');
					}
					for(var i=0;i<game.players.length;i++){
						if(get.is.linked2(game.players[i])){
							if(game.players[i].classList.contains('linked')){
								game.players[i].classList.remove('linked');
								game.players[i].classList.add('linked2');
							}
						}
						else{
							if(game.players[i].classList.contains('linked2')){
								game.players[i].classList.remove('linked2');
								game.players[i].classList.add('linked');
							}
						}
					}
					if(game.layout=='long'||game.layout=='long2'){
						ui.arena.classList.add('long');
					}
					else{
						ui.arena.classList.remove('long');
					}
					if(lib.config.player_border!='wide'||game.layout=='long'||game.layout=='long2'){
						ui.arena.classList.add('slim_player');
					}
					else{
						ui.arena.classList.remove('slim_player');
					}
					if(lib.config.player_border=='normal'&&lib.config.mode!='brawl'&&(game.layout=='long'||game.layout=='long2')){
						ui.arena.classList.add('lslim_player');
					}
					else{
						ui.arena.classList.remove('lslim_player');
					}
					if(lib.config.player_border=='slim'){
						ui.arena.classList.add('uslim_player');
					}
					else{
						ui.arena.classList.remove('uslim_player');
					}
					if(lib.config.player_border=='narrow'){
						ui.arena.classList.add('mslim_player');
					}
					else{
						ui.arena.classList.remove('mslim_player');
					}
					ui.updatej();
					ui.updatem();
					setTimeout(function(){
						ui.arena.show();
						if(game.me) game.me.update();
						setTimeout(function(){
							ui.updatex();
						},500);
						setTimeout(function(){
							ui.updatec();
						},1000);
					},100);
				},500);
			},
			background:function(){
				if(lib.config.image_background_random){
					var list=[];
					for(var i in lib.configMenu.appearence.config.image_background.item){
						if(i=='default') continue;
						list.push(i);
					}
					list.remove(lib.config.image_background);
					localStorage.setItem(lib.configprefix+'background',JSON.stringify(list));
				}
				else if(lib.config.image_background&&lib.config.image_background!='default'&&!lib.config.image_background.startsWith('custom_')){
					localStorage.setItem(lib.configprefix+'background',lib.config.image_background);
				}
				else if(lib.config.image_background=='default'&&lib.config.theme=='simple'){
					localStorage.setItem(lib.configprefix+'background','ol_bg');
				}
				else{
					localStorage.removeItem(lib.configprefix+'background');
				}
			},
			parsex:function(item){
				//by 诗笺、Tipx-L
				function Legacy(func){
					//Remove all comments
					//移除所有注释
					var str=func.toString().replace(/((?:(?:^[ \t]*)?(?:\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\/(?:[ \t]*\r?\n(?=[ \t]*(?:\r?\n|\/\*|\/\/)))?|\/\/(?:[^\\]|\\(?:\r?\n)?)*?(?:\r?\n(?=[ \t]*(?:\r?\n|\/\*|\/\/))|(?=\r?\n))))+)|("(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|(?:\r?\n|[\s\S])[^\/"'\\\s]*)/mg,'$2').trim();
					//获取第一个 { 后的所有字符
					str=str.slice(str.indexOf('{')+1);
					//func中要写步骤的话，必须要写step 0
					if(str.indexOf('step 0')==-1){
						str='{if(event.step==1) {event.finish();return;}\n'+str;
					}else{
						var skip=0;
						//每层最多找99个step
						for (var k=0;k<99;k++) {
							//正则表达式
							var reg=new RegExp(`['"]step ${k}['"]`);
							var result=str.slice(skip).match(reg);
							if(result==null) break;
							var insertStr;
							if(k==0){
								insertStr=`switch(step){case 0:`;
							}else{
								insertStr=`break;case ${k}:`;
							}
							var copy=str;
							copy=copy.slice(0,skip+result.index)+insertStr+copy.slice(skip+result.index+result[0].length);
							//测试是否有错误
							try{
								new Function(copy);
								str=copy;
								skip+=result.index+insertStr.length;
							}catch(error){
								k--;
								skip+=result.index+result[0].length;
							}
						}
						str=`if(event.step==${k}){event.finish();return;}`+str;
					}
					return (new Function('event','step','source','player','target','targets',
						'card','cards','skill','forced','num','trigger','result',
						'_status','lib','game','ui','get','ai',str));
				}
				switch(typeof item){
					case "object":
						if(Array.isArray(item)){
							let lastEvent=null;
							return (event,step,source,player,target,targets,card,cards,skill,forced,num,trigger,result,_status,lib,game,ui,get,ai)=>{
								if(step>=item.length) return event.finish();
								var current=item[step];
								lastEvent=current(event,{
									event:event,
									step:step,
									source:source,
									player:player,
									target:target,
									targets:targets,
									card:card,
									cards:cards,
									skill:skill,
									forced:forced,
									num:num,
									trigger:trigger,
									result:result
								},(lastEvent&&("result" in lastEvent))?lastEvent.result:null);
							}
						}
						else{
							if(Symbol.iterator in item) return lib.init.parsex(Array.from(item));
							if("toString" in item) return lib.init.parsex(item.toString());
							if("render" in item) {
								// TODO: Object Render Parse
								throw new Error("NYI: Object Render Parse");
							}
							// TODO: Object Other Parse
							throw new Error("NYI: Object Other Parse");
						}
					case "function":
						if (gnc.is.generatorFunc(item)) {
							let gen,lastEvent;
							return (event,step,source,player,target,targets,card,cards,skill,forced,num,trigger,result,_status,lib,game,ui,get,ai)=>{
								if(!gen)gen=item(event,{
									event:event,
									step:step,
									source:source,
									player:player,
									target:target,
									targets:targets,
									card:card,
									cards:cards,
									skill:skill,
									forced:forced,
									num:num,
									trigger:trigger,
									result:result
								});
								var res=gen.next((lastEvent&&("result" in lastEvent))?lastEvent.result:null);
								if(res.done) event.finish();
								else lastEvent=res.value;
							}
						}
					default:
						return Legacy(item);
				}
			},
			eval:function(func){
				if(typeof func=='function'){
					return eval('('+func.toString()+')');
				}
				else if(typeof func=='object'){
					for(var i in func){
						if(func.hasOwnProperty(i)){
							func[i]=lib.init.eval(func[i]);
						}
					}
				}
				return func;
			},
			encode:function(strUni){
				var strUtf = strUni.replace(
					/[\u0080-\u07ff]/g,function(c){
					var cc = c.charCodeAt(0);
					return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f);
				});
				strUtf = strUtf.replace(
					/[\u0800-\uffff]/g,function(c) {
					var cc = c.charCodeAt(0);
					return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f);
				});
				return btoa(strUtf);
			},
			decode:function(str){
				var strUtf=atob(str);
				var strUni = strUtf.replace(
					/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(c) {
					var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f);
					return String.fromCharCode(cc);
				});
				strUni = strUni.replace(
					/[\u00c0-\u00df][\u0080-\u00bf]/g,function(c){
					var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
					return String.fromCharCode(cc);
				});
				return strUni;
			},
			stringify:function(obj){
				var str='{'
				for(var i in obj){
					str+='"'+i+'":'
					if(Object.prototype.toString.call(obj[i])=='[object Object]'){
						str+=lib.init.stringify(obj[i]);
					}
					else if(typeof obj[i]=='function'){
						str+=obj[i].toString();
					}
					else{
						str+=JSON.stringify(obj[i]);
					}
					str+=','
				}
				str+='}';
				return str;
			},
			stringifySkill:function(obj){
				var str='';
				for(var i in obj){
					str+=i+':'
					if(Object.prototype.toString.call(obj[i])=='[object Object]'){
						str+='{\n'+lib.init.stringifySkill(obj[i])+'}';
					}
					else if(typeof obj[i]=='function'){
						str+=obj[i].toString().replace(/\t/g,'');
					}
					else{
						str+=JSON.stringify(obj[i]);
					}
					str+=',\n'
				}
				return str;
			}
		},
		cheat:{
			i:function(){
				window.cheat=lib.cheat;
				window.game=game;
				window.ui=ui;
				window.get=get;
				window.ai=ai;
				window.lib=lib;
				window._status=_status;
			},
			dy:function(){
				var next=game.me.next;
				for(var i=0;i<10;i++){
					if(next.identity!='zhu'){
						break;
					}
					next=next.next;
				}
				next.die();
			},
			x:function(){
				var gl=function(dir,callback){
					var files=[],folders=[];
					dir='/Users/widget/Documents/extension/'+dir;
					lib.node.fs.readdir(dir,function(err,filelist){
						for(var i=0;i<filelist.length;i++){
							if(filelist[i][0]!='.'&&filelist[i][0]!='_'){
								if(lib.node.fs.statSync(dir+'/'+filelist[i]).isDirectory()){
									folders.push(filelist[i]);
								}
								else{
									files.push(filelist[i]);
								}
							}
						}
						callback(folders,files);
					});
				}
				var args=Array.from(arguments);
				for(var i=0;i<args.length;i++){
					args[i]=args[i][0];
				}
				gl('',function(list){
					if(args.length){
						for(var i=0;i<list.length;i++){
							if(!args.contains(list[i][0])){
								list.splice(i--,1);
							}
						}
					}
					if(list.length){
						for(var i=0;i<list.length;i++){
							(function(str){
								gl(str,function(folders,files){
									if(files.length>1){
										for(var i=0;i<files.length;i++){
											if(files[i].includes('extension.js')){
												files.splice(i--,1);
											}
											else{
												if(i%5==0){
													str+='\n\t\t\t';
												}
												str+='"'+files[i]+'",';
											}
										}
										console.log(str.slice(0,str.length-1));
									}
								});
							}(list[i]));
						}
					}
				});
			},
			cfg:function(){
				var mode=lib.config.all.mode.slice(0);
				mode.remove('connect');
				mode.remove('brawl');
				var banned=['shen_guanyu','shen_caocao','caopi','re_daqiao','caorui',
					'daqiao','lingcao','liuzan','lusu','luxun','yanwen','zhouyu','ns_wangyue','gw_yenaifa',
					'old_caozhen','swd_jiangziya','xuhuang','maliang','guojia','simayi','swd_kangnalishi','hs_siwangzhiyi','hs_nozdormu','old_zhuzhi'];
				var bannedcards=['zengbin'];
				var favs=["hs_tuoqi","hs_siwangxianzhi","hs_xukongzhiying","hs_hsjiasha","gjqt_xieyi","gjqt_yunwuyue","gjqt_beiluo",
					"gjqt_cenying","shen_lvmeng","shen_zhaoyun","shen_zhugeliang","ow_ana","chenlin","ns_guanlu","hs_guldan","swd_guyue",
					"pal_jiangyunfan","mtg_jiesi","swd_lanyin","pal_liumengli","swd_muyun","pal_nangonghuang","swd_muyue","pal_murongziying",
					"swd_qiner","pal_shenqishuang","hs_taisi","wangji","pal_xingxuan","xunyou","hs_yelise","pal_yuejinzhao","pal_yueqi",
					"gjqt_yuewuyi","swd_yuxiaoxue","ow_zhaliya","zhangchunhua","hs_zhihuanhua","swd_zhiyin","old_zhonghui","gjqt_bailitusu",
					"hs_barnes","ow_dva","swd_hengai","pal_jushifang","hs_kazhakusi","hs_lafamu","ow_liekong","hs_lreno","pal_mingxiu",
					"swd_murongshi","gw_oudimu","gjqt_ouyangshaogong","hs_pyros","qinmi","gw_sanhanya","hs_selajin","swd_shuwaner",
					"swd_situqiang","hs_xialikeer","pal_xuejian","swd_yuchiyanhong","swd_yuwentuo","swd_zhaoyun","zhugeliang","gw_aigeleisi",
					"gw_aimin","gjqt_aruan","hs_aya","swd_cheyun","swd_chenjingchou","gw_diandian","swd_huzhongxian","hs_jinglinglong",
					"hs_kaituozhe","hs_kalimosi","gw_linjing","ow_luxiao","re_luxun","hs_morgl","swd_sikongyu","hs_sthrall","sunquan",
					"sunshangxiang","gw_yioufeisisp","gw_yisilinni","hs_yogg","hs_ysera","pal_yuntianhe","zhugejin","zhugeke","gw_zhuoertan",
					"hs_anduin","swd_anka","ow_banzang","ow_chanyata","diaochan","swd_duguningke","sp_diaochan","hetaihou","ns_huamulan",
					"swd_huanglei","swd_huanyuanzhi","re_huatuo","gw_huoge","pal_jiangcheng","yj_jushou","swd_kendi","yxs_libai",
					"mtg_lilianna","xin_liru","liuxie","pal_lixiaoyao","pal_longkui","ns_nanhua","swd_qi","swd_septem","gw_shasixiwusi",
					"ow_tianshi","swd_weida","gjqt_xiayize","swd_xiyan","hs_xsylvanas","hs_yelinlonghou","ow_yuanshi","zuoci"];
				var vintage=['tianjian','shuiyun','zhuyue','zhimeng','poyun','qianfang','xfenxin','danqing','ywuhun','tianwu','xuelu',
					'shahun','yuling','duhun','liaoyuan','touxi','wangchen','poyue','kunlunjing','huanhun','yunchou','tuzhen','cyqiaoxie',
					'mufeng','duanyi','guozao','yaotong','pozhen','tanlin','susheng','jikong','shouyin','jilve','hxunzhi','huodan','shanxian',
					'ziyu','kuoyin','feiren','zihui','jidong','baoxue','aqianghua','maoding','bfengshi','zhongdun','pingzhang','maichong',
					'guozai','jingxiang','yuelu','liechao','fengnu','hanshuang','enze','malymowang','xshixin','qingzun'];
				var favmodes=["versus|three", "versus|four", "versus|two", "chess|combat"];
				for(var i=0;i<mode.length;i++){
					game.saveConfig(mode[i]+'_banned',banned);
					game.saveConfig(mode[i]+'_bannedcards',bannedcards);
				}
				var characters=lib.config.all.characters.slice(0);
				characters.remove('standard');
				characters.remove('old');
				game.saveConfig('vintageSkills', vintage);
				game.saveConfig('favouriteCharacter',favs);
				game.saveConfig('favouriteMode',favmodes);
				game.saveConfig('theme','simple');
				game.saveConfig('player_border', 'slim');
				game.saveConfig('cards',lib.config.all.cards);
				game.saveConfig('characters',characters);
				game.saveConfig('change_skin',false);
				game.saveConfig('show_splash','off');
				game.saveConfig('show_favourite',false);
				game.saveConfig('animation', false);
				game.saveConfig('hover_all', false);
				game.saveConfig('asset_version', 'v1.9');
				// game.saveConfig('characters',lib.config.all.characters);
				// game.saveConfig('cards',lib.config.all.cards);
				game.saveConfig('plays',['cardpile']);
				game.saveConfig('skip_shan',false);
				game.saveConfig('tao_enemy',true);
				game.saveConfig('layout','long2');
				game.saveConfig('hp_style','ol');
				game.saveConfig('background_music','music_off');
				game.saveConfig('background_audio',false);
				game.saveConfig('background_speak',false);
				game.saveConfig('show_volumn',false);
				game.saveConfig('show_replay',true);
				game.saveConfig('autostyle',true);
				game.saveConfig('debug',true);
				game.saveConfig('dev',true);
				if(!lib.device){
					game.saveConfig('sync_speed',false);
				}
				game.reload();
			},
			o:function(){
				ui.arena.classList.remove('observe');
			},
			pt:function(){
				var list=Array.from(arguments);
				while(list.length){
					var card=cheat.gn(list.pop());
					if(card) ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
				}
			},
			q:function(){
				// if(lib.config.layout!='mobile') lib.init.layout('mobile');
				if(arguments.length==0){
					var style=ui.css.card_style;
					if(lib.config.card_style!='simple'){
						lib.config.card_style='simple';
						ui.css.card_style=lib.init.css(lib.assetURL+'theme/style/card','simple');
					}
					else{
						lib.config.card_style='default';
						ui.css.card_style=lib.init.css(lib.assetURL+'theme/style/card','default');
					}
					style.remove();
				}
				else{
					for(var i=0;i<arguments.length;i++){
						cheat.g(arguments[i]);
					}
				}
				ui.arena.classList.remove('selecting');
				ui.arena.classList.remove('tempnoe');
			},
			p:function(name,i,skin){
				var list=['swd','hs','pal','gjqt','ow','gw'];
				if(!lib.character[name]){
					for(var j=0;j<list.length;j++){
						if(lib.character[list[j]+'_'+name]){
							name=list[j]+'_'+name;break;
						}
					}
				}
				if(skin){
					lib.config.skin[name]=skin
				}
				var target;
				if(typeof i=='number'){
					target=game.players[i];
				}
				else{
					target=game.me.next;
				}
				if(!lib.character[name]){
					target.node.avatar.setBackground(name,'character');
					target.node.avatar.show();
				}
				else{
					target.init(name);
				}
				if(i===true){
					if(lib.config.layout=='long2'){
						lib.init.layout('mobile');
					}
					else{
						lib.init.layout('long2');
					}
				}
			},
			e:function(){
				var cards=[],target;
				for(var i=0;i<arguments.length;i++){
					if(get.itemtype(arguments[i])=='player'){
						target=arguments[i];
					}
					else{
						cards.push(game.createCard(arguments[i]));
					}
				}
				if(!cards.length){
					cards.push(game.createCard('qilin'));
					cards.push(game.createCard('bagua'));
					cards.push(game.createCard('dilu'));
					cards.push(game.createCard('chitu'));
					cards.push(game.createCard('muniu'));
				}
				target=target||game.me;
				for(var i=0;i<cards.length;i++){
					var card=target.getEquip(cards[i]);
					if(card){
						card.discard();
						target.removeEquipTrigger(card);
					}
					target.$equip(cards[i]);
				}
			},
			c:function(){
				(function(){
					var a=0,b=0,c=0,d=0,e=0,f=0,g=0;
					var sa=0,sb=0,sc=0,sd=0,se=0,sf=0,sg=0;
					for(var i in lib.character){
						switch(lib.character[i][1]){
							case 'wei':a++;if(lib.config.banned.contains(i)) sa++;break;
							case 'shu':b++;if(lib.config.banned.contains(i)) sb++;break;
							case 'wu':c++;if(lib.config.banned.contains(i)) sc++;break;
							case 'qun':d++;if(lib.config.banned.contains(i)) sd++;break;
							case 'jin':g++;if(lib.config.banned.contains(i)) sg++;break;
							case 'western':e++;if(lib.config.banned.contains(i)) se++;break;
							case 'key':f++;if(lib.config.banned.contains(i)) sf++;break;
						}
					}
					console.log('魏：'+(a-sa)+'/'+a);
					console.log('蜀：'+(b-sb)+'/'+b);
					console.log('吴：'+(c-sc)+'/'+c);
					console.log('群：'+(d-sd)+'/'+d);
					console.log('晋：'+(g-sg)+'/'+g);
					console.log('西：'+(e-se)+'/'+e);
					console.log('键：'+(f-sf)+'/'+f);
					console.log('已启用：'+((a+b+c+d+e+f)-(sa+sb+sc+sd+se+sf))+'/'+(a+b+c+d+e+f));
				}());
				(function(){
					var a=0,b=0,c=0,d=0;
					var aa=0,bb=0,cc=0,dd=0;
					var sa=0,sb=0,sc=0,sd=0;
					var sha=0,shan=0,tao=0,jiu=0,wuxie=0,heisha=0,hongsha=0;
					var num={1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0};
					for(var i in lib.card){
						if(get.objtype(lib.card[i])=='object'&&lib.translate[i+'_info']){
							switch(lib.card[i].type){
								case 'basic':a++;break;
								case 'trick':b++;break;
								case 'equip':c++;break;
								default:d++;break;
							}
						}
					}
					for(var i=0;i<lib.card.list.length;i++){
						if(typeof lib.card[lib.card.list[i][2]]=='object'){
							switch(lib.card[lib.card.list[i][2]].type){
								case 'basic':aa++;break;
								case 'trick':case 'delay':bb++;break;
								case 'equip':cc++;break;
								default:dd++;break;
							}
							switch(lib.card.list[i][0]){
								case 'heart':sa++;break;
								case 'diamond':sb++;break;
								case 'club':sc++;break;
								case 'spade':sd++;break;
							}
							if(lib.card.list[i][2]=='sha'){
								sha++;
								if(lib.card.list[i][0]=='club'||lib.card.list[i][0]=='spade'){
									heisha++;
								}
								else{
									hongsha++;
								}
							}
							if(lib.card.list[i][2]=='shan'){
								shan++;
							}
							if(lib.card.list[i][2]=='tao'){
								tao++;
							}
							if(lib.card.list[i][2]=='jiu'){
								jiu++;
							}
							if(lib.card.list[i][2]=='wuxie'){
								wuxie++;
							}
							num[lib.card.list[i][1]]++;
						}
					}
					var str='基本牌'+aa+'； '+'锦囊牌'+bb+'； '+'装备牌'+cc+'； '+'其它牌'+dd
					console.log(str);
					str='红桃牌'+sa+'； '+'方片牌'+sb+'； '+'梅花牌'+sc+'； '+'黑桃牌'+sd
					console.log(str);
					str='杀'+sha+'； '+'黑杀'+heisha+'； '+'红杀'+hongsha+'； '+'闪'+shan+'； '+'桃'+tao+'； '+'酒'+jiu+'； '+'无懈'+wuxie
					console.log(str);
					if(arguments[1]){
						for(var i=1;i<=13;i++){
							if(i<10){
								console.log(i+' ',num[i]);
							}
							else{
								console.log(i,num[i]);
							}
						}
					}
					var arr=[];
					for(var i=1;i<=13;i++){
						arr.push(num[i]);
					}
					console.log((a+b+c+d)+'/'+(aa+bb+cc+dd),...arr)
				}());
			},
			id:function(){
				game.showIdentity();
			},
			b:function(){
				if(!ui.dialog||!ui.dialog.buttons) return;
				for(var i=0;i<Math.min(arguments.length,ui.dialog.buttons.length);i++){
					ui.dialog.buttons[i].link=arguments[i];
				}
			},
			uy:function(me){
				if(me){
					game.me.useCard({name:'spell_yexinglanghun'},game.me);
				}
				else{
					var enemy=game.me.getEnemy();
					enemy.useCard({name:'spell_yexinglanghun'},enemy);
				}
			},
			gs:function(name,act){
				var card=game.createCard('spell_'+(name||'yexinglanghun'));
				game.me.node.handcards1.appendChild(card);
				if(!act){
					game.me.actused=-99;
				}
				ui.updatehl();
				delete _status.event._cardChoice;
				delete _status.event._targetChoice;
				delete _status.event._skillChoice;
				setTimeout(game.check,300);
			},
			gc:function(name,act){
				var card=game.createCard('stone_'+(name||'falifulong')+'_stonecharacter');
				game.me.node.handcards1.appendChild(card);
				if(!act){
					game.me.actused=-99;
				}
				ui.updatehl();
				delete _status.event._cardChoice;
				delete _status.event._targetChoice;
				delete _status.event._skillChoice;
				setTimeout(game.check,300);
			},
			a:function(bool){
				if(lib.config.test_game){
					game.saveConfig('test_game');
				}
				else{
					if(bool){
						if(typeof bool==='string'){
							game.saveConfig('test_game',bool);
						}
						else{
							game.saveConfig('test_game','_');
						}
					}
					else{
						game.saveConfig('test_game',true);
					}
				}
				game.reload();
			},
			as:function(){
				ui.window.classList.remove('testing');
				var bg=ui.window.querySelector('.pausedbg');
				if(bg){
					bg.remove();
				}
			},
			uj:function(){
				cheat.e('qilin');
				game.me.next.useCard({name:'jiedao'},[game.me,game.me.previous]);
			},
			u:function(){
				var card={name:'sha'},source=game.me.next,targets=[];
				for(var i=0;i<arguments.length;i++){
					if(get.itemtype(arguments[i])=='player'){
						source=arguments[i];
					}
					else if(Array.isArray(arguments[i])){
						targets=arguments[i];
					}
					else if(typeof arguments[i]=='object'&&arguments[i]){
						card=arguments[i];
					}
					else if(typeof arguments[i]=='string'){
						card={name:arguments[i]}
					}
				}
				if(!targets.length) targets.push(game.me);
				source.useCard(game.createCard(card.name,card.suit,card.number,card.nature),targets);
			},
			r:function(bool){
				var list=['s','ap','a','am','bp','b','bm','c','d'];
				var str='';
				for(var i=0;i<list.length;i++){
					if(str) str+=' 、 ';
					str+=list[i]+'-'+lib.rank[list[i]].length;
				}
				console.log(str);
				for(var i in lib.characterPack){
					if(!bool&&lib.config.all.sgscharacters.contains(i)) continue;
					var map={};
					var str='';
					for(var j in lib.characterPack[i]){
						var rank=get.rank(j);
						if(!map[rank]){
							map[rank]=1;
						}
						else{
							map[rank]++;
						}
					}
					for(var j=0;j<list.length;j++){
						if(map[list[j]]){
							if(str) str+=' 、 ';
							str+=list[j]+'-'+map[list[j]];
						}
					}
					if(str){
						console.log(lib.translate[i+'_character_config']+'：'+str);
					}
				}

				var list=lib.rank.s.concat(lib.rank.ap).concat(lib.rank.a).concat(lib.rank.am).
					concat(lib.rank.bp).concat(lib.rank.b).concat(lib.rank.bm).concat(lib.rank.c).concat(lib.rank.d);
				Object.keys(lib.character).forEach(key=>{
					if(!lib.config.forbidai.includes(key)&&!key.startsWith('boss_')&&!key.startsWith('tafang_')&&!list.includes(key)) console.log(get.translation(key),key);
				});
			},
			h:function(player){
				console.log(get.translation(player.getCards('h')));
			},
			g:function(){
				for(var i=0;i<arguments.length;i++){
					if(i>0&&typeof arguments[i]=='number'){
						for(var j=0;j<arguments[i]-1;j++){
							cheat.gx(arguments[i-1]);
						}
					}
					else{
						cheat.gx(arguments[i]);
					}
				}
			},
			ga:function(type){
				for(var i in lib.card){
					if(lib.card[i].type==type||lib.card[i].subtype==type){
						cheat.g(i);
					}
				}
			},
			gg:function(){
				for(var i=0;i<game.players.length;i++){
					for(var j=0;j<arguments.length;j++){
						cheat.gx(arguments[j],game.players[i]);
					}
				}
			},
			gx:function(name,target){
				target=target||game.me;
				var card=cheat.gn(name);
				if(!card) return;
				target.node.handcards1.appendChild(card);
				delete _status.event._cardChoice;
				delete _status.event._targetChoice;
				delete _status.event._skillChoice;
				game.check();
				target.update();
				ui.updatehl();
			},
			gn:function(name){
				var nature=null;
				var suit=null;
				var suits=['club','spade','diamond','heart'];
				for(var i=0;i<suits.length;i++){
					if(name.startsWith(suits[i])){
						suit=suits[i];
						name=name.slice(suits[i].length);
						break;
					}
				}
				if(name.startsWith('red')){
					name=name.slice(3);
					suit=['diamond','heart'].randomGet();
				}
				if(name.startsWith('black')){
					name=name.slice(5);
					suit=['spade','club'].randomGet();
				}

				if(name=='huosha'){
					name='sha';
					nature='fire';
				}
				else if(name=='leisha'){
					name='sha';
					nature='thunder';
				}
				if(!lib.card[name]){
					return null;
				}
				return game.createCard(name,suit,null,nature);
			},
			ge:function(target){
				if(target){
					cheat.gx('zhuge',target);
					cheat.gx('qinglong',target);
					cheat.gx('bagua',target);
					cheat.gx('dilu',target);
					cheat.gx('chitu',target);
					cheat.gx('muniu',target);
				}
				else{
					cheat.g('zhuge');
					cheat.g('qinglong');
					cheat.g('bagua');
					cheat.g('dilu');
					cheat.g('chitu');
					cheat.g('muniu');
				}
			},
			gj:function(){
				cheat.g('shandian');
				cheat.g('huoshan');
				cheat.g('hongshui');
				cheat.g('lebu');
				cheat.g('bingliang');
				cheat.g('guiyoujie');
			},
			gf:function(){
				for(var i in lib.card){
					if(lib.card[i].type=='food'){
						cheat.g(i);
					}
				}
			},
			d:function(num,target){
				if(num==undefined) num=1;
				var cards=get.cards(num);
				for(var i=0;i<num;i++){
					var card=cards[i];
					game.me.node.handcards1.appendChild(card);
					delete _status.event._cardChoice;
					delete _status.event._targetChoice;
					delete _status.event._skillChoice;
					game.check();
					game.me.update();
					ui.updatehl();
				}
			},
			s:function(){
				for(var i=0;i<arguments.length;i++){
					game.me.addSkill(arguments[i],true);
				}
				delete _status.event._cardChoice;
				delete _status.event._targetChoice;
				delete _status.event._skillChoice;
				game.check();
			},
			t:function(num){
				if(game.players.contains(num)){
					num=game.players.indexOf(num);
				}
				if(num==undefined){
					for(var i=0;i<game.players.length;i++) cheat.t(i);
					return;
				}
				var player=game.players[num];
				var cards=player.getCards('hej');
				for(var i=0;i<cards.length;i++){
					cards[i].discard();
				}
				player.removeEquipTrigger();
				player.update();
			},
			to:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=game.me){
						cheat.t(i);
					}
				}
			},
			tm:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]==game.me){
						cheat.t(i);
					}
				}
			},
			k:function(i){
				if(i==undefined) i=1;
				game.players[i].hp=1;
				cheat.t(i);
				cheat.g('juedou');
			},
			z:function(name){
				switch(name){
					case 'cc':name='re_caocao';break;
					case 'lb':name='re_liubei';break;
					case 'sq':name='sunquan';break;
					case 'dz':name='dongzhuo';break;
					case 'ys':name='re_yuanshao';break;
					case 'zj':name='sp_zhangjiao';break;
					case 'ls':name='liushan';break;
					case 'sc':name='sunce';break;
					case 'cp':name='caopi';break;
					case 'cr':name='caorui';break;
					case 'sx':name='sunxiu';break;
					case 'lc':name='liuchen';break;
					case 'sh':name='sunhao';break;
				}
				game.zhu.init(name);
				game.zhu.maxHp++;
				game.zhu.hp++;
				game.zhu.update();
			},
		},
		translate:{
			flower:'鲜花',
			egg:'鸡蛋',
			wine:'酒杯',
			shoe:'拖鞋',
			yuxisx:'玉玺',
			jiasuo:'枷锁',
			junk:'平凡',
			common:'普通',
			rare:'精品',
			epic:'史诗',
			legend:'传说',
			default:"默认",
			special:'特殊',
			zhenfa:'阵法',
			aozhan:"鏖战",
			mode_derivation_card_config:'衍生',
			mode_banned_card_config:'禁卡',
			mode_favourite_character_config:'收藏',
			mode_banned_character_config:'禁将',
			heart:"♥︎",
			diamond:"♦︎",
			spade:"♠︎",
			club:"♣︎",
			none:'◈',
			ghujia:'护甲',
			ghujia_bg:'甲',
			heart2:"红桃",
			diamond2:"方片",
			spade2:"黑桃",
			club2:"梅花",
			none2:'无色',
			red:'红色',
			black:'黑色',
			ok:"确定",
			ok2:"确定",
			cancel:"取消",
			cancel2:"取消",
			restart:"重新开始",
			setting:"设置",
			start:"开始",
			random:"随机",
			_out:'无效',
			agree:'同意',
			refuse:'拒绝',
			fire:"火",
			thunder:"雷",
			poison:"毒",
			kami:'神',
			ice:'冰',
			stab:'刺',
			wei:'魏',
			shu:'蜀',
			wu:'吴',
			qun:'群',
			shen:'神',
			western:'西',
			key:'键',
			jin:'晋',
			double:'双',
			wei2:'魏国',
			shu2:'蜀国',
			wu2:'吴国',
			qun2:'群雄',
			shen2:'神明',
			western2:'西方',
			key2:'KEY',
			jin2:'晋朝',
			double2:'双势力',
			male:'男',
			female:'女',
			mad:'混乱',
			mad_bg:'疯',
			draw_card:'摸牌',
			discard_card:'弃牌',
			take_damage:'受伤害',
			reset_character:'复原武将牌',
			recover_hp:'回复体力',
			lose_hp:'流失体力',
			get_damage:'受伤害',
			weiColor:"#b0d0e2",
			shuColor:"#ffddb9",
			wuColor:"#b2d9a9",
			qunColor:"#f6f6f6",
			shenColor:"#ffe14c",
			westernColor:"#ffe14c",
			jinColor:"#ffe14c",
			keyColor:"#c9b1fd",
			basic:'基本',
			equip:'装备',
			trick:'锦囊',
			delay:'延时锦囊',
			character:'角色',
			revive:'复活',
			equip1:'武器',
			equip2:'防具',
			equip3:'防御马',
			'equip3_4':'坐骑',
			equip4:'攻击马',
			equip5:'宝物',
			equip6:'特殊装备',
			zero:'零',
			one:'一',
			two:'二',
			three:'三',
			four:'四',
			five:'五',
			six:'六',
			seven:'七',
			eight:'八',
			nine:'九',
			ten:'十',
			_recasting:'重铸',
			_lianhuan:'连环',
			_lianhuan2:'连环',
			_kamisha:'神杀',
			_icesha:'冰杀',
			qianxing:'潜行',
			mianyi:'免疫',
			fengyin:'封印',
			baiban:'白板',
			_disableJudge:"判定区",
			
			xiaowu_emotion:'小无表情',
			guojia_emotion:'郭嘉表情',
			zhenji_emotion:'甄姬表情',
			shibing_emotion:'士兵表情',
			xiaosha_emotion:'小杀表情',
			xiaotao_emotion:'小桃表情',
			xiaojiu_emotion:'小酒表情',
			xiaokuo_emotion:'小扩表情',

			pause:'暂停',
			config:'选项',
			auto:'托管',

			unknown:'未知',
			unknown0:'一号位',
			unknown1:'二号位',
			unknown2:'三号位',
			unknown3:'四号位',
			unknown4:'五号位',
			unknown5:'六号位',
			unknown6:'七号位',
			unknown7:'八号位',
			
			feichu_equip1:"已废除",
			feichu_equip1_info:"武器栏已废除",
			feichu_equip2:"已废除",
			feichu_equip2_info:"防具栏已废除",
			feichu_equip3:"已废除",
			feichu_equip3_info:"防御坐骑栏已废除",
			feichu_equip4:"已废除",
			feichu_equip4_info:"攻击坐骑栏已废除",
			feichu_equip5:"已废除",
			feichu_equip5_info:"宝物栏已废除",
			feichu_equip1_bg:"废",
			feichu_equip2_bg:"废",
			feichu_equip3_bg:"废",
			feichu_equip4_bg:"废",
			feichu_equip5_bg:"废",
			disable_judge:'已废除',
			disable_judge_info:'判定区已废除',
			disable_judge_bg:'废',
			pss:'手势',
			pss_paper:'布',
			pss_scissor:'剪刀',
			pss_stone:'石头',
			pss_paper_info:'石头剪刀布时的一种手势。克制石头，但被剪刀克制。',
			pss_scissor_info:'石头剪刀布时的一种手势。克制布，但被石头克制。',
			pss_stone_info:'石头剪刀布时的一种手势。克制剪刀，但被布克制。',
			renku:'仁库',
			group_wei:"魏势力",
			group_shu:"蜀势力",
			group_wu:"吴势力",
			group_qun:"群势力",
			group_key:"键势力",
			group_jin:"晋势力",
			group_wei_bg:"魏",
			group_shu_bg:"蜀",
			group_wu_bg:"吴",
			group_qun_bg:"群",
			group_key_bg:"键",
			group_jin_bg:"晋",
			zhengsu:'整肃',
			zhengsu_leijin:'擂进',
			zhengsu_bianzhen:'变阵',
			zhengsu_mingzhi:'鸣止',
			zhengsu_leijin_info:'回合内所有于出牌阶段使用的牌点数递增且不少于三张。',
			zhengsu_bianzhen_info:'回合内所有于出牌阶段使用的牌花色相同且不少于两张。',
			zhengsu_mingzhi_info:'回合内所有于弃牌阶段弃置的牌花色均不相同且不少于两张。',
			db_atk:'策略',
			db_atk1:'全军出击',
			db_atk2:'分兵围城',
			db_def:'策略',
			db_def1:'奇袭粮道',
			db_def2:'开城诱敌',
			cooperation_damage:'同仇',
			cooperation_damage_info:'双方累计造成至少4点伤害',
			cooperation_draw:'并进',
			cooperation_draw_info:'双方累计摸至少8张牌',
			cooperation_discard:'疏财',
			cooperation_discard_info:'双方累计弃置至少4种花色的牌',
			cooperation_use:'戮力',
			cooperation_use_info:'双方累计使用至少4种花色的牌',
			charge:'蓄力值',
			expandedSlots:'扩展装备栏',
		},
		element:{
			content:{
				emptyEvent:function(){
					event.trigger(event.name);
				},
				//增加明置手牌
				addShownCards:()=>{
					var hs=player.getCards('h'),showingCards=event._cards.filter(showingCard=>hs.includes(showingCard)),shown=player.getShownCards();
					event.gaintag.forEach(tag=>player.addGaintag(showingCards,tag));
					if(!(event.cards=showingCards.filter(showingCard=>!shown.includes(showingCard))).length) return;
					game.log(player,'明置了',event.cards);
					if(event.animate!=false) player.$give(event.cards,player,false);
					event.trigger('addShownCardsAfter');
				},
				//隐藏明置手牌
				hideShownCards:()=>{
					var shown=player.getShownCards(),hidingCards=event._cards.filter(hidingCard=>shown.includes(hidingCard));
					if(!hidingCards.length) return;
					if(event.gaintag.length) event.gaintag.forEach(tag=>player.removeGaintag(tag,hidingCards));
					else {
						var map=hidingCards.reduce((constructingMap,hidingCard)=>{
							hidingCard.gaintag.forEach(tag=>{
								if(!tag.startsWith('visible_')) return;
								if(!constructingMap[tag]) constructingMap[tag]=[];
								constructingMap[tag].push(hidingCard);
							});
							return constructingMap;
						},{});
						Object.keys(map).forEach(key=>player.removeGaintag(key,map[key]));
					}
					hidingCards.removeArray(player.getShownCards());
					if(!hidingCards.length) return;
					game.log(player,'取消明置了',event.cards=hidingCards);
					if(event.animate!=false) player.$give(hidingCards,player,false);
					event.trigger('hideShownCardsAfter');
				},
				//Execute the delay card effect
				//执行延时锦囊牌效果
				executeDelayCardEffect:()=>{
					'step 0'
					target.$phaseJudge(card);
					event.cancelled=false;
					event.trigger('executeDelayCardEffect');
					event.cardName=card.viewAs||card.name;
					target.popup(event.cardName,'thunder');
					if(!lib.card[event.cardName].effect){
						game.delay();
						event.finish();
					}
					else if(!lib.card[event.cardName].judge){
						game.delay();
						event.nojudge=true;
					}
					'step 1'
					if(event.cancelled||event.nojudge) return;
					var next=player.judge(card),judge=event.judge;
					if(typeof judge=='function') next.judge=judge;
					var judge2=event.judge2;
					if(typeof judge2=='function') next.judge2=judge2;
					'step 2'
					if(event.excluded) delete event.excluded;
					else{
						var cardName=event.cardName;
						if(event.cancelled&&!event.direct){
							var cardCancel=lib.card[cardName].cancel;
							if(cardCancel){
								var next=game.createEvent(`${cardName}Cancel`);
								next.setContent(cardCancel);
								next.cards=[card];
								if(!card.viewAs){
									var autoViewAs=next.card=get.autoViewAs(card);
									autoViewAs.expired=card.expired;
								}
								else{
									var autoViewAs=next.card=get.autoViewAs({
										name:cardName
									},next.cards);
									autoViewAs.expired=card.expired;
								}
								next.player=player;
							}
						}
						else{
							var next=game.createEvent(cardName);
							next.setContent(lib.card[cardName].effect);
							next._result=result;
							next.cards=[card];
							if(!card.viewAs){
								var autoViewAs=next.card=get.autoViewAs(card);
								autoViewAs.expired=card.expired;
							}
							else{
								var autoViewAs=next.card=get.autoViewAs({
									name:cardName
								},next.cards);
								autoViewAs.expired=card.expired;
							}
							next.player=player;
						}
					}
					ui.clear();
					card.delete();
				},
				//Gift
				//赠予
				gift:()=>{
					'step 0'
					event.num=0;
					'step 1'
					if(num<cards.length){
						event.card=cards[num];
						event.trigger('gift');
					}
					else{
						game.delayx();
						event.finish();
					}
					'step 2'
					if(event.deniedGifts.includes(card)){
						game.log(target,'拒绝了',player,'赠予的',card);
						event.trigger('giftDeny');
						player.loseToDiscardpile(card).log=false;
						event.trigger('giftDenied');
						return;
					}
					game.log(player,'将',card,'赠予了',target);
					player.$give(card,target,false);
					game.delay(0.5);
					event.trigger('giftAccept');
					if(get.type(card,false)=='equip') target.equip(card).log=false;
					else target.gain(card,player).visible=true;
					event.trigger('giftAccepted');
					'step 3'
					event.num++;
					event.goto(1);
				},
				//Recast
				//重铸
				recast:()=>{
					'step 0'
					game.log(player,'重铸了',cards);
					if(typeof event.recastingLose!='function') return;
					event.trigger('recastingLose');
					event.recastingLose(player,cards);
					event.trigger('recastingLost');
					event.recastingLosingEvents.push(...event.next.filter(value=>value.name!='arrangeTrigger'));
					'step 1'
					event.trigger('recast');
					'step 2'
					if(typeof event.recastingGain!='function') return;
					event.trigger('recastingGain');
					event.recastingGain(player,cards);
					event.trigger('recastingGained');
					event.recastingGainingEvents.push(...event.next.filter(value=>value.name!='arrangeTrigger'));
				},
				//装备栏相关
				disableEquip:function(){
					'step 0'
					event.cards=[];
					event.num=0;
					event.slotsx=[...new Set(event.slots)].sort();
					if(!event.slots.length) event.finish();
					'step 1'
					var slot=event.slotsx[event.num];
					var left=player.countEnabledSlot(slot),lose=Math.min(left,get.numOf(event.slots,slot));
					if(lose<=0) event.goto(3);
					else{
						game.log(player,'废除了'+get.cnNumber(lose)+'个','#g'+get.translation(slot)+'栏');
						if(!player.disabledSlots) player.disabledSlots={};
						if(!player.disabledSlots[slot]) player.disabledSlots[slot]=0;
						player.disabledSlots[slot]+=lose;
						var cards=player.getEquips(slot).filter(card=>!event.cards.contains(card));
						if(cards.length>0){
							if(lose>=left){
								event._result={bool:true,links:cards};
							}
							else if(cards.length>(left-lose)){
								var source=event.source,num=(cards.length-(left-lose));
								if(!source||!source.isIn()) source=player;
								source.chooseButton([
									'选择'+(player==source?'你':get.translation(player))+'的'+get.cnNumber(num)+'张'+get.translation(slot)+'牌置入弃牌堆',
									cards,
								],true,[1,num]).set('filterOk',function(){
									var evt=_status.event;
									return ui.selected.buttons.reduce(function(num,button){
										return num+get.numOf(get.subtypes(button.link,false),evt.slot)
									},0)==evt.required;
								}).set('required',num).set('slot',slot)
							}
							else event.goto(3);
						}
						else event.goto(3)
					}
					'step 2'
					if(result.bool) event.cards.addArray(result.links);
					'step 3'
					event.num++;
					if(event.num<event.slotsx.length) event.goto(1);
					else{
						player.$syncDisable();
						if(cards.length>0) player.loseToDiscardpile(cards);
					}
				},
				enableEquip:function(){
					if(!event.slots.length) return;
					var slotsx=[...new Set(event.slots)].sort();
					for(var slot of slotsx){
						var lost=player.countDisabledSlot(slot),gain=Math.min(lost,get.numOf(event.slots,slot));
						if(lost<=0) continue;
						else{
							game.log(player,'恢复了'+get.cnNumber(gain)+'个','#g'+get.translation(slot)+'栏');
							if(!player.disabledSlots) player.disabledSlots={};
							if(!player.disabledSlots[slot]) player.disabledSlots[slot]=0;
							player.disabledSlots[slot]-=gain;
						}
					}
					player.$syncDisable();
				},
				expandEquip:function(){
					if(!event.slots.length) return;
					var slotsx=[...new Set(event.slots)].sort();
					for(var slot of slotsx){
						var expand=get.numOf(event.slots,slot);
						game.log(player,'获得了'+get.cnNumber(expand)+'个额外的','#g'+get.translation(slot)+'栏');
						if(!player.expandedSlots) player.expandedSlots={};
						if(!player.expandedSlots[slot]) player.expandedSlots[slot]=0;
						player.expandedSlots[slot]+=expand;
					}
					player.$syncExpand();
				},
				//选择顶装备要顶的牌
				replaceEquip:function(){
					'step 0'
					event.cards=[];
					var types=get.subtypes(card,false);
					if(types.length){
						var info=get.info(card,false);
						if(info.customSwap){
							event.cards.addArray(player.getCards('e',function(card){
								return info.customSwap(card);
							}));
							event.goto(4);
						}
						else{
							event.num=0;
							event.slots=types;
							event.slotsx=[...new Set(event.slots)].sort();
						}
					}
					else event.goto(4);
					'step 1'
					var slot=event.slotsx[event.num];
					var left=player.countEquipableSlot(slot),lose=Math.min(left,get.numOf(event.slots,slot));
					if(lose<=0) event.goto(3);
					else{
						var cards=player.getEquips(slot).filter(card=>{
							return !event.cards.contains(card)&&lib.filter.canBeReplaced(card,player);
						});
						if(cards.length>0){
							if(lose>=left){
								event._result={bool:true,links:cards};
							}
							else if(cards.length>(left-lose)){
								var source=event.source,num=(cards.length-(left-lose));
								if(!source||!source.isIn()) source=player;
								source.chooseButton([
									'选择替换掉'+get.cnNumber(num)+'张'+get.translation(slot)+'牌',
									cards,
								],true,[1,num]).set('filterOk',function(){
									var evt=_status.event;
									return ui.selected.buttons.reduce(function(num,button){
										return num+get.numOf(get.subtypes(button.link,false),evt.slot)
									},0)==evt.required;
								}).set('required',num).set('slot',slot)
							}
							else event.goto(3);
						}
						else event.goto(3)
					}
					'step 2'
					if(result.bool) event.cards.addArray(result.links);
					'step 3'
					event.num++;
					if(event.num<event.slotsx.length) event.goto(1);
					'step 4'
					event.result=cards;
				},
				//装备牌
				equip:function(){
					"step 0"
					var owner=get.owner(card)
					if(owner){
						event.owner=owner;
						owner.lose(card,ui.special,'visible').set('type','equip').set('getlx',false);
					}
					else if(get.position(card)=='c') event.updatePile=true;
					"step 1"
					if(event.cancelled){
						event.finish();
						return;
					}
					if(card.destroyed){
						if(player.hasSkill(card.destroyed)){
							delete card.destroyed;
						}
						else{
							event.finish();
							return;
						}
					}
					else if(event.owner){
						if(event.owner.getCards('hejsx').contains(card)){
							event.finish();
							return;
						}
					}
					if(event.draw){
						game.delay(0,300);
						player.$draw(card);
					}
					"step 2"
					if(card.clone){
						game.broadcast(function(card,player){
							if(card.clone){
								card.clone.moveDelete(player);
							}
						},card,player);
						card.clone.moveDelete(player);
						game.addVideo('gain2',player,get.cardsInfo([card.clone]));
					}
					player.equiping=true;
					"step 3"
					var info=get.info(card,false);
					var next=game.createEvent('replaceEquip');
					next.player=player;
					next.card=card;
					next.setContent(info.replaceEquip||'replaceEquip');
					"step 4"
					var info=get.info(card,false);
					if(get.itemtype(result)=='cards'){
						player.lose(result,false,'visible').set('type','equip').set('getlx',false).swapEquip=true;
						if(info.loseThrow){
							player.$throw(result,1000);
						}
						event.swapped=true;
					}
					"step 5"
					//if(player.isMin() || player.countCards('e',{subtype:get.subtype(card)})){
					if(player.isMin()||!player.canEquip(card)){
						event.finish();
						game.cardsDiscard(card);
						delete player.equiping;
						return;
					}
					var subtype=get.subtype(card);
					if(subtype=='equip6') subtype='equip3';
					game.broadcastAll(function(type){
						if(lib.config.background_audio){
							game.playAudio('effect',type);
						}
					},subtype);
					player.$equip(card);
					game.addVideo('equip',player,get.cardInfo(card));
					if(event.log!=false) game.log(player,'装备了',card);
					if(event.updatePile) game.updateRoundNumber();
					"step 6"
					var info=get.info(card,false);
					if(info.onEquip&&(!info.filterEquip||info.filterEquip(card,player))){
						if(Array.isArray(info.onEquip)){
							for(var i=0;i<info.onEquip.length;i++){
								var next=game.createEvent('equip_'+card.name);
								next.setContent(info.onEquip[i]);
								next.player=player;
								next.card=card;
							}
						}
						else{
							var next=game.createEvent('equip_'+card.name);
							next.setContent(info.onEquip);
							next.player=player;
							next.card=card;
						}
						if(info.equipDelay!=false) game.delayx();
					}
					delete player.equiping;
					if(event.delay){
						game.delayx();
					}
				},
				//装备栏 END
				changeGroup:function(){
					'step 0'
					event.originGroup=player.group;
					if(!event.group) event.group=player.group;
					var group=event.group;
					player.getHistory('custom').push(event);
					if(event.broadcast!==false){
						game.broadcast(function(player,group){
							player.group=group;
							player.node.name.dataset.nature=get.groupnature(group);
						},player,group);
					}
					player.group=group;
					player.node.name.dataset.nature=get.groupnature(group);
					if(event.log!==false) game.log(player,'将势力变为了','#y'+get.translation(group+2));
				},
				chooseToDebate:function(){
					'step 0'
					event.targets=event.list.filter(function(i){
						return i.countCards('h')>0;
					});
					if(!event.targets.length) event.result={bool:false};
					else{
						var next=player.chooseCardOL(event.targets,get.translation(player)+'发起了议事，请选择展示的手牌',true).set('type','debate').set('source',player).set('ai',event.ai||function(card){
							return Math.random();
						}).set('aiCard',event.aiCard||function(target){
							var hs=target.getCards('h');
							return {bool:true,cards:[hs.randomGet()]};
						});
						next._args.remove('glow_result');
					}
					'step 1'
					var red=[],black=[];
					event.videoId=lib.status.videoId++;
					for(var i=0;i<event.targets.length;i++){
						var card=result[i].cards[0],target=event.targets[i];
						if(get.color(card,target)=='red') red.push([target,card]);
						else black.push([target,card]);
					}
					event.red=red; event.black=black;
					if(red.length){
						game.log(red.map(function(i){
							return i[0];
						}),'意见为<span class="firetext">红色</span>，展示了',red.map(function(i){
							return i[1];
						}));
					}
					else game.log('#b无人','意见为<span class="firetext">红色</span>');
					if(black.length){
						game.log(black.map(function(i){
							return i[0];
						}),'意见为','#g黑色','，展示了',black.map(function(i){
							return i[1];
						}));
					}
					else game.log('#b无人','意见为','#g黑色');
					game.broadcastAll(function(name,id,redArgs,blackArgs){
						var dialog=ui.create.dialog(name+'发起了议事','hidden','forcebutton');
						dialog.videoId=id;
						dialog.classList.add('scroll1');
						dialog.classList.add('scroll2');
						dialog.classList.add('fullwidth');
						dialog.classList.add('fullheight');
						dialog.buttonss=[];
						
						var list=['意见为红色的角色','意见为黑色的角色']
						for(var i=0;i<list.length;i++){
							dialog.add('<div class="text center">'+list[i]+'</div>');
							var buttons=ui.create.div('.buttons',dialog.content);
							dialog.buttonss.push(buttons);
							buttons.classList.add('popup');
							buttons.classList.add('guanxing');
						}
						var func=function(target){
							if(target._tempTranslate) return target._tempTranslate;
							var name=target.name;
							if(lib.translate[name+'_ab']) return lib.translate[name+'_ab'];
							return get.translation(name);
						};
						for(var i=0;i<redArgs.length;i++){
							var list=redArgs[i];
							var button=ui.create.button(list[1],'card',dialog.buttonss[0]);
							button.querySelector('.info').innerHTML=func(list[0]);
						}
						for(var i=0;i<blackArgs.length;i++){
							var list=blackArgs[i];
							var button=ui.create.button(list[1],'card',dialog.buttonss[1]);
							button.querySelector('.info').innerHTML=func(list[0]);
						}
						dialog.open();
					},get.translation(player),event.videoId,red,black);
					game.delay(4);
					'step 2'
					game.broadcastAll('closeDialog',event.videoId);
					var opinion=null;
					if(event.red.length>event.black.length) opinion='red';
					else if(event.red.length<event.black.length) opinion='black';
					if(opinion) game.log(player,'本次发起的议事结果为',opinion=='red'?'<span class="firetext">红色</span>':'#g黑色');
					else game.log(player,'本次发起的议事无结果');
					event.result={
						bool:true,
						opinion:opinion,
						red:event.red,
						black:event.black,
						targets:event.targets
					}
					'step 3'
					if(event.callback){
						var next=game.createEvent('debateCallback',false);
						next.player=player;
						next.debateResult=get.copy(event.result);
						next.setContent(event.callback);
					}
				},
				delay:function(){
					game[event.name].apply(game,event._args)
				},
				chooseCooperationFor:function(){
					'step 0'
					var next=player.chooseButton([
						'选择和'+get.translation(target)+'的协力方式',
						[event.cardlist,'vcard'],
					],true);
					next.set('ai',event.ai||function(){
						return Math.random();
					});
					'step 1'
					if(result.bool){
						player.cooperationWith(target,result.links[0][2].slice(12),event.reason);
					}
				},
				chooseToPlayBeatmap:function(){
					'step 0'
					if(game.online) return;
					if(_status.connectMode)	event.time=lib.configOL.choose_timeout;
					event.videoId=lib.status.videoId++;
					//给其他角色看的演奏框
					game.broadcastAll(function(player,id,beatmap){
						if(_status.connectMode) lib.configOL.choose_timeout=(Math.ceil((beatmap.timeleap[beatmap.timeleap.length-1]+beatmap.speed*100+(beatmap.current||0))/1000)+5).toString();
						if(player==game.me) return;
						var str=get.translation(player)+'正在演奏《'+beatmap.name+'》...';
						if(!_status.connectMode) str+='<br>（点击屏幕可以跳过等待AI操作）';
						ui.create.dialog(str).videoId=id;
						if(ui.backgroundMusic) ui.backgroundMusic.pause();
						if(lib.config.background_audio){
							if(beatmap.filename.startsWith('ext:')) game.playAudio(beatmap.filename);
							else game.playAudio('effect',beatmap.filename);
						}
					},player,event.videoId,event.beatmap);
					'step 1'
					var beatmap=event.beatmap;
					if(event.isMine()){
						var timeleap=beatmap.timeleap.slice(0);
						var current=beatmap.current;
						//获取两个音符的时间间隔
						var getTimeout=function(){
							var time=timeleap.shift();
							var out=time-current;
							current=time;
							return out;
						};
						//初始化一堆变量
						var score=0;
						var added=timeleap.length;
						var number_of_tracks=beatmap.number_of_tracks||6;
						var custom_mapping=Array.isArray(beatmap.mapping);
						var mapping=custom_mapping?beatmap.mapping.slice():beatmap.mapping;
						var hitsound=beatmap.hitsound||'hitsound.wav';
						if(hitsound.startsWith('ext:')) hitsound=lib.assetURL+'extension/'+hitsound.slice(4);
						else hitsound=lib.assetURL+'audio/effect/'+hitsound;
						var hitsound_audio=new Audio(hitsound);
						hitsound_audio.volume=0.25;
						var abs=1;
						var node_pos=0;
						if(custom_mapping){
							node_pos=mapping.shift();
						}
						else if(mapping=='random'){
							abs=get.rand(number_of_tracks);
							node_pos=abs;
						}
						var combo=0;
						var max_combo=0;
						var nodes=[];
						var roundmenu=false;
						//隐藏菜单按钮
						if(ui.roundmenu&&ui.roundmenu.display!='none'){
							roundmenu=true;
							ui.roundmenu.style.display='none';
						}
						if(ui.backgroundMusic) ui.backgroundMusic.pause();
						var event=_status.event;
						event.settleed=false;
						//建个框框
						var dialog=ui.create.dialog('forcebutton','hidden');
						event.dialog=dialog;
						event.dialog.textPrompt=event.dialog.add('<div class="text center">'+(beatmap.prompt||'在音符滑条和底部判定区重合时点击屏幕！')+'</div>');
						event.switchToAuto=function(){};
						event.dialog.classList.add('fixed');
						event.dialog.classList.add('scroll1');
						event.dialog.classList.add('scroll2');
						event.dialog.classList.add('fullwidth');
						event.dialog.classList.add('fullheight');
						event.dialog.classList.add('noupdate');
						event.dialog.style.overflow='hidden';
						//结束后操作
						event.settle=function(){
							if(event.settleed) return;
							event.settleed=true;
							//评分
							var acc=Math.floor(score/(added*5)*100);
							if(!Array.isArray(lib.config.choose_to_play_beatmap_accuracies)) lib.config.choose_to_play_beatmap_accuracies=[];
							lib.config.choose_to_play_beatmap_accuracies.push(acc);
							if(lib.config.choose_to_play_beatmap_accuracies.length>5) lib.config.choose_to_play_beatmap_accuracies.shift();
							game.saveConfigValue("choose_to_play_beatmap_accuracies");
							var rank;
							if(acc==100) rank=['SS','metal'];
							else if(acc>=94) rank=['S','orange'];
							else if(acc>=87) rank=['A','wood'];
							else if(acc>=80) rank=['B','water'];
							else if(acc>=65) rank=['C','thunder'];
							else rank=['D','fire'];
							event.dialog.textPrompt.innerHTML='<div class="text center">演奏结束！<br>最大连击数：'+max_combo+'  精准度：'+acc+'%</div>';
							game.me.$fullscreenpop('<span style="font-family:xinwei">演奏评级：<span data-nature="'+rank[1]+'">'+rank[0]+'</span></span>',null,null,false);
							//返回结果并继续游戏
							setTimeout(function(){
								event._result={
									bool:true,
									accuracy:acc,
									rank:rank,
								};
								event.dialog.close();
								game.resume();
								_status.imchoosing=false;
								if(roundmenu) ui.roundmenu.style.display='';
								if(ui.backgroundMusic) Promise.resolve(ui.backgroundMusic.play()).catch(()=>void 0);
								hitsound_audio.remove();
							},1000);
						};
						event.dialog.open();
						//操作容差
						var height=event.dialog.offsetHeight;
						var width=event.dialog.offsetWidth;
						var range1=(beatmap.range1||[90,110]);
						var range2=(beatmap.range2||[93,107]);
						var range3=(beatmap.range3||[96,104]);
						var speed=(beatmap.speed||25);
						//初始化底部的条子
						var judger=ui.create.div('');
						judger.style["background-image"]=(beatmap.judgebar_color||'linear-gradient(rgba(240, 235, 3, 1), rgba(230, 225, 5, 1))');
						judger.style["border-radius"]='3px';
						judger.style.position='absolute';
						judger.style.opacity='0.3';
						var heightj=Math.ceil(height*(beatmap.judgebar_height||0.1));
						judger.style.height=heightj+'px';
						judger.style.width=width+'px';
						judger.style.left='0px';
						judger.style.top=(height-heightj)+'px';
						event.dialog.appendChild(judger);
						//生成每个音符
						var addNode=function(){
							var node=ui.create.div('');
							nodes.push(node);
							node.style["background-image"]=(beatmap.node_color||'linear-gradient(rgba(120, 120, 240, 1), rgba(100, 100, 230, 1))');
							node.style["border-radius"]='3px';
							node.style.position='absolute';
							node.style.height=Math.ceil(height/10)+'px';
							node.style.width=Math.ceil(width/number_of_tracks)-10+'px';
							node._position=get.utc();
							event.dialog.appendChild(node);
							
							node.style.left=Math.ceil(width*node_pos/number_of_tracks+5)+'px';
							node.style.top='-'+(Math.ceil(height/10))+'px';
							ui.refresh(node);
							node.style.transition='all '+speed*110+'ms linear';
							node.style.transform='translateY('+Math.ceil(height*1.1)+'px)';
							node.timeout=setTimeout(function(){
								if(nodes.contains(node)){
									nodes.remove(node);
									player.popup('Miss','fire',false);
									if(player.damagepopups.length) player.$damagepop();
									combo=0;
								}
							},speed*110);
							
							if(custom_mapping){
								node_pos=mapping.shift();
							}
							else if(mapping=='random'){
								while(node_pos==abs){
									node_pos=get.rand(number_of_tracks);
								}
								abs=node_pos;
							}
							else{
								node_pos+=abs;
								if(node_pos>number_of_tracks-1){
									abs=-1;
									node_pos=number_of_tracks-2;
								}
								else if(node_pos<0){
									abs=1;
									node_pos=1;
								}
							}
							if(timeleap.length){
								setTimeout(function(){
									addNode();
								},getTimeout());
							}
							else{
								setTimeout(function(){
									event.settle();
								},speed*110+100)
							}
						}
						//点击时的判断操作
						var click=function(){
							if(!nodes.length) return;
							for(var node of nodes){
								//用生成到点击的时间差来判断距离
								var time=get.utc();
								var top=(time-node._position)/speed;
								if(top>range1[1]) continue;
								else if(top<range1[0]) return;
								nodes.remove(node);
								clearTimeout(node.timeout);
								node.style.transform='';
								node.style.transition='all 0s';
								node.style.top=(height*((top-10)/100))+'px';
								ui.refresh(node);
								node.style.transition='all 0.5s';
								node.style.transform='scale(1.2)';
								node.delete();
								if(top>=range3[0]&&top<range3[1]){
									score+=5;
									player.popup('Perfect','orange',false);
								}
								else if(top>=range2[0]&&top<range2[1]){
									score+=3;
									player.popup('Great','wood',false);
								}
								else{
									score+=1;
									player.popup('Good','soil',false);
								}
								if(player.damagepopups.length) player.$damagepop();
								combo++;
								max_combo=Math.max(combo,max_combo);
								hitsound_audio.currentTime=0;
								if(hitsound_audio.paused) Promise.resolve(hitsound_audio.play()).catch(()=>void 0);
								break;
							}
						};
						document.addEventListener(lib.config.touchscreen?'touchstart':'mousedown',click);
						
						game.pause();
						game.countChoose();
						setTimeout(()=>{
							if(!lib.config.background_audio) return;
							if(beatmap.filename.startsWith('ext:')) game.playAudio(beatmap.filename);
							else game.playAudio('effect',beatmap.filename);
						},Math.floor(speed*100*(0.9+beatmap.judgebar_height))+beatmap.current);
						setTimeout(function(){
							addNode();
						},getTimeout());
					}
					else if(event.isOnline()){
						event.send();
					}
					else{
						game.pause();
						game.countChoose();
						var settle=function(){
							_status.imchoosing=false;
							//Algorithm: Generate the random number range using the mean and the half standard deviation of accuracies of the player's last 5 plays
							//算法：用玩家的上5次游玩的准确率的平均数和半标准差生成随机数范围
							var choose_to_play_beatmap_accuracies=(lib.config.choose_to_play_beatmap_accuracies||[]).concat(Array.from({
								length:6-(lib.config.choose_to_play_beatmap_accuracies||[]).length
							},()=>get.rand(70,100)));
							var mean=Math.round(choose_to_play_beatmap_accuracies.reduce((previousValue,currentValue)=>previousValue+currentValue)/choose_to_play_beatmap_accuracies.length);
							var half_standard_deviation=Math.round(Math.sqrt(choose_to_play_beatmap_accuracies.reduce((previousValue,currentValue)=>previousValue+Math.pow(currentValue-mean,2),0))/2);
							var acc=Math.min(Math.max(get.rand.apply(get,beatmap.aiAcc||[mean-half_standard_deviation-get.rand(0,half_standard_deviation),mean+half_standard_deviation+get.rand(0,half_standard_deviation)]),0),100);
							var rank;
							if(acc==100) rank=['SS','metal'];
							else if(acc>=94) rank=['S','orange'];
							else if(acc>=87) rank=['A','green'];
							else if(acc>=80) rank=['B','water'];
							else if(acc>=65) rank=['C','thunder'];
							else rank=['D','fire'];
							event._result={
								bool:true,
								accuracy:acc,
								rank:rank,
							};
							if(event.dialog) event.dialog.close();
							if(event.control) event.control.close();
							game.resume();
						};
						var song_duration=beatmap.timeleap[beatmap.timeleap.length-1]+beatmap.speed*100+1000+(beatmap.current||0);
						var settle_timeout=setTimeout(settle,song_duration);
						if(!_status.connectMode) {
							var skip_timeout;
							var skip=()=>{
								settle();
								Array.from(ui.window.getElementsByTagName('audio')).forEach(audio=>{
									if(audio.currentSrc.includes(beatmap.filename.startsWith('ext:')?beatmap.name:beatmap.filename)) audio.remove();
								});
								document.removeEventListener(lib.config.touchscreen?'touchend':'click',skip);
								clearTimeout(settle_timeout);
								clearTimeout(skip_timeout);
							};
							document.addEventListener(lib.config.touchscreen?'touchend':'click',skip);
							skip_timeout=setTimeout(()=>document.removeEventListener(lib.config.touchscreen?'touchend':'click',skip),song_duration);
						}
					}
					'step 2'
					game.broadcastAll(function(id,time){
						if(_status.connectMode) lib.configOL.choose_timeout=time;
						var dialog=get.idDialog(id);
						if(dialog){
							dialog.close();
						}
						if(ui.backgroundMusic) Promise.resolve(ui.backgroundMusic.play()).catch(()=>void 0);
					},event.videoId,event.time);
					var result=event.result||result;
					event.result=result;
				},
				chooseToMove:function(){
					'step 0'
					if(event.chooseTime&&_status.connectMode&&!game.online){
						event.time=lib.configOL.choose_timeout;
						game.broadcastAll(function(time){
							lib.configOL.choose_timeout=time;
						},event.chooseTime);
					}
					if(event.isMine()){
						delete ui.selected.guanxing_button;
						var list=event.list,filterMove=event.filterMove,filterOk=event.filterOk;
						_status.imchoosing=true;
						var event=_status.event;
						event.settleed=false;
						event.dialog=ui.create.dialog(event.prompt||'请选择要操作的牌','hidden','forcebutton');
						event.switchToAuto=function(){
							if(!filterOk(event.moved)){
								if(!event.forced) event._result={bool:false};
								else event._result='ai';
							}
							else{
								event._result={
									bool:true,
									moved:event.moved,
								};
							}
							event.dialog.close();
							if(ui.confirm) ui.confirm.close();
							game.resume();
							_status.imchoosing=false;
							setTimeout(function(){
								ui.arena.classList.remove('choose-to-move');
							},500);
						};
						event.dialog.classList.add('scroll1');
						event.dialog.classList.add('scroll2');
						event.dialog.classList.add('fullwidth');
						if(list.length>1){
							ui.arena.classList.add('choose-to-move');
							event.dialog.classList.add('fullheight');
						}
						
						event.moved=[];
						var buttonss=[];
						event.buttonss=buttonss;
						var updateButtons=function(){
							for(var i of buttonss){
								event.moved[i._link]=get.links(Array.from(i.childNodes));
								if(i.textPrompt) i.previousSibling.innerHTML=('<div class="text center">'+i.textPrompt(event.moved[i._link])+'</div>');
							}
							if(filterOk(event.moved)){
								ui.create.confirm('o');
							}
							else{
								if(!event.forced) ui.create.confirm('c');
								else if(ui.confirm) ui.confirm.close();
							}
						};
						var clickButtons=function(){
							if(!ui.selected.guanxing_button) return;
							if(ui.selected.guanxing_button.parentNode==this) return;
							if(!filterMove(ui.selected.guanxing_button,this._link,event.moved)) return;
							ui.selected.guanxing_button.classList.remove('glow2');
							this.appendChild(ui.selected.guanxing_button);
							delete ui.selected.guanxing_button;
							updateButtons();
						};
						
						for(var i=0;i<list.length;i++){
							var tex=event.dialog.add('<div class="text center">'+list[i][0]+'</div>');
							tex.classList.add('choosetomove');
							var buttons=ui.create.div('.buttons',event.dialog.content,clickButtons);
							buttonss.push(buttons);
							buttons.classList.add('popup');
							buttons.classList.add('guanxing');
							buttons._link=i;
							if(list[i][1]){
								if(get.itemtype(list[i][1])=='cards'){
									var cardsb=ui.create.buttons(list[i][1],'card',buttons);
									if(list[i][2]&&typeof list[i][2]=='string'){
										for(var ij of cardsb) ij.node.gaintag.innerHTML=get.translation(list[i][2]);
									}
								}
								else if(list[i][1].length==2){
									ui.create.buttons(list[i][1][0],list[i][1][1],buttons);
								}
							}
							if(list[i][2]&&typeof list[i][2]=='function') buttons.textPrompt=list[i][2];
						}
						var tex=event.dialog.add('<div class="text center">点击两张牌以交换位置；点击一张牌并点击其他区域以移动卡牌</div>');
						tex.classList.add('choosetomove');
							
						event.dialog.open();
						updateButtons();
						
						event.custom.replace.button=function(button){
							var node=button.parentNode;
							if(!buttonss.contains(node)) return;
							if(!ui.selected.guanxing_button){
								ui.selected.guanxing_button=button;
								button.classList.add('glow2');
								return;
							}
							if(ui.selected.guanxing_button==button){
								button.classList.remove('glow2');
								delete ui.selected.guanxing_button;
								return;
							}
							if(!filterMove(button,ui.selected.guanxing_button,event.moved)) return;
							var par1=ui.selected.guanxing_button.parentNode,ind1=ui.selected.guanxing_button.nextSibling,par2=button.parentNode,ind2=button.nextSibling;
							ui.selected.guanxing_button.classList.remove('glow2');
							par1.insertBefore(button,ind1);
							par2.insertBefore(ui.selected.guanxing_button,ind2);
							delete ui.selected.guanxing_button;
							updateButtons();
						}
						event.custom.replace.confirm=function(bool){
							if(bool) event._result={
								bool:true,
								moved:event.moved,
							};
							else event._result={bool:false};
							event.dialog.close();
							if(ui.confirm) ui.confirm.close();
							game.resume();
							_status.imchoosing=false;
							setTimeout(function(){
								ui.arena.classList.remove('choose-to-move');
							},500);
						};
						
						game.pause();
						game.countChoose();
						event.choosing=true;
					}
					else if(event.isOnline()){
						event.send();
					}
					else{
						event.result='ai';
					}
					"step 1"
					if(event.time) game.broadcastAll(function(time){
						lib.configOL.choose_timeout=time;
					},event.time);
					var result=event.result||result;
					if((!result||result=='ai'||(event.forced&&!result.bool))&&event.processAI){
						var moved=event.processAI(event.list);
						if(moved) result={
							bool:true,
							moved:moved,
						}
						else result={bool:false};
					}
					event.result=result;
				},
				showCharacter:function(){
					'step 0'
					event.trigger('showCharacterEnd');
					'step 1'
					event.trigger('showCharacterAfter');
					if(get.mode()=='identity'&&player.isZhu) event.trigger('zhuUpdate');
				},
				removeCharacter:function(){
					player.$removeCharacter(event.num);
				},
				chooseUseTarget:function(){
					'step 0'
					if(get.is.object(card)&&!event.viewAs) card.isCard=true;
					if(cards&&get.itemtype(card)!='card'){
						card=get.copy(card);
						card.cards=cards.slice(0);
						event.card=card;
					}
					if(!lib.filter.cardEnabled(card,player)||(event.addCount!==false&&!lib.filter.cardUsable(card,player))){
						event.result={bool:false};
						event.finish();
						return;
					}
					var info=get.info(card);
					var range;
					if(!info.notarget){
						var select=get.copy(info.selectTarget);
						range=get.select(select);
						if(event.selectTarget) range=get.select(event.selectTarget);
						game.checkMod(card,player,range,'selectTarget',player);
					}
					if(info.notarget||range[1]<=-1){
						if(!info.notarget&&range[1]<=-1){
							for(var i=0;i<targets.length;i++){
								if(event.filterTarget){
									if(!event.filterTarget(card,player,targets[i])){
										targets.splice(i--,1);
									}
								}
								else if(!player.canUse(card,targets[i],event.nodistance?false:null,event.addCount===false?null:true)){
									targets.splice(i--,1);
								}
							}
							if(targets.length){
								event.targets2=targets;
							}
							else{
								event.finish();
								return;
							}
						}
						else event.targets2=[];
						if(event.forced){
							event._result={bool:true};
							return;
						}
						else{
							var next=player.chooseBool();
							next.set('prompt',event.prompt||('是否'+(event.targets2.length?'对':'')+get.translation(event.targets2)+'使用'+get.translation(card)+'?'));
							if(event.hsskill) next.setHiddenSkill(event.hsskill);
							if(event.prompt2) next.set('prompt2',event.prompt2);
							next.ai=function(){
								var eff=0;
								for(var i=0;i<event.targets2.length;i++){
									eff+=get.effect(event.targets2[i],card,player,player);
								}
								return eff>0;
							};
						}
					}
					else{
						if(event.filterTarget){
							var targets=game.filterPlayer(function(current){
								return event.filterTarget(card,player,current);
							});
							if(targets.length<range[0]){
								event._result={bool:false};
								return;
							}
							else if(!info.complexTarget&&targets.length==range[0]&&range[0]==range[1]){
								event.targets2=targets;
								event._result={bool:true};
								return;
							}
						}
						var next=player.chooseTarget();
						next.set('_get_card',card);
						next.set('filterTarget',event.filterTarget||function(card,player,target){
							if(!_status.event.targets.contains(target)) return false;
							if(!_status.event.nodistance&&!lib.filter.targetInRange(card,player,target)) return false;
							return lib.filter.targetEnabledx(card,player,target);
						});
						next.set('ai',event.ai||get.effect_use);
						next.set('selectTarget',event.selectTarget||lib.filter.selectTarget);
						if(event.nodistance) next.set('nodistance',true);
						if(event.forced) next.set('forced',true);
						if(event.addCount!==false) next.set('addCount_extra',true);
						next.set('targets',targets);
						next.set('prompt',event.prompt||('选择'+get.translation(card)+'的目标'));
						if(event.prompt2) next.set('prompt2',event.prompt2);
						if(event.hsskill) next.setHiddenSkill(event.hsskill);
					}
					'step 1'
					if(result.bool){
						event.result={
							bool:true,
							targets:event.targets2||result.targets,
						};
						var next=player.useCard(card,event.targets2||result.targets);
						next.oncard=event.oncard;
						if(cards) next.cards=cards.slice(0);
						if(event.nopopup) next.nopopup=true;
						if(event.animate===false) next.animate=false;
						if(event.throw===false) next.throw=false;
						if(event.addCount===false) next.addCount=false;
						if(event.noTargetDelay) next.targetDelay=false;
						if(event.nodelayx) next.delayx=false;
						if(event.logSkill){
							if(typeof event.logSkill=='string'){
								next.skill=event.logSkill;
							}
							else if(Array.isArray(event.logSkill)){
								player.logSkill.apply(player,event.logSkill);
							}
						}
					}
					else event.result={bool:false};
				},
				chooseToDuiben:function(){
					'step 0'
					if(!event.namelist) event.namelist=['全军出击','分兵围城','奇袭粮道','开城诱敌'];
					game.broadcastAll(function(list){
						var list2=['db_atk1','db_atk2','db_def1','db_def2'];
						for(var i=0;i<4;i++){
							lib.card[list2[i]].image='card/'+list2[i]+(list[0]=='全军出击'?'':'_'+list[i]);
							lib.translate[list2[i]]=list[i];
						}
					},event.namelist);
					if(!event.title) event.title='对策';
					game.log(player,'向',target,'发起了','#y'+event.title);
					if(!event.ai) event.ai=function(){return 1+Math.random()};
					if(_status.connectMode){
						player.chooseButtonOL([
							[player,[event.title+'：请选择一种策略',[[['','','db_def2'],['','','db_def1']],'vcard']],true],
							[target,[event.title+'：请选择一种策略',[[['','','db_atk1'],['','','db_atk2']],'vcard']],true]
						],function(){},event.ai).set('switchToAuto',function(){
							_status.event.result='ai';
						}).set('processAI',function(){
							var buttons=_status.event.dialog.buttons;
							return {
								bool:true,
								links:[buttons.randomGet().link],
							}
						});
					}
					'step 1'
					if(_status.connectMode){
						event.mes=result[player.playerid].links[0][2];
						event.tes=result[target.playerid].links[0][2];
						event.goto(4);
					}
					else{
						player.chooseButton([event.title+'：请选择一种策略',[[['','','db_def2'],['','','db_def1']],'vcard']],true).ai=event.ai;
					}
					'step 2'
					event.mes=result.links[0][2];
					target.chooseButton([event.title+'：请选择一种策略',[[['','','db_atk1'],['','','db_atk2']],'vcard']],true).ai=event.ai;
					'step 3'
					event.tes=result.links[0][2];
					'step 4'
					game.broadcast(function(){
						ui.arena.classList.add('thrownhighlight');
					});
					ui.arena.classList.add('thrownhighlight');
					game.addVideo('thrownhighlight1');
					target.$compare(game.createCard(event.tes,'',''),player,game.createCard(event.mes,'',''));
					game.log(target,'选择的策略为','#g'+get.translation(event.tes));
					game.log(player,'选择的策略为','#g'+get.translation(event.mes));
					game.delay(0,1500);
					'step 5'
					var mes=event.mes.slice(6);
					var tes=event.tes.slice(6);
					var str;
					if(mes==tes){
						str=get.translation(player)+event.title+'成功';
						player.popup('胜','wood');
						target.popup('负','fire');
						game.log(player,'#g胜');
						event.result={bool:true};
					}
					else{
						str=get.translation(player)+event.title+'失败';
						target.popup('胜','wood');
						player.popup('负','fire');
						game.log(target,'#g胜');
						event.result={bool:false};
					}
					event.result.player=event.mes;
					event.result.target=event.tes;
					game.broadcastAll(function(str){
						var dialog=ui.create.dialog(str);
						dialog.classList.add('center');
						setTimeout(function(){
							dialog.close();
						},1000);
					},str);
					game.trySkillAudio(event.getParent().name+'_'+(event.result.bool?'true'+mes:'false'),player);
					game.delay(2);
					'step 6'
					game.broadcastAll(function(){
						ui.arena.classList.remove('thrownhighlight');
					});
					game.addVideo('thrownhighlight2');
					if(event.clear!==false){
						game.broadcastAll(ui.clear);
					}
				},
				chooseToPSS:function(){
					'step 0'
					game.log(player,'对',target,'发起了猜拳');
					if(_status.connectMode){
						player.chooseButtonOL([
							[player,['猜拳：请选择一种手势',[[['','','pss_stone'],['','','pss_scissor'],['','','pss_paper']],'vcard']],true],
							[target,['猜拳：请选择一种手势',[[['','','pss_stone'],['','','pss_scissor'],['','','pss_paper']],'vcard']],true]
						],function(){},function(){return 1+Math.random()}).set('switchToAuto',function(){
							_status.event.result='ai';
						}).set('processAI',function(){
							var buttons=_status.event.dialog.buttons;
							return {
								bool:true,
								links:[buttons.randomGet().link],
							}
						});
					}
					'step 1'
					if(_status.connectMode){
						event.mes=result[player.playerid].links[0][2];
						event.tes=result[target.playerid].links[0][2];
						event.goto(4);
					}
					else{
						player.chooseButton(['猜拳：请选择一种手势',[[['','','pss_stone'],['','','pss_scissor'],['','','pss_paper']],'vcard']],true).ai=function(){return 1+Math.random()};
					}
					'step 2'
					event.mes=result.links[0][2];
					target.chooseButton(['猜拳：请选择一种手势',[[['','','pss_stone'],['','','pss_scissor'],['','','pss_paper']],'vcard']],true).ai=function(){return 1+Math.random()};
					'step 3'
					event.tes=result.links[0][2];
					'step 4'
					game.broadcast(function(){
						ui.arena.classList.add('thrownhighlight');
					});
					ui.arena.classList.add('thrownhighlight');
					game.addVideo('thrownhighlight1');
					player.$compare(game.createCard(event.mes,'',''),target,game.createCard(event.tes,'',''));
					game.log(player,'选择的手势为','#g'+get.translation(event.mes));
					game.log(target,'选择的手势为','#g'+get.translation(event.tes));
					game.delay(0,1500);
					'step 5'
					var mes=event.mes.slice(4);
					var tes=event.tes.slice(4);
					var str;
					if(mes==tes){
						str='二人平局';
						player.popup('平','metal');
						target.popup('平','metal');
						game.log('猜拳的结果为','#g平局');
						event.result={tie:true};
					}
					else{
						if({paper:'stone',scissor:'paper',stone:'scissor'}[mes]==tes){
							str=get.translation(player)+'胜利';
							player.popup('胜','wood');
							target.popup('负','fire');
							game.log(player,'#g胜');
							event.result={bool:true};
						}
						else{
							str=get.translation(target)+'胜利';
							target.popup('胜','wood');
							player.popup('负','fire');
							game.log(target,'#g胜');
							event.result={bool:false};
						}
					}
					game.broadcastAll(function(str){
						var dialog=ui.create.dialog(str);
						dialog.classList.add('center');
						setTimeout(function(){
							dialog.close();
						},1000);
					},str);
					game.delay(2);
					'step 6'
					game.broadcastAll(function(){
						ui.arena.classList.remove('thrownhighlight');
					});
					game.addVideo('thrownhighlight2');
					if(event.clear!==false){
						game.broadcastAll(ui.clear);
					}
				},
				cardsDiscard:function(){
					game.getGlobalHistory().cardMove.push(event);
					var withPile=false;
					for(var i=0;i<cards.length;i++){
						if(get.position(cards[i],true)=='c') withPile=true;
						cards[i].discard();
					}
					if(withPile) game.updateRoundNumber();
				},
				orderingDiscard:function(){
					var cards=event.relatedEvent.orderingCards.slice(0);
					for(var i=0;i<cards.length;i++){
						if(get.position(cards[i],true)!='o') cards.splice(i--,1);
					}
					if(cards.length) game.cardsDiscard(cards);
				},
				cardsGotoOrdering:function(){
					game.getGlobalHistory().cardMove.push(event);
					var withPile=false;
					for(var i=0;i<cards.length;i++){
						if(get.position(cards[i],true)=='c') withPile=true;
						cards[i].fix();
						ui.ordering.appendChild(cards[i]);
					}
					if(withPile) game.updateRoundNumber();
					var evt=event.relatedEvent||event.getParent();
					if(!evt.orderingCards) evt.orderingCards=[];
					if(!evt.noOrdering&&!evt.cardsOrdered){
						evt.cardsOrdered=true;
						var next=game.createEvent('orderingDiscard',false,evt.getParent());
						next.relatedEvent=evt;
						next.setContent('orderingDiscard');
					}
					if(!evt.noOrdering) evt.orderingCards.addArray(cards);
				},
				cardsGotoSpecial:function(){
					game.getGlobalHistory().cardMove.push(event);
					var withPile=false;
					for(var i=0;i<cards.length;i++){
						if(get.position(cards[i],true)=='c') withPile=true;
						cards[i].fix();
						ui.special.appendChild(cards[i]);
					}
					if(withPile) game.updateRoundNumber();
					if(event.toRenku){
						_status.renku.addArray(cards);
						if(_status.renku.length>6){
							var cards=_status.renku.splice(0,_status.renku.length-6);
							game.log(cards,'从仁库进入了弃牌堆');
							game.cardsDiscard(cards).set('outRange',true).fromRenku=true;
						}
						game.updateRenku();
					}
				},
				cardsGotoPile:function(){
					if(event.washCard){
						event.trigger('washCard')
						for(var i=0;i<lib.onwash.length;i++){
							if(lib.onwash[i]()=='remove'){
								lib.onwash.splice(i--,1);
							}
						}
					}
					game.getGlobalHistory().cardMove.push(event);
					if(!event._triggeronly) game.$cardsGotoPile(event);
				},
				chooseToEnable:function(){
					'step 0'
					var list=[];
					for(var i=1;i<=5;i++){
						if(player.hasDisabledSlot(i))  list.push('equip'+i);
					}
					if(!list.length) event.finish();
					else if(list.length==1){
						event.list=list;
						event._result={control:list[0]};
					}
					else{
						var next=player.chooseControl(list);
						next.set('prompt','请选择恢复一个装备栏');
						if(!event.ai) event.ai=function(event,player,list){
							return list.randomGet();
						}
						event.ai=event.ai(event.getParent(),player,list);
						next.ai=function(){
							return event.ai;
						};
					}
					'step 1'
					event.result={control:result.control};
					player.enableEquip(result.control);
				},
				chooseToDisable:function(){
					'step 0'
					var list=[];
					for(var i=1;i<=5;i++){
						if(player.hasEnabledSlot(i)) list.push('equip'+i);
					}
					if(event.horse){
						if(list.contains('equip3')&&list.contains('equip4')) list.push('equip3_4');
						list.remove('equip3');
						list.remove('equip4');
					}
					if(!list.length) event.finish();
					else if(list.length==1){
						event.list=list;
						event._result={control:list[0]};
					}
					else{
						list.sort();
						event.list=list;
						var next=player.chooseControl(list);
						next.set('prompt','请选择废除一个装备栏');
						if(!event.ai) event.ai=function(event,player,list){
							return list.randomGet();
						}
						event.ai=event.ai(event.getParent(),player,list);
						next.ai=function(){
							return event.ai;
						};
					}
					'step 1'
					event.result={control:result.control};
					if(result.control=='equip3_4'){
						player.disableEquip(3,4);
					}
					else player.disableEquip(result.control);
				},
				swapEquip:function(){
					"step 0"
					game.log(player,'和',target,'交换了装备区中的牌')
					event.cards=[player.getCards('e'),target.getCards('e')];
					game.loseAsync({
						player:player,
						target:target,
						cards1:event.cards[0],
						cards2:event.cards[1],
					}).setContent('swapHandcardsx');
					"step 1"
					for(var i=0;i<event.cards[1].length;i++){
						if(get.position(event.cards[1][i],true)=='o') player.equip(event.cards[1][i]);
					}
					for(var i=0;i<event.cards[0].length;i++){
						if(get.position(event.cards[0][i],true)=='o') target.equip(event.cards[0][i]);
					}
				},
				disableJudge:function(){
					'step 0'
					game.log(player,'废除了判定区');
					var js=player.getCards('j');
					if(js.length) player.discard(js);
					player.storage._disableJudge=true;
					//player.markSkill('_disableJudge');
					'step 1'
					game.broadcastAll(function(player,card){
						player.$disableJudge();
					},player);
				},
				enableJudge:function(){
					if(!player.storage._disableJudge) return;
					game.log(player,'恢复了判定区');
					game.broadcastAll(function(player){
						player.$enableJudge();
					},player);
				},
				/*----分界线----*/
				phasing:function(){
					'step 0'
					while(ui.dialogs.length){
						ui.dialogs[0].close();
					}
					game.phaseNumber++;
					player.phaseNumber++;
					game.broadcastAll(function(player,player2,num,popup){
						if(lib.config.glow_phase){
							if(player2) player2.classList.remove('glow_phase');
							player.classList.add('glow_phase');
						}
						player.phaseNumber=num;
						if(popup&&lib.config.show_phase_prompt) player.popup('回合开始',null,false);
					},player,_status.currentPhase,player.phaseNumber,!player.noPhaseDelay);
					_status.currentPhase=player;
					_status.discarded=[];
					game.syncState();
					game.addVideo('phaseChange',player);
					if(game.phaseNumber==1){
						delete player._start_cards;
						if(lib.configOL.observe){
							lib.configOL.observeReady=true;
							game.send('server','config',lib.configOL);
						}
					}
					game.log();
					game.log(player,'的回合开始');
					player._noVibrate=true;
					if(get.config('identity_mode')!='zhong'&&get.config('identity_mode')!='purple'&&!_status.connectMode){
						var num;
						switch(get.config('auto_identity')){
							case 'one':num=1;break;
							case 'two':num=2;break;
							case 'three':num=3;break;
							case 'always':num=-1;break;
							default:num=0;break;
						}
						if(num&&!_status.identityShown&&game.phaseNumber>game.players.length*num&&game.showIdentity){
							if(!_status.video) player.popup('显示身份');
							_status.identityShown=true;
							game.showIdentity(false);
						}
					}
					player.ai.tempIgnore=[];
					if(ui.land&&ui.land.player==player){
						game.addVideo('destroyLand');
						ui.land.destroy();
					}
					'step 1'
					event.trigger('phaseBeginStart');
				},
				toggleSubPlayer:function(){
					'step 0'
					var list=event.list||player.storage.subplayer.skills.slice(0);
					list.remove(player.storage.subplayer.name2);
					event.list=list;
					if(!event.directresult){
						if(list.length>1){
							var dialog=ui.create.dialog('更换一个随从','hidden');
							dialog.add([list,'character']);
							player.chooseButton(dialog,true);
						}
						else if(list.length==1){
							event.directresult=list[0];
						}
						else{
							event.finish();
						}
					}
					else{
						if(!list.contains(event.directresult)){
							event.finish();
						}
					}
					'step 1'
					if(!event.directresult){
						if(result&&result.bool&&result.links[0]){
							event.directresult=result.links[0];
						}
						else{
							event.finish();
							return;
						}
					}
					if(player.storage.subplayer){
						var current=player.storage.subplayer.name2;
						if(event.directresult==current){
							event.finish();
							return;
						}
						player.storage[current].hp=player.hp;
						player.storage[current].maxHp=player.maxHp;
						player.storage[current].hs=player.getCards('h');
						player.storage[current].es=player.getCards('e');
						player.lose(player.getCards('he'),ui.special)._triggered=null;

						var cfg=player.storage[event.directresult];
						player.storage.subplayer.name2=event.directresult;
						player.reinit(current,event.directresult,[
							cfg.hp,
							cfg.maxHp
						]);
						if(cfg.hs.length) player.directgain(cfg.hs);
						if(cfg.es.length) player.directequip(cfg.es);
					}
				},
				exitSubPlayer:function(){
					'step 0'
					if(player.storage.subplayer){
						var current=player.storage.subplayer.name2;
						if(event.remove){
							player.lose(player.getCards('he'),ui.discardPile)._triggered=null;
						}
						else{
							player.storage[current].hp=player.hp;
							player.storage[current].maxHp=player.maxHp;
							player.storage[current].hs=player.getCards('h');
							player.storage[current].es=player.getCards('e');
							player.lose(player.getCards('he'),ui.special)._triggered=null;
						}
						player.reinit(current,player.storage.subplayer.name,[
							player.storage.subplayer.hp,
							player.storage.subplayer.maxHp
						]);
						player.update();
						if(event.remove){
							if(player.storage[current].onremove){
								player.storage[current].onremove(player);
							}
							delete player.storage[current];
							player.storage.subplayer.skills.remove(current);
							game.log(player,'牺牲了随从','#g'+current);
						}
						else{
							game.log(player,'收回了随从','#g'+current);
						}
						player.addSkill(player.storage.subplayer.skills);
					}
					'step 1'
					if(player.storage.subplayer){
						player.directgain(player.storage.subplayer.hs);
						player.directequip(player.storage.subplayer.es);
					}
					player.removeSkill('subplayer');
					'step 2'
					if(event.remove){
						event.trigger('subPlayerDie');
					}
				},
				callSubPlayer:function(){
					'step 0'
					var list=player.getSubPlayers(event.tag);
					event.list=list;
					if(!event.directresult){
						if(list.length>1){
							var dialog=ui.create.dialog('调遣一个随从','hidden');
							dialog.add([list,'character']);
							player.chooseButton(dialog,true);
						}
						else if(list.length==1){
							event.directresult=list[0];
						}
						else{
							event.finish();
						}
					}
					else{
						if(!list.contains(event.directresult)){
							event.finish();
						}
					}
					'step 1'
					if(!event.directresult){
						if(result&&result.bool&&result.links[0]){
							event.directresult=result.links[0];
						}
						else{
							event.finish();
							return;
						}
					}
					if(event.directresult){
						var cfg=player.storage[event.directresult];
						var source=cfg.source||player.name;
						var name=event.directresult;
						game.log(player,'调遣了随从','#g'+name);
						player.storage.subplayer={
							name:source,
							name2:event.directresult,
							hp:player.hp,
							maxHp:player.maxHp,
							skills:event.list.slice(0),
							hs:player.getCards('h'),
							es:player.getCards('e'),
							intro2:cfg.intro2
						}
						player.removeSkill(event.list);
						player.reinit(source,name,[cfg.hp,cfg.maxHp]);
						player.addSkill('subplayer');
						player.lose(player.getCards('he'),ui.special)._triggered=null;
						if(cfg.hs.length) player.directgain(cfg.hs);
						if(cfg.es.length) player.directequip(cfg.es);
					}
					'step 2'
					game.delay();
				},
				addExtraTarget:function(){
					"step 0"
					event.num=0;
					"step 1"
					var target=targets[num],info=get.info(card);
					if(target==event.target&&event.addedTarget){
						event.addedTargets[num]=event.addedTarget;
						event._result={bool:false};
					}
					else if(game.hasPlayer(function(current){
						return info.filterAddedTarget(card,player,current,target)
					})){
						var next=player.chooseTarget(get.translation(event.card)+'：选择'+get.translation(targets[num])+'对应的指向目标',function(card,player,target){
							var card=get.card(),info=get.info(card);
							return info.filterAddedTarget(card,player,target,_status.event.preTarget)
						},true);
						next.set('_get_card',card);
						next.set('preTarget',targets[num]);
					}
					else{
						event.addedTargets[num]=false;
						event._result={bool:false};
					}
					"step 2"
					if(result.bool){
						event.addedTargets[num]=result.targets[0];
						player.line2([targets[num],result.targets[0]]);
					}
					event.num++;
					if(event.num<targets.length) event.goto(1);
				},
				reverseOrder:function(){
					"step 0"
					game.delay();
					"step 1"
					var choice;
					if(get.tag(card,'multineg')){
						choice=(player.previous.side==player.side)?'逆时针':'顺时针';
					}
					else{
						choice=(player.next.side==player.side)?'逆时针':'顺时针';
					}
					player.chooseControl('顺时针','逆时针',function(event,player){
						return _status.event.choice||'逆时针';
					}).set('prompt','选择'+get.translation(card)+'的结算方向').set('choice',choice).set('forceDie',true);
					"step 2"
					if(result&&result.control=='顺时针'){
						var evt=event.getParent(),sorter=(_status.currentPhase||player);
						evt.fixedSeat=true;
						evt.targets.sortBySeat(sorter);
						evt.targets.reverse();
						if(evt.targets[evt.targets.length-1]==sorter){
							evt.targets.unshift(evt.targets.pop());
						}
					}
				},
				addJudgeCard:function(){
					if(lib.filter.judge(card,player,target)&&cards.length&&get.position(cards[0],true)=='o') target.addJudge(card,cards);
				},
				equipCard:function(){
					if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
				},
				gameDraw:function(){
					"step 0"
					if(_status.brawl&&_status.brawl.noGameDraw){
						event.finish();
						return;
					}
					var end=player;
					var numx=num;
					do{
						if(typeof num=='function'){
							numx=num(player);
						}
						if(player.getTopCards) player.directgain(player.getTopCards(numx));
						else player.directgain(get.cards(numx));
						if(player.singleHp===true&&get.mode()!='guozhan'&&(lib.config.mode!='doudizhu'||_status.mode!='online')){
							player.doubleDraw();
						}
						player._start_cards=player.getCards('h');
						player=player.next;
					}
					while(player!=end);
					event.changeCard=get.config('change_card');
					if(_status.connectMode||(lib.config.mode=='doudizhu'&&_status.mode=='online')||lib.config.mode!='identity'&&lib.config.mode!='guozhan'&&lib.config.mode!='doudizhu'){
						event.changeCard='disabled';
					}
					"step 1"
					if(event.changeCard!='disabled'&&!_status.auto){
						event.dialog=ui.create.dialog('是否使用手气卡？');
						ui.create.confirm('oc');
						event.custom.replace.confirm=function(bool){
							_status.event.bool=bool;
							game.resume();
						}
					}
					else{
						event.finish();
					}
					"step 2"
					if(event.changeCard=='once'){
						event.changeCard='disabled';
					}
					else if(event.changeCard=='twice'){
						event.changeCard='once';
					}
					else if(event.changeCard=='disabled'){
						event.bool=false;
						return;
					}
					_status.imchoosing=true;
					event.switchToAuto=function(){
						_status.event.bool=false;
						game.resume();
					}
					game.pause();
					"step 3"
					_status.imchoosing=false;
					if(event.bool){
						if(game.changeCoin){
							game.changeCoin(-3);
						}
						var hs=game.me.getCards('h');
						game.addVideo('lose',game.me,[get.cardsInfo(hs),[],[],[]]);
						for(var i=0;i<hs.length;i++){
							hs[i].discard(false);
						}
						game.me.directgain(get.cards(hs.length));
						event.goto(2);
					}
					else{
						if(event.dialog) event.dialog.close();
						if(ui.confirm) ui.confirm.close();
						game.me._start_cards=game.me.getCards('h');
						event.finish();
					}
				},
				phaseLoop:function(){
					"step 0"
					var num=1,current=player;
					while(current.getSeatNum()==0){
						current.setSeatNum(num);
						current=current.next;
						num++;
					}
					"step 1"
					for(var i=0;i<lib.onphase.length;i++){
						lib.onphase[i]();
					}
					player.phase();
					"step 2"
					if(!game.players.contains(event.player.next)){
						event.player=game.findNext(event.player.next);
					}
					else{
						event.player=event.player.next;
					}
					event.goto(1);
				},
				loadPackage:function(){
					'step 0'
					if(event.packages.length){
						window.game=game;
						var pack=event.packages.shift().split('/');
						lib.init.js(lib.assetURL+pack[0],pack[1],game.resume);
						game.pause();
					}
					else{
						event.finish();
					}
					'step 1'
					if(!lib.config.dev) delete window.game;
					var character=lib.imported.character;
					var card=lib.imported.card;
					var i,j,k;
					for(i in character){
						if(character[i].character){
							var characterPack=lib.characterPack[i];
							if(characterPack) Object.assign(characterPack,character[i].character);
							else lib.characterPack[i]=character[i].character;
						}
						if(character[i].forbid&&character[i].forbid.contains(lib.config.mode)) continue;
						if(character[i].mode&&character[i].mode.contains(lib.config.mode)==false) continue;

						if(Array.isArray(lib[j])&&Array.isArray(character[i][j])){
							lib[j].addArray(character[i][j]);
							continue;
						}
						for(j in character[i]){
							if(j=='mode'||j=='forbid'||j=='characterSort') continue;
							for(k in character[i][j]){
								if(j=='character'){
									if(!character[i][j][k][4]){
										character[i][j][k][4]=[];
									}
									if(character[i][j][k][4].contains('boss')||
										character[i][j][k][4].contains('hiddenboss')){
										lib.config.forbidai.add(k);
									}
									if(lib.config.forbidai_user&&lib.config.forbidai_user.contains(k)){
										lib.config.forbidai.add(k);
									}
									for(var l=0;l<character[i][j][k][3].length;l++){
										lib.skilllist.add(character[i][j][k][3][l]);
									}
								}
								if(j=='translate'&&k==i){
									lib[j][k+'_character_config']=character[i][j][k];
								}
								else{
									if(lib[j][k]==undefined){
										Object.defineProperty(lib[j],k,Object.getOwnPropertyDescriptor(character[i][j],k));
									}
									else if(Array.isArray(lib[j][k])&&Array.isArray(character[i][j][k])){
										lib[j][k].addArray(character[i][j][k]);
									}
									else{
										console.log(
											`dublicate ${j} in character ${i}:\n${k}:\nlib.${j}.${k}`,
											lib[j][k],
											`\ncharacter.${i}.${j}.${k}`,
											character[i][j][k]
										);
									}
								}
							}
						}
					}
					for(i in card){
						var cardPack=lib.cardPack[i]?lib.cardPack[i]:lib.cardPack[i]=[];
						if(card[i].card){
							for(var j in card[i].card){
								if(!card[i].card[j].hidden&&card[i].translate[j+'_info']){
									cardPack.push(j);
								}
							}
						}
						for(j in card[i]){
							if(j=='mode'||j=='forbid') continue;
							if(j=='list') continue;
							for(k in card[i][j]){
								if(j=='skill'&&k[0]=='_'&&!lib.config.cards.contains(i)){
									continue;
								}
								if(j=='translate'&&k==i){
									lib[j][k+'_card_config']=card[i][j][k];
								}
								else{
									if(lib[j][k]==undefined) Object.defineProperty(lib[j],k,Object.getOwnPropertyDescriptor(card[i][j],k));
									else{
										console.log(
											`dublicate ${j} in card ${i}:\n${k}\nlib.${j}.${k}`,
											lib[j][k],
											`\ncard.${i}.${j}.${k}`,
											card[i][j][k]
										);
									}
								}
							}
						}
					}
					event.goto(0);
				},
				loadMode:function(){
					'step 0'
					window.game=game;
					lib.init.js(lib.assetURL+'mode',event.mode,game.resume);
					game.pause();
					'step 1'
					if(!lib.config.dev) delete window.game;
					event.result=lib.imported.mode[event.mode];
					delete lib.imported.mode[event.mode];
				},
				forceOver:function(){
					'step 0'
					while(ui.controls.length){
						ui.controls[0].close();
					}
					while(ui.dialogs.length){
						ui.dialogs[0].close();
					}
					'step 1'
					if(event.bool!='noover'){
						game.over(event.bool);
					}
					if(event.callback){
						event.callback();
					}
				},
				arrangeTrigger:function(){
					'step 0'
					event.filter1=function(info){
						if(info[1].isDead()&&!lib.skill[info[0]].forceDie) return false;
						if(info[1].isOut()&&!lib.skill[info[0]].forceOut) return false;
						return lib.filter.filterTrigger(trigger,info[1],event.triggername,info[0]);
					}
					event.filter2=function(info2){
						var info=lib.skill[info2[0]];
						if(!lib.translate[info2[0]]||info.silent) return false;
						return true;
					}
					event.filter3=function(info,info2){
						return event.filter2(info2)&&event.filter1(info2)&&info2[1]==info[1]&&info[2]==info2[2]&&(lib.skill.global.contains(info2[0])||info[1].hasSkill(info2[0],true));
					}
					'step 1'
					if(trigger.filterStop&&trigger.filterStop()){
						event.finish();
					}
					else if(event.list.length){
						var info=event.list.shift();
						game.createTrigger(event.triggername,info[0],info[1],trigger);
						event.redo();
					}
					'step 2'
					if(!event.map.length){
						if(event.list2.length){
							var info=event.list2.shift();
							game.createTrigger(event.triggername,info[0],info[1],trigger);
							event.redo();
						}
						else{
							if(trigger._triggering==this){
								delete trigger._triggering;
							}
							event.finish();
							return;
						}
					};
					event.doing=event.map.shift();
					'step 3'
					event.num=0;
					var bool=false;
					var list=event.doing.list;
					for(var i=0;i<list.length;i++){
						if(event.filter1(list[i])){
							event.num=i;
							bool=true;
							break;
						}
					}
					if(!bool){event.goto(2);return;}
					var priority=list[event.num][2];
					for(var i=0;i<event.num;i++){
						if(event.doing.list[i][2]>priority){
							event.doing.list.splice(i--,1);
							event.num--;
						}
					}
					event.choice=[];
					if(event.num<event.doing.list.length-1&&event.filter2(event.doing.list[event.num])){
						var current=event.doing.list[event.num];
						event.choice.push(current);
						for(var i=event.num+1;i<event.doing.list.length;i++){
							if(event.filter3(current,event.doing.list[i])) event.choice.push(event.doing.list[i]);
						}
					}
					if(event.choice.length<2) event.goto(6);
					'step 4'
					var controls=[];
					event.current=event.choice[0][1]
					for(var i=0;i<event.choice.length;i++){
						controls.push(event.choice[i][0]);
					}
					event.current.chooseControl(controls)
					.set('prompt','选择下一个触发的技能').set('forceDie',true).set('arrangeSkill',true).set('includeOut',true)
					'step 5'
					if(result.control){
						for(var i=0;i<event.doing.list.length;i++){
							if(event.doing.list[i][0]==result.control&&event.doing.list[i][1]==event.current){
								event.num=i;break;
							}
						}
					}
					'step 6'
					var info=event.doing.list[event.num];
					if(info){
						event.doing.list2.push(info);
						event.doing.list.splice(event.num,1);
						game.createTrigger(event.triggername,info[0],info[1],trigger);
					}
					'step 7'
					if(trigger.filterStop&&trigger.filterStop()){
						event.finish();
					}
					else event.goto(event.doing.list.length?3:2);
				},
				createTrigger:function(){
					"step 0"
					//console.log('triggering: ' + player.name+ ' \'s skill: ' + event.skill+' in ' + event.triggername)
					if(lib.filter.filterTrigger(trigger,player,event.triggername,event.skill)){
						var fullskills=game.expandSkills(player.getSkills().concat(lib.skill.global));
						if(!fullskills.contains(event.skill)){
							var info=get.info(event.skill);
							var hidden=player.hiddenSkills.slice(0);
							var invisible=player.invisibleSkills.slice(0);
							game.expandSkills(hidden);
							game.expandSkills(invisible);
							if(hidden.contains(event.skill)){
								if(!info.silent&&player.hasSkillTag('nomingzhi',false,null,true)){
									event.finish();
								}
								else if(!info.direct){
									event.trigger('triggerHidden');
								}
								else{
									event.skillHidden=true;
								}
							}
							else if(invisible.contains(event.skill)){
								event.trigger('triggerInvisible');
							}
							else{
								var keep=false;
								for(var i in player.additionalSkills){
									if(i.startsWith('hidden:')&&game.expandSkills(player.additionalSkills[i]).contains(event.skill)){
										keep=true;break;
									}
								}
								if(!keep){
									event.finish();
								}
							}
						}
					}
					else{
						event.finish();
					}
					"step 1"
					if(event.cancelled){
						event.finish();
						return;
					}
					var info=get.info(event.skill);
					if(!event.revealed&&!info.forced){
						var checkFrequent=function(info){
							if(player.hasSkillTag('nofrequent',false,event.skill)) return false;
							if(typeof info.frequent=='boolean') return info.frequent;
							if(typeof info.frequent=='function') return info.frequent(trigger,player);
							if(info.frequent=='check'&&typeof info.check=='function') return info.check(trigger,player);
							return false;
						}
						if(info.direct&&player.isUnderControl()){
							game.swapPlayerAuto(player);
							event._result={bool:true};
							event._direct=true;
						}
						else if(info.direct){
							event._result={bool:true};
							event._direct=true;
						}
						else if(info.direct&&player.isOnline()){
							event._result={bool:true};
							event._direct=true;
						}
						else{
							if(checkFrequent(info)){
								event.frequentSkill=true;
							}
							var str;
							var check=info.check;
							if(info.prompt) str=info.prompt;
							else{
								if(typeof info.logTarget=='string'){
									str=get.prompt(event.skill,trigger[info.logTarget],player);
								}
								else if(typeof info.logTarget=='function'){
									var logTarget=info.logTarget(trigger,player);
									if(get.itemtype(logTarget).startsWith('player')) str=get.prompt(event.skill,logTarget,player);
								}
								else{
									str=get.prompt(event.skill,null,player);
								}
							}
							if(typeof str=='function'){str=str(trigger,player)}
							var next=player.chooseBool(str);
							if(event.frequentSkill) next.set('frequentSkill',event.skill);
							next.set('forceDie',true);
							next.set('includeOut',true);
							next.ai=function(){
								return !check||check(trigger,player);
							};
							if(typeof info.prompt2=='function'){
								next.set('prompt2',info.prompt2(trigger,player));
							}
							else if(typeof info.prompt2=='string'){
								next.set('prompt2',info.prompt2);
							}
							else if(info.prompt2!=false){
								if(lib.dynamicTranslate[event.skill]) next.set('prompt2',lib.dynamicTranslate[event.skill](player,event.skill));
								else if(lib.translate[event.skill+'_info']) next.set('prompt2',lib.translate[event.skill+'_info']);
							}
							if(trigger.skillwarn){
								if(next.prompt2){
									next.set('prompt2','<span class="thundertext">'+trigger.skillwarn+'。</span>'+next.prompt2);
								}
								else{
									next.set('prompt2',trigger.skillwarn);
								}
							}
						}
					}
					"step 2"
					var info=get.info(event.skill);
					if(result&&result.bool!=false){
						var autodelay=info.autodelay;
						if(typeof autodelay=='function'){
							autodelay=autodelay(trigger,player);
						}
						if(autodelay&&(info.forced||!event.isMine())){
							if(typeof autodelay=='number'){
								game.delayx(autodelay);
							}
							else{
								game.delayx();
							}
						}
					}
					"step 3"
					var info=get.info(event.skill);
					if(result&&result.bool==false){
						if(info.oncancel) info.oncancel(trigger,player);
						event.finish();
						return;
					}
					if(info.popup!=false&&!info.direct){
						if(info.popup){
							player.popup(info.popup);
							game.log(player,'发动了','【'+get.skillTranslation(event.skill,player)+'】');
						}
						else{
							if(info.logTarget&&info.logLine!==false){
								if(typeof info.logTarget=='string'){
									player.logSkill(event.skill,trigger[info.logTarget],info.line);
								}
								else if(typeof info.logTarget=='function'){
									player.logSkill(event.skill,info.logTarget(trigger,player),info.line);
								}
							}
							else{
								player.logSkill(event.skill,false,info.line);
							}
						}
					}
					var next=game.createEvent(event.skill);
					if(typeof info.usable=='number'){
						player.addSkill('counttrigger');
						if(!player.storage.counttrigger){
							player.storage.counttrigger={};
						}
						if(!player.storage.counttrigger[event.skill]){
							player.storage.counttrigger[event.skill]=1;
						}
						else{
							player.storage.counttrigger[event.skill]++;
						}
					}
					next.player=player;
					next._trigger=trigger;
					next.triggername=event.triggername;
					next.setContent(info.content);
					next.skillHidden=event.skillHidden;
					if(info.forceDie) next.forceDie=true;
					if(info.forceOut||event.skill=='_turnover') next.includeOut=true;
					"step 4"
					if(player._hookTrigger){
						for(var i=0;i<player._hookTrigger.length;i++){
							var info=lib.skill[player._hookTrigger[i]].hookTrigger;
							if(info){
								if(info.after&&info.after(event,player,event.triggername)){
									event.trigger('triggerAfter');
									break;
								}
							}
						}
					}
				},
				playVideoContent:function(){
					'step 0'
					game.delay(0,500);
					'step 1'
					if(!game.chess){
						ui.control.innerHTML='';
						var nodes=[];
						for(var i=0;i<ui.arena.childNodes.length;i++){
							nodes.push(ui.arena.childNodes[i]);
						}
						for(var i=0;i<nodes.length;i++){
							if(nodes[i]==ui.canvas) continue;
							if(nodes[i]==ui.control) continue;
							if(nodes[i]==ui.mebg) continue;
							if(nodes[i]==ui.me) continue;
							if(nodes[i]==ui.roundmenu) continue;
							nodes[i].remove();
						}
						ui.sidebar.innerHTML='';
						ui.cardPile.innerHTML='';
						ui.discardPile.innerHTML='';
						ui.special.innerHTML='';
						ui.ordering.innerHTML='';
					}
					ui.system.firstChild.innerHTML='';
					ui.system.lastChild.innerHTML='';
					ui.system.firstChild.appendChild(ui.config2);
					if(ui.updateVideoMenu){
						ui.updateVideoMenu();
					}
					_status.videoDuration=1;
					ui.create.system('返回',function(){
						var mode=localStorage.getItem(lib.configprefix+'playbackmode');
						if(mode){
							game.saveConfig('mode',mode);
						}
						game.reload();
					});
					ui.create.system('重播',function(){
						_status.replayvideo=true;
						game.playVideo(_status.playback,lib.config.mode);
					});
					ui.create.system('暂停',ui.click.pause,true).id='pausebutton';
					var slow=ui.create.system('减速',function(){
						_status.videoDuration*=1.5;
						updateDuration();
					},true);
					var fast=ui.create.system('加速',function(){
						_status.videoDuration/=1.5;
						updateDuration();
					},true);
					var updateDuration=function(){
						if(_status.videoDuration>1){
							slow.classList.add('glow');
						}
						else{
							slow.classList.remove('glow');
						}
						if(_status.videoDuration<1){
							fast.classList.add('glow');
						}
						else{
							fast.classList.remove('glow');
						}
					}
					ui.system.style.display='';
					ui.refresh(ui.system);
					ui.system.show();
					ui.window.show();
					if(lib.config.mode!='versus'&&lib.config.mode!='boss'){
						ui.arena.style.display='';
						ui.refresh(ui.arena);
						ui.arena.show();
					}
					if(!game.chess){
						game.playerMap={};
					}
					game.finishCards();
					'step 2'
					if(event.video.length){
						var content=event.video.shift();
						// console.log(content);
						if(content.type=='delay'){
							game.delay(content.content);
						}
						else if(content.type=='play'){
							window.play={};
							if(!event.playtoload){
								event.playtoload=1;
							}
							else{
								event.playtoload++;
							}
							var script=lib.init.js(lib.assetURL+'play',content.name);
							script.addEventListener('load',function(){
								var play=window.play[content.name]
								if(play&&play.video){
									play.video(content.init);
								}
								event.playtoload--;
								if(event.playtoload==0){
									delete window.play;
								}
							});
						}
						else if(typeof content.player=='string'&&game.playerMap[content.player]&&
							game.playerMap[content.player].classList&&
							!game.playerMap[content.player].classList.contains('obstacle')){
							game.videoContent[content.type](game.playerMap[content.player],content.content);
						}
						else{
							game.videoContent[content.type](content.content);
						}
						if(event.video.length){
							game.delay(0,_status.videoDuration*Math.min(2000,event.video[0].delay));
						}
						event.redo();
					}
					else{
						_status.over=true;
						ui.system.lastChild.hide();
						setTimeout(function(){
							ui.system.lastChild.innerHTML='';
						},500);
					}
				},
				waitForPlayer:function(){
					'step 0'
					ui.auto.hide();
					ui.pause.hide();

					game.createServer();
					if(!lib.translate.zhu){
						lib.translate.zhu='主';
					}
					if(event.func){
						event.func();
					}
					if(!lib.configOL.number){
						lib.configOL.number=parseInt(lib.configOL.player_number);
					}
					if(game.onlineroom){
						game.send('server','config',lib.configOL);
					}

					ui.create.connectPlayers(game.ip);
					if(!window.isNonameServer){
						var me=game.connectPlayers[0];
						me.setIdentity('zhu');
						me.initOL(get.connectNickname(),lib.config.connect_avatar);
						me.playerid='1';
						game.onlinezhu='1';
					}
					_status.waitingForPlayer=true;
					if(window.isNonameServer){
						document.querySelector('#server_status').innerHTML='等待中';
					}
					game.pause();
					'step 1'
					_status.waitingForPlayer=false;
					lib.configOL.gameStarted=true;
					if(window.isNonameServer){
						document.querySelector('#server_status').innerHTML='游戏中';
					}
					if(game.onlineroom){
						game.send('server','config',lib.configOL);
					}
					for(var i=0;i<game.connectPlayers.length;i++){
						game.connectPlayers[i].delete();
					}
					delete game.connectPlayers;
					if(ui.roomInfo){
						ui.roomInfo.remove();
						delete ui.roomInfo;
					}
					if(ui.exitroom){
						ui.exitroom.remove();
						delete ui.exitroom;
					}
					game.broadcast('gameStart');
					game.delay(2);
					ui.auto.show();
					ui.pause.show();
					if(lib.config.show_cardpile){
						ui.cardPileButton.style.display='';
					}
				},
				replaceHandcards:function(){
					'step 0'
					if(event.players.contains(game.me)){
						game.me.chooseBool('是否置换手牌？');
					}
					else{
						event.finish();
					}
					'step 1'
					if(result&&result.bool){
						var hs=game.me.getCards('h')
						for(var i=0;i<hs.length;i++){
							hs[i].discard(false);
						}
						var cards=get.cards(hs.length);
						game.me._start_cards=cards;
						game.me.directgain(cards);
					}
				},
				replaceHandcardsOL:function(){
					'step 0'
					var send=function(){
						game.me.chooseBool('是否置换手牌？');
						game.resume();
					};
					var sendback=function(result,player){
						if(result&&result.bool){
							var hs=player.getCards('h')
							game.broadcastAll(function(player,hs){
								game.addVideo('lose',player,[get.cardsInfo(hs),[],[],[]]);
								for(var i=0;i<hs.length;i++){
									hs[i].discard(false);
								}
							},player,hs);
							var cards=get.cards(hs.length);
							player.directgain(cards);
							player._start_cards=cards;
						}
					};
					for(var i=0;i<event.players.length;i++){
						if(event.players[i].isOnline()){
							event.withol=true;
							event.players[i].send(send);
							event.players[i].wait(sendback);
						}
						else if(event.players[i]==game.me){
							event.withme=true;
							game.me.chooseBool('是否置换手牌？');
							game.me.wait(sendback);
						}
					}
					'step 1'
					if(event.withme){
						game.me.unwait(result);
					}
					'step 2'
					if(event.withol&&!event.resultOL){
						game.pause();
					}
				},
				phase:function(){
					"step 0"
					player.phaseZhunbei();
					"step 1"
					player.phaseJudge();
					"step 2"
					player.phaseDraw();
					if(!player.noPhaseDelay){
						if(player==game.me){
							game.delay();
						}
						else{
							game.delayx();
						}
					}
					"step 3"
					player.phaseUse();
					"step 4"
					game.broadcastAll(function(){
						if(ui.tempnowuxie){
							ui.tempnowuxie.close();
							delete ui.tempnowuxie;
						}
					});
					player.phaseDiscard()
					if(!player.noPhaseDelay) game.delayx();
					//delete player.using;
					delete player._noSkill;
					"step 5"
					player.phaseJieshu();
				},
				phaseZhunbei:function(){
					event.trigger(event.name);
					game.log(player,'进入了准备阶段');
				},
				phaseJudge:function(){
					"step 0"
					game.log(player,'进入了判定阶段');
					event.cards=player.getCards('j');
					if(!event.cards.length) event.finish();
					"step 1"
					if(cards.length&&player.getCards('j').contains(cards[0])){
						event.card=cards.shift();
						if(event.card.classList.contains('removing')){
							event.card.remove();
							delete event.card;
							event.redo();
						}
						else if(event.card.classList.contains('feichu')){
							event.finish();
							return;
						}
						else{
							player.lose(event.card,'visible',ui.ordering);
							player.$phaseJudge(event.card);
							event.cancelled=false;
							event.trigger('phaseJudge');
							var name=event.card.viewAs||event.card.name;
							player.popup(name,'thunder');
							if(!lib.card[name].effect){
								game.delay();
								event.redo();
							}
							else if(!lib.card[name].judge){
								game.delay();
								event.nojudge=true;
							}
						}
					}
					else event.finish();
					"step 2"
					if(!event.cancelled&&!event.nojudge) player.judge(event.card).set('type','phase');
					"step 3"
					var name=event.card.viewAs||event.card.name;
					if(event.excluded){
						delete event.excluded;
					}
					else if(event.cancelled&&!event.direct){
						if(lib.card[name].cancel){
							var next=game.createEvent(name+'Cancel');
							next.setContent(lib.card[name].cancel);
							next.cards=[event.card];
							if(!event.card.viewAs) next.card=get.autoViewAs(event.card);
							else next.card=get.autoViewAs({name:name},next.cards);
							next.player=player;
						}
					}
					else{
						var next=game.createEvent(name);
						next.setContent(lib.card[name].effect);
						next._result=result;
						next.cards=[event.card];
						if(!event.card.viewAs) next.card=get.autoViewAs(event.card);
						else next.card=get.autoViewAs({name:name},next.cards);
						next.player=player;
					}
					ui.clear();
					event.goto(1);
				},
				phaseDraw:function(){
					"step 0"
					game.log(player,'进入了摸牌阶段');
					event.trigger("phaseDrawBegin1");
					"step 1"
					event.trigger("phaseDrawBegin2");
					"step 2"
					if(game.modPhaseDraw){
						game.modPhaseDraw(player,event.num);
					}
					else{
						if(event.num>0){
							var num=event.num;
							if(event.attachDraw){
								for(var i=0;i<event.attachDraw.length;i++){
									ui.cardPile.insertBefore(event.attachDraw[i],ui.cardPile.firstChild);
								}
								num+=event.attachDraw.length;
							}
							var next=player.draw(num);
							if(event.attachDraw){
								next.minnum=event.attachDraw.length;
							}
						}
					}
					"step 3"
					if(Array.isArray(result)){
						event.cards=result;
					}
				},
				phaseUse:function(){
					"step 0"
					if(!event.logged){
						game.log(player,'进入了出牌阶段');
						event.logged=true;
					}
					var next=player.chooseToUse();
					if(!lib.config.show_phaseuse_prompt){
						next.set('prompt',false);
					}
					next.set('type','phase');
					"step 1"
					if(result.bool&&!event.skipped){
						event.goto(0);
					}
					game.broadcastAll(function(){
						if(ui.tempnowuxie){
							ui.tempnowuxie.close();
							delete ui.tempnowuxie;
						}
					});
					"step 2"
					var stat=player.getStat();
					for(var i in stat.skill){
						var bool=false;
						var info=lib.skill[i];
						if(!info) continue;
						if(info.enable!=undefined){
							if(typeof info.enable=='string'&&info.enable=='phaseUse') bool=true;
							else if(typeof info.enable=='object'&&info.enable.contains('phaseUse')) bool=true;
						}
						if(bool) stat.skill[i]=0;
					}
					for(var i in stat.card){
						var bool=false;
						var info=lib.card[i];
						if(!info) continue;
						if(info.updateUsable=='phaseUse') stat.card[i]=0;
					}
				},
				phaseDiscard:function(){
					"step 0"
					game.log(player,'进入了弃牌阶段');
					event.num=player.needsToDiscard();
					if(event.num<=0) event.finish();
					else{
						game.broadcastAll(function(player){
							if(lib.config.show_phase_prompt){
								player.popup('弃牌阶段',null,false);
							}
						},player);
					}
					event.trigger('phaseDiscard');
					"step 1"
					player.chooseToDiscard(num,true);
					"step 2"
					event.cards=result.cards;
				},
				phaseJieshu:function(){
					event.trigger(event.name);
					game.log(player,'进入了结束阶段');
				},
				chooseToUse:function(){
					"step 0"
					if(event.responded) return;
					if(game.modeSwapPlayer&&!_status.auto&&player.isUnderControl()&&!lib.filter.wuxieSwap(event)){
						game.modeSwapPlayer(player);
					}
					var skills=player.getSkills('invisible').concat(lib.skill.global);
					game.expandSkills(skills);
					for(var i=0;i<skills.length;i++){
						var info=lib.skill[skills[i]];
						if(info&&info.onChooseToUse){
							info.onChooseToUse(event);
						}
					}
					_status.noclearcountdown=true;
					if(event.type=='phase'){
						if(event.isMine()){
							event.endButton=ui.create.control('结束回合','stayleft',function(){
								var evt=_status.event;
								if(evt.name!='chooseToUse'||evt.type!='phase') return;
								if(evt.skill){
									ui.click.cancel();
								}
								ui.click.cancel();
							});
							event.fakeforce=true;
						}
						else{
							if(event.endButton){
								event.endButton.close();
								delete event.endButton;
							}
							event.fakeforce=false;
						}
					}
					if(event.player.isUnderControl()&&!_status.auto){
						event.result={
							bool:false
						}
						return;
					}
					else if(event.isMine()){
						if(event.hsskill&&!event.forced&&_status.prehidden_skills.contains(event.hsskill)){
							ui.click.cancel();
							return;
						}
						if(event.type=='wuxie'){
							if(ui.tempnowuxie){
								var triggerevent=event.getTrigger();
								if(triggerevent&&triggerevent.targets&&triggerevent.num==triggerevent.targets.length-1){
									ui.tempnowuxie.close();
								}
							}
							if(lib.filter.wuxieSwap(event)){
								event.result={
									bool:false
								}
								return;
							}
						}
						var ok=game.check();
						if(!ok||!lib.config.auto_confirm){
							game.pause();
							if(lib.config.enable_vibrate&&player._noVibrate){
								delete player._noVibrate;
								game.vibrate();
							}
							if(typeof event.prompt=='string'){
								if(event.openskilldialog){
									event.skillDialog=ui.create.dialog(event.openskilldialog);
									delete event.openskilldialog;
									event.dialog=event.prompt;
								}
								else{
									event.dialog=ui.create.dialog(event.prompt);
									if(event.prompt2){
										event.dialog.addText(event.prompt2);
									}
								}
							}
							else if(typeof event.prompt=='function'){
								event.dialog=ui.create.dialog(event.prompt(event));
							}
							else if(event.prompt==undefined){
								var str;
								if(typeof event.filterCard=='object'){
									var filter=event.filterCard;
									str='请使用'+get.cnNumber(event.selectCard[0])+'张'
									if(filter.name){
										str+=get.translation(filter.name);
									}
									else{
										str+='牌';
									}
								}
								else{
									str='请选择要使用的牌';
								}
								if(event.openskilldialog){
									event.skillDialog=ui.create.dialog(event.openskilldialog);
									delete event.openskilldialog;
									event.dialog=str;
								}
								else if(typeof event.skillDialog!='string'){
									event.dialog=ui.create.dialog(str);
								}
								else{
									event.dialog=str;
								}
							}
						}
					}
					else if(event.isOnline()){
						event.send();
					}
					else{
						event.result='ai';
					}
					"step 1"
					if(event.result=='ai'){
						var ok=game.check();
						if(ok){
							ui.click.ok();
						}
						else if(ai.basic.chooseCard(event.ai1)||forced){
							if((ai.basic.chooseTarget(event.ai2)||forced)&&(!event.filterOk||event.filterOk())){
								ui.click.ok();
								event._aiexcludeclear=true;
							}
							else{
								if(!event.norestore){
									if(event.skill){
										var skill=event.skill;
										ui.click.cancel();
										event._aiexclude.add(skill);
										var info=get.info(skill);
										if(info.sourceSkill){
											event._aiexclude.add(info.sourceSkill);
										}
									}
									else{
										get.card(true).aiexclude();
										game.uncheck();
									}
									event.redo();
									game.resume();
								}
								else{
									ui.click.cancel();
								}
							}
						}
						else if(event.skill&&!event.norestore){
							var skill=event.skill;
							ui.click.cancel();
							event._aiexclude.add(skill);
							var info=get.info(skill);
							if(info.sourceSkill){
								event._aiexclude.add(info.sourceSkill);
							}
							event.redo();
							game.resume();
						}
						else{
							ui.click.cancel();
						}
						if(event.aidelay&&event.result&&event.result.bool){
							game.delayx();
						}
					}
					"step 2"
					if(event.endButton){
						event.endButton.close();
						delete event.endButton;
					}
					event.resume();
					if(event.result){
						if(event.result._sendskill){
							lib.skill[event.result._sendskill[0]]=event.result._sendskill[1];
						}
						if(event.result.skill){
							var info=get.info(event.result.skill);
							if(info&&info.chooseButton){
								if(event.dialog&&typeof event.dialog=='object') event.dialog.close();
								var dialog=info.chooseButton.dialog(event,player);
								if(info.chooseButton.chooseControl){
									var next=player.chooseControl(info.chooseButton.chooseControl(event,player));
									if(dialog.direct) next.direct=true;
									if(dialog.forceDirect) next.forceDirect=true;
									next.dialog=dialog;
									next.set('ai',info.chooseButton.check||function(){return 0;});
									if(event.id) next._parent_id=event.id;
									next.type='chooseToUse_button';
								}
								else{
									var next=player.chooseButton(dialog);
									if(dialog.direct) next.direct=true;
									if(dialog.forceDirect) next.forceDirect=true;
									next.set('ai',info.chooseButton.check||function(){return 1;});
									next.set('filterButton',info.chooseButton.filter||function(){return true;});
									next.set('selectButton',info.chooseButton.select||1);
									if(event.id) next._parent_id=event.id;
									next.type='chooseToUse_button';
								}
								event.buttoned=event.result.skill;
							}
							else if(info&&info.precontent&&!game.online&&!event.nouse){
								var next=game.createEvent('pre_'+event.result.skill);
								next.setContent(info.precontent);
								next.set('result',event.result);
								next.set('player',player);
							}
						}
					}
					"step 3"
					if(event.buttoned){
						if(result.bool||result.control&&result.control!='cancel2'){
							var info=get.info(event.buttoned).chooseButton;
							lib.skill[event.buttoned+'_backup']=info.backup(info.chooseControl?result:result.links,player);
							lib.skill[event.buttoned+'_backup'].sourceSkill=event.buttoned;
							if(game.online){
								event._sendskill=[event.buttoned+'_backup',lib.skill[event.buttoned+'_backup']];
							}
							event.backup(event.buttoned+'_backup');
							if(info.prompt){
								event.openskilldialog=info.prompt(info.chooseControl?result:result.links,player);
							}
						}
						else{
							ui.control.animate('nozoom',100);
							event._aiexclude.add(event.buttoned);
						}
						event.goto(0);
						delete event.buttoned;
					}
					"step 4"
					if(event._aiexcludeclear){
						delete event._aiexcludeclear;
						event._aiexclude.length=0;
					}
					delete _status.noclearcountdown;
					if(event.skillDialog&&get.objtype(event.skillDialog)=='div'){
						event.skillDialog.close();
					}
					if(event.result&&event.result.bool&&!game.online&&!event.nouse){
						player.useResult(event.result,event);
					}
					else if(event._sendskill){
						event.result._sendskill=event._sendskill;
					}
					if(event.dialog&&typeof event.dialog=='object') event.dialog.close();
					if(!_status.noclearcountdown){
						game.stopCountChoose();
					}
					"step 5"
					if(event._result&&event.result){
						event.result.result=event._result;
					}
				},
				chooseToRespond:function(){
					"step 0"
					if(event.responded){
						delete event.dialog;
						return;
					}
					var skills=player.getSkills('invisible').concat(lib.skill.global);
					game.expandSkills(skills);
					for(var i=0;i<skills.length;i++){
						var info=lib.skill[skills[i]];
						if(info&&info.onChooseToRespond){
							info.onChooseToRespond(event);
						}
					}
					_status.noclearcountdown=true;
					if(!_status.connectMode&&lib.config.skip_shan&&event.autochoose&&event.autochoose()){
						event.result={bool:false};
					}
					else{
						if(game.modeSwapPlayer&&!_status.auto&&player.isUnderControl()){
							game.modeSwapPlayer(player);
						}
						if(event.isMine()){
							if(event.hsskill&&!event.forced&&_status.prehidden_skills.contains(event.hsskill)){
								ui.click.cancel();
								return;
							}
							var ok=game.check();
							if(!ok||!lib.config.auto_confirm){
								game.pause();
								if(event.openskilldialog){
									event.skillDialog=ui.create.dialog(event.openskilldialog);
									delete event.openskilldialog;
									event.dialog=event.prompt;
								}
								else{
									if(event.prompt) event.dialog=ui.create.dialog(event.prompt);
									if(event.prompt2) event.dialog.addText(event.prompt2);
								}
							}
						}
						else if(event.isOnline()){
							event.send();
						}
						else{
							event.result='ai';
						}
					}
					"step 1"
					if(event.result=='ai'){
						var ok=game.check();
						if(ok){
							ui.click.ok();
						}
						else if(ai.basic.chooseCard(event.ai1||event.ai)||forced){
							if((ai.basic.chooseTarget(event.ai2)||forced)&&(!event.filterOk||event.filterOk())){
								ui.click.ok();
								event._aiexcludeclear=true;
							}
							else{
								if(!event.norestore){
									if(event.skill){
										var skill=event.skill;
										ui.click.cancel();
										event._aiexclude.add(skill);
										var info=get.info(skill);
										if(info.sourceSkill){
											event._aiexclude.add(info.sourceSkill);
										}
									}
									else{
										get.card(true).aiexclude();
										game.uncheck();
									}
									event.redo();
									game.resume();
								}
								else{
									ui.click.cancel();
								}
							}
						}
						else if(event.skill&&!event.norestore){
							var skill=event.skill;
							ui.click.cancel();
							event._aiexclude.add(skill);
							var info=get.info(skill);
							if(info.sourceSkill){
								event._aiexclude.add(info.sourceSkill);
							}
							event.redo();
							game.resume();
						}
						else{
							ui.click.cancel();
						}
						if(event.aidelay&&event.result&&event.result.bool){
							game.delayx();
						}
					}
					"step 2"
					event.resume();
					if(event.result){
						if(event.result._sendskill){
							lib.skill[event.result._sendskill[0]]=event.result._sendskill[1];
						}
						if(event.result.skill){
							var info=get.info(event.result.skill);
							if(info&&info.chooseButton){
								if(event.dialog&&typeof event.dialog=='object') event.dialog.close();
								var dialog=info.chooseButton.dialog(event,player);
								if(info.chooseButton.chooseControl){
									var next=player.chooseControl(info.chooseButton.chooseControl(event,player));
									if(dialog.direct) next.direct=true;
									if(dialog.forceDirect) next.forceDirect=true;
									next.dialog=dialog;
									next.set('ai',info.chooseButton.check||function(){return 0;});
								}
								else{
									var next=player.chooseButton(dialog);
									if(dialog.direct) next.direct=true;
									if(dialog.forceDirect) next.forceDirect=true;
									next.set('ai',info.chooseButton.check||function(){return 1;});
									next.set('filterButton',info.chooseButton.filter||function(){return true;});
									next.set('selectButton',info.chooseButton.select||1);
								}
								event.buttoned=event.result.skill;
							}
							else if(info&&info.precontent&&!game.online){
								var next=game.createEvent('pre_'+event.result.skill);
								next.setContent(info.precontent);
								next.set('result',event.result);
								next.set('player',player);
							}
						}
					}
					"step 3"
					if(event.buttoned){
						if(result.bool||result.control&&result.control!='cancel2'){
							var info=get.info(event.buttoned).chooseButton;
							lib.skill[event.buttoned+'_backup']=info.backup(info.chooseControl?result:result.links,player);
							lib.skill[event.buttoned+'_backup'].sourceSkill=event.buttoned;
							if(game.online){
								event._sendskill=[event.buttoned+'_backup',lib.skill[event.buttoned+'_backup']];
							}
							event.backup(event.buttoned+'_backup');
							if(info.prompt){
								event.openskilldialog=info.prompt(info.chooseControl?result:result.links,player);
							}
						}
						else{
							ui.control.animate('nozoom',100);
							event._aiexclude.add(event.buttoned);
						}
						event.goto(0);
						delete event.buttoned;
					}
					"step 4"
					delete _status.noclearcountdown;
					if(event.skillDialog&&get.objtype(event.skillDialog)=='div'){
						event.skillDialog.close();
					}
					if(event.result.bool&&!game.online){
						if(event.result._sendskill){
							lib.skill[event.result._sendskill[0]]=event.result._sendskill[1];
						}
						var info=get.info(event.result.skill);
						if(event.onresult){
							event.onresult(event.result);
						}
						if(event.result.skill){
							if(info.direct&&!info.clearTime){
								_status.noclearcountdown=true;
							}
						}
						if(event.logSkill){
							if(typeof event.logSkill=='string'){
								player.logSkill(event.logSkill);
							}
							else if(Array.isArray(event.logSkill)){
								player.logSkill.apply(player,event.logSkill);
							}
						}
						if(!event.result.card&&event.result.skill){
							event.result.used=event.result.skill;
							player.useSkill(event.result.skill,event.result.cards,event.result.targets);
						}
						else{
							if(info&&info.prerespond){
								info.prerespond(event.result,player);
							}
							var next=player.respond(event.result.cards,event.result.card,event.animate,event.result.skill,event.source);
							if(event.result.noanimate) next.animate=false;
							if(event.parent.card&&event.parent.type=='card'){
								next.set('respondTo',[event.parent.player,event.parent.card]);
							}
							if(event.noOrdering) next.noOrdering=true;
						}
					}
					else if(event._sendskill){
						event.result._sendskill=event._sendskill;
					}
					if(event.dialog&&event.dialog.close) event.dialog.close();
					if(!_status.noclearcountdown){
						game.stopCountChoose();
					}
				},
				chooseToDiscard:function(){
					"step 0"
					if(event.autochoose()){
						event.result={
							bool:true,
							autochoose:true,
							cards:player.getCards(event.position),
							rawcards:player.getCards(event.position),
						}
						for(var i=0;i<event.result.cards.length;i++){
							if(!lib.filter.cardDiscardable(event.result.cards[i],player,event)){
								event.result.cards.splice(i--,1);
							}
						}
					}
					else{
						// &&!lib.filter.wuxieSwap(trigger)
						if(game.modeSwapPlayer&&!_status.auto&&player.isUnderControl()){
							game.modeSwapPlayer(player);
						}
						event.rangecards=player.getCards(event.position);
						for(var i=0;i<event.rangecards.length;i++){
							if(lib.filter.cardDiscardable(event.rangecards[i],player,event)){
								event.rangecards.splice(i--,1);
							}
							else{
								event.rangecards[i].uncheck('chooseToDiscard');
							}
						}
						var range=get.select(event.selectCard);
						if(event.isMine()){
							game.check();
							if(event.hsskill&&!event.forced&&_status.prehidden_skills.contains(event.hsskill)){
								ui.click.cancel();
								return;
							}
							game.pause();
							if(range[1]>1&&typeof event.selectCard!='function'){
								event.promptdiscard=ui.create.control('AI代选',function(){
									ai.basic.chooseCard(event.ai);
									if(_status.event.custom&&_status.event.custom.add.card){
										_status.event.custom.add.card();
									}
									for(var i=0;i<ui.selected.cards.length;i++){
										ui.selected.cards[i].updateTransform(true);
									}
								});
							}
							if(Array.isArray(event.dialog)){
								event.dialog=ui.create.dialog.apply(this,event.dialog);
								event.dialog.open();
								event.dialog.classList.add('noselect');
							}
							else if(event.prompt!=false){
								var str;
								if(typeof(event.prompt)=='string') str=event.prompt;
								else{
									str='请弃置';
									if(range[0]==range[1]) str+=get.cnNumber(range[0]);
									else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
									else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
									str+='张';
									if(event.position=='h'||event.position==undefined) str+='手';
									if(event.position=='e') str+='装备';
									str+='牌';
								}
								event.dialog=ui.create.dialog(str);
								if(event.prompt2){
									event.dialog.addText(event.prompt2,event.prompt2.length<=20);
								}
								if(Array.isArray(event.selectCard)){
									event.promptbar=event.dialog.add('0/'+get.numStr(event.selectCard[1],'card'));
									event.custom.add.card=function(){
										_status.event.promptbar.innerHTML=
										ui.selected.cards.length+'/'+get.numStr(_status.event.selectCard[1],'card');
									}
								}
							}
							else if(get.itemtype(event.dialog)=='dialog'){
								event.dialog.style.display='';
								event.dialog.open();
							}
						}
						else if(event.isOnline()){
							event.send();
						}
						else{
							event.result='ai';
						}
					}
					"step 1"
					if(event.result=='ai'){
						game.check();
						if((ai.basic.chooseCard(event.ai)||forced)&&(!event.filterOk||event.filterOk())){
							ui.click.ok();
						}
						else if(event.skill){
							var skill=event.skill;
							ui.click.cancel();
							event._aiexclude.add(skill);
							event.redo();
							game.resume();
						}
						else{
							ui.click.cancel();
						}
					}
					if(event.rangecards){
						for(var i=0;i<event.rangecards.length;i++){
							event.rangecards[i].recheck('chooseToDiscard');
						}
					}
					"step 2"
					event.resume();
					if(event.promptdiscard){
						event.promptdiscard.close();
					}
					"step 3"
					if(event.result.bool&&event.result.cards&&event.result.cards.length&&
						!game.online&&event.autodelay&&!event.isMine()){
						if(typeof event.autodelay=='number'){
							game.delayx(event.autodelay);
						}
						else{
							game.delayx();
						}
					}
					"step 4"
					if(event.logSkill&&event.result.bool&&!game.online){
						if(typeof event.logSkill=='string'){
							player.logSkill(event.logSkill);
						}
						else if(Array.isArray(event.logSkill)){
							player.logSkill.apply(player,event.logSkill);
						}
					}
					if(!game.online){
						if(typeof event.delay=='boolean'){
							event.done=player.discard(event.result.cards).set('delay',event.delay);
						}
						else{
							event.done=player.discard(event.result.cards);
						}
						event.done.discarder=player;
					}
					if(event.dialog&&event.dialog.close) event.dialog.close();
				},
				gaincardMultiple:function(){
					'step 0'
					event.type='gain';
					if(event.animate=='give'||event.animate=='gain2') event.visible=true;
					if(player&&cards){
						event._lose=true;
						player.lose(cards,ui.special).set('type','gain').set('forceDie',true).set('getlx',false);
					}
					'step 1'
					switch(event.animate){
						case 'draw':
							game.delay(0,get.delayx(500,500));
							for(var i of event.gain_list){
								if(get.itemtype(i[1])=='card') i[1]=[i[1]];
								if(event._lose){
									i[1]=i[1].filter(card=>{
										return !cards.contains(card)||!player.getCards('hejsx').contains(card);
									})
								}
								if(i[1].length>0) i[0].$draw(i[1].length);
							}
							break;
						case 'gain':
							game.delay(0,get.delayx(700,700));
							for(var i of event.gain_list){
								if(get.itemtype(i[1])=='card') i[1]=[i[1]];
								if(event._lose){
									i[1]=i[1].filter(card=>{
										return !cards.contains(card)||!player.getCards('hejsx').contains(card);
									})
								}
								if(i[1].length>0) i[0].$gain(i[1].length);
							}
							break;
						case 'gain2': case 'draw2':
							game.delay(0,get.delayx(500,500));
							for(var i of event.gain_list){
								if(get.itemtype(i[1])=='card') i[1]=[i[1]];
								if(event._lose){
									i[1]=i[1].filter(card=>{
										return !cards.contains(card)||!player.getCards('hejsx').contains(card);
									})
								}
								if(i[1].length>0) i[0].$gain2(i[1]);
							}
							break;
						case 'give': case 'giveAuto':
							if(!player) break;
							var evt=event.getl(player);
							game.delay(0,get.delayx(500,500));
							for(var i of event.gain_list){
								if(get.itemtype(i[1])=='card') i[1]=[i[1]];
								if(event._lose){
									i[1]=i[1].filter(card=>{
										return !cards.contains(card)||!player.getCards('hejsx').contains(card);
									})
								}
								var shown=i[1].slice(0),hidden=[];
								if(event.animate=='giveAuto'){
									for(var card of i[1]){
										if(evt.hs.contains(card)){
											shown.remove(card);
											hidden.push(card);
										}
									}
								}
								if(shown.length>0) player.$give(shown,i[0]);
								if(hidden.length>0) player.$giveAuto(hidden,i[0]);
							}
							break;
						default:
							event.finish();
					}
					for(var i of event.gain_list){
						if(i[1].length>0){
							var next=i[0].gain(i[1]);
							next.getlx=false;
							if(event.visible) next.visible=true;
							if(event.giver) next.giver=event.giver;
							if(event.gaintag) next.gaintag.addArray(event.gaintag);
						}
					}
					'step 2'
					game.delayx();
				},
				discardMultiple:function(){
					'step 0'
					event.type='discard';
					event.visible=true;
					if(!event.position) event.position=ui.discardPile;
					var cards=[];
					event.cards=cards;
					for(var i=0;i<event.lose_list.length;i++){
						var next=event.lose_list[i][0].lose(event.lose_list[i][1],event.position);
						game.log(event.lose_list[i][0],'弃置了',event.lose_list[i][1]);
						next.type='discard';
						next.animate=false;
						next.delay=false;
						cards.addArray(event.lose_list[i][1]);
						next.getlx=false;
					}
					var evt=event;
					if(evt.animate!=false){
						evt.discardid=lib.status.videoId++;
						game.broadcastAll(function(list,id,cards){
							for(var i of list){
								for(var j of i[1]){
									j.classList.remove('glow');
									j.classList.remove('glows');
								}
								i[0].$throw(i[1],null,'nobroadcast');
							}
							var cardnodes=[];
							cardnodes._discardtime=get.time();
							for(var ix of list){
								var card=ix[1];
								for(var i=0;i<cards.length;i++){
									if(cards[i].clone){
										cardnodes.push(cards[i].clone);
									}
								}
							}
							ui.todiscard[id]=cardnodes;
						},event.lose_list,evt.discardid,cards);
						if(lib.config.sync_speed&&cards[0]&&cards[0].clone){
							if(evt.delay!=false){
								var waitingForTransition=get.time();
								evt.waitingForTransition=waitingForTransition;
								cards[0].clone.listenTransition(function(){
									if(_status.waitingForTransition==waitingForTransition&&_status.paused){
										game.resume();
									}
									delete evt.waitingForTransition;
								});
							}
							else if(evt.getParent().discardTransition){
								delete evt.getParent().discardTransition;
								var waitingForTransition=get.time();
								evt.getParent().waitingForTransition=waitingForTransition;
								cards[0].clone.listenTransition(function(){
									if(_status.waitingForTransition==waitingForTransition&&_status.paused){
										game.resume();
									}
									delete evt.getParent().waitingForTransition;
								});
							}
						}
					}
					'step 1'
					if(event.delay!=false){
						if(event.waitingForTransition){
							_status.waitingForTransition=event.waitingForTransition;
							game.pause();
						}
						else{
							game.delayx();
						}
					}
				},
				chooseToCompareLose:function(){
					for(var i=0;i<event.lose_list.length;i++){
						var next=event.lose_list[i][0].lose(event.lose_list[i][1],ui.ordering);
						next.relatedEvent=event.getParent();
						next.getlx=false;
					}
				},
				chooseToCompareMeanwhile:function(){
					'step 0'
					if(player.countCards('h')==0){
						event.result={cancelled:true,bool:false}
						event.finish();
						return;
					}
					for(var i=0; i<targets.length; i++){
						if(targets[i].countCards('h')==0){
							event.result={cancelled:true,bool:false}
							event.finish();
							return;
						}
					}
					if(!event.multitarget){
						targets.sort(lib.sort.seat);
					}
					game.log(player,'对',targets,'发起了共同拼点');
					event.compareMeanwhile=true;
					'step 1'
					event._result=[];
					event.list=targets.filter(function(current){
						return !event.fixedResult||!event.fixedResult[current.playerid];
					});
					if(event.list.length||!event.fixedResult||!event.fixedResult[player.playerid]){
						if(!event.fixedResult||!event.fixedResult[player.playerid]) event.list.unshift(player);
						player.chooseCardOL(event.list,'请选择拼点牌',true).set('type','compare').set('ai',event.ai).set('source',player).aiCard=function(target){
							var hs=target.getCards('h');
							var event=_status.event;
							event.player=target;
							hs.sort(function(a,b){
								return event.ai(b)-event.ai(a);
							});
							delete event.player;
							return {bool:true,cards:[hs[0]]};
						};
					}
					'step 2'
					var cards=[];
					var lose_list=[];
					if(event.fixedResult&&event.fixedResult[player.playerid]){
						event.list.unshift(player);
						result.unshift({bool:true,cards:[event.fixedResult[player.playerid]]});
						lose_list.push([player,[event.fixedResult[player.playerid]]]);
					}
					else{
						if(result[0].skill&&lib.skill[result[0].skill]&&lib.skill[result[0].skill].onCompare){
							player.logSkill(result[0].skill);
							result[0].cards=lib.skill[result[0].skill].onCompare(player)
						}
						else lose_list.push([player,result[0].cards]);
					};
					for(var j=0; j<targets.length; j++){
						if(event.list.contains(targets[j])){
							var i=event.list.indexOf(targets[j]);
							if(result[i].skill&&lib.skill[result[i].skill]&&lib.skill[result[i].skill].onCompare){
								event.list[i].logSkill(result[i].skill);
								result[i].cards=lib.skill[result[i].skill].onCompare(event.list[i]);
							}
							else lose_list.push([targets[j],result[i].cards]);
							cards.push(result[i].cards[0]);
						}
						else if(event.fixedResult&&event.fixedResult[targets[j].playerid]){
							cards.push(event.fixedResult[targets[j].playerid]);
							lose_list.push([targets[j],[event.fixedResult[targets[j].playerid]]]);
						}
					}
					if(lose_list.length){
						game.loseAsync({
							lose_list:lose_list,
						}).setContent('chooseToCompareLose');
					}
					event.lose_list=lose_list;
					event.getNum=function(card){
						for(var i of event.lose_list){
							if(i[1].contains&&i[1].contains(card)) return get.number(card,i[0]);
						}
						return get.number(card,false);
					}
					event.cardlist=cards;
					event.cards=cards;
					event.card1=result[0].cards[0];
					event.num1=event.getNum(event.card1);
					event.iwhile=0;
					event.winner=null;
					event.maxNum=-1;
					event.tempplayer=event.player;
					event.result={
						winner:null,
						player:event.card1,
						targets:event.cardlist.slice(0),
						num1:[],
						num2:[],
					};
					'step 3'
					event.trigger('compareCardShowBefore');
					'step 4'
					player.$compareMultiple(event.card1,targets,cards);
					game.log(player,'的拼点牌为',event.card1);
					player.animate('target');
					game.delay(0,1000);
					'step 5'
					event.target=null;
					event.trigger('compare');
					'step 6'
					if(event.iwhile<targets.length){
						event.target=targets[event.iwhile];
						event.target.animate('target');
						event.card2=event.cardlist[event.iwhile];
						event.num2=event.getNum(event.card2);
						game.log(event.target,'的拼点牌为',event.card2);
						//event.tempplayer.line(event.target);
						delete event.player;
						event.trigger('compare');
					}
					else{
						game.delay(0,1000);
						event.goto(9);
					}
					'step 7'
					event.result.num1[event.iwhile]=event.num1;
					event.result.num2[event.iwhile]=event.num2;
					var list=[[event.tempplayer,event.num1],[event.target,event.num2]];
					for(var i of list){
						if(i[1]>event.maxNum){
							event.maxNum=i[1];
							event.winner=i[0];
						}
						else if(event.winner&&i[1]==event.maxNum&&i[0]!=event.winner){
							event.winner=null;
						}
					}
					'step 8'
					event.iwhile++;
					event.goto(6);
					'step 9'
					var player=event.tempplayer;
					event.player=player;
					delete event.tempplayer;
					var str='无人拼点成功';
					if(event.winner){
						event.result.winner=event.winner;
						str=get.translation(event.winner)+'拼点成功';
						game.log(event.winner,'拼点成功');
						event.winner.popup('胜');
					} else game.log('#b无人','拼点成功');
					var list=[player].addArray(targets);
					list.remove(event.winner);
					for(var i of list){
						i.popup('负');
					}
					if(str){
						game.broadcastAll(function(str){
							var dialog=ui.create.dialog(str);
							dialog.classList.add('center');
							setTimeout(function(){
								dialog.close();
							},1000);
						},str);
					}
					game.delay(3);
					'step 10'
					game.broadcastAll(ui.clear);
					'step 11'
					event.cards.add(event.card1);
				},
				chooseToCompareMultiple:function(){
					"step 0"
					if(player.countCards('h')==0){
						event.result={cancelled:true,bool:false}
						event.finish();
						return;
					}
					for(var i=0;i<targets.length;i++){
						if(targets[i].countCards('h')==0){
							event.result={cancelled:true,bool:false}
							event.finish();
							return;
						}
					}
					if(!event.multitarget){
						targets.sort(lib.sort.seat);
					}
					game.log(player,'对',targets,'发起拼点');
					"step 1"
					event._result=[];
					event.list=targets.filter(function(current){
						return !event.fixedResult||!event.fixedResult[current.playerid];
					});
					if(event.list.length||!event.fixedResult||!event.fixedResult[player.playerid]){
						if(!event.fixedResult||!event.fixedResult[player.playerid]) event.list.unshift(player);
						player.chooseCardOL(event.list,'请选择拼点牌',true).set('type','compare').set('ai',event.ai).set('source',player).aiCard=function(target){
							var hs=target.getCards('h');
							var event=_status.event;
							event.player=target;
							hs.sort(function(a,b){
								return event.ai(b)-event.ai(a);
							});
							delete event.player;
							return {bool:true,cards:[hs[0]]};
						};
					}
					"step 2"
					var cards=[];
					var lose_list=[];
					if(event.fixedResult&&event.fixedResult[player.playerid]){
						event.list.unshift(player);
						result.unshift({bool:true,cards:[event.fixedResult[player.playerid]]});
						lose_list.push([player,[event.fixedResult[player.playerid]]]);
					}
					else{
						if(result[0].skill&&lib.skill[result[0].skill]&&lib.skill[result[0].skill].onCompare){
							player.logSkill(result[0].skill);
							result[0].cards=lib.skill[result[0].skill].onCompare(player)
						}
						else lose_list.push([player,result[0].cards]);
					};
					for(var j=0;j<targets.length;j++){
						if(event.list.contains(targets[j])){
							var i=event.list.indexOf(targets[j]);
							if(result[i].skill&&lib.skill[result[i].skill]&&lib.skill[result[i].skill].onCompare){
								event.list[i].logSkill(result[i].skill);
								result[i].cards=lib.skill[result[i].skill].onCompare(event.list[i]);
							}
							else lose_list.push([targets[j],result[i].cards]);
							cards.push(result[i].cards[0]);
						}
						else if(event.fixedResult&&event.fixedResult[targets[j].playerid]){
							cards.push(event.fixedResult[targets[j].playerid]);
							lose_list.push([targets[j],[event.fixedResult[targets[j].playerid]]]);
						}
					}
					if(lose_list.length){
						game.loseAsync({
							lose_list:lose_list,
						}).setContent('chooseToCompareLose');
					}
					event.lose_list=lose_list;
					event.getNum=function(card){
						for(var i of event.lose_list){
							if(i[1].contains&&i[1].contains(card)) return get.number(card,i[0]);
						}
						return get.number(card,false);
					}
					event.cardlist=cards;
					event.cards=cards;
					event.card1=result[0].cards[0];
					event.num1=event.getNum(event.card1);
					event.iwhile=0;
					event.result={
						player:event.card1,
						targets:event.cardlist.slice(0),
						num1:[],
						num2:[],
					};
					"step 3"
					event.trigger('compareCardShowBefore');
					"step 4"
					game.log(player,'的拼点牌为',event.card1);
					"step 5"
					if(event.iwhile<targets.length){
						event.target=targets[event.iwhile];
						event.target.animate('target');
						player.animate('target');
						event.card2=event.cardlist[event.iwhile];
						event.num2=event.getNum(event.card2);
						game.log(event.target,'的拼点牌为',event.card2);
						player.line(event.target);
						player.$compare(event.card1,event.target,event.card2);
						event.trigger('compare');
						game.delay(0,1500);
					}
					else{
						event.goto(9);
					}
					"step 6"
					event.result.num1[event.iwhile]=event.num1;
					event.result.num2[event.iwhile]=event.num2;
					var str;
					if(event.num1>event.num2){
						str=get.translation(player)+'拼点成功';
						player.popup('胜');
						target.popup('负');
					}
					else{
						str=get.translation(player)+'拼点失败';
						if(event.num1==event.num2){
							player.popup('平');
							target.popup('平');
						}
						else{
							player.popup('负');
							target.popup('胜');
						}
					}
					game.broadcastAll(function(str){
						var dialog=ui.create.dialog(str);
						dialog.classList.add('center');
						setTimeout(function(){
							dialog.close();
						},1000);
					},str);
					game.delay(2);
					"step 7"
					if(event.callback){
						game.broadcastAll(function(card1,card2){
							if(card1.clone) card1.clone.style.opacity=0.5;
							if(card2.clone) card2.clone.style.opacity=0.5;
						},event.card1,event.card2);
						var next=game.createEvent('compareMultiple');
						next.player=player;
						next.target=event.target;
						next.card1=event.card1;
						next.card2=event.card2;
						next.num1=event.num1;
						next.num2=event.num2;
						next.setContent(event.callback);
						event.compareMultiple=true;
					}
					"step 8"
					game.broadcastAll(ui.clear);
					event.iwhile++;
					event.goto(5);
					"step 9"
					event.cards.add(event.card1);
				},
				chooseToCompare:function(){
					"step 0"
					if(((!event.fixedResult||!event.fixedResult[player.playerid])&&player.countCards('h')==0)||((!event.fixedResult||!event.fixedResult[target.playerid])&&target.countCards('h')==0)){
						event.result={cancelled:true,bool:false}
						event.finish();
						return;
					}
					game.log(player,'对',target,'发起拼点');
					event.lose_list=[];
					"step 1"
					var sendback=function(){
						if(_status.event!=event){
							return function(){
								event.resultOL=_status.event.resultOL;
							};
						}
					};
					if(event.fixedResult&&event.fixedResult[player.playerid]){
						event.card1=event.fixedResult[player.playerid];
						event.lose_list.push([player,event.card1]);
					}
					else if(player.isOnline()){
						player.wait(sendback);
						event.ol=true;
						player.send(function(ai){
							game.me.chooseCard('请选择拼点牌',true).set('type','compare').set('glow_result',true).ai=ai;
							game.resume();
						},event.ai);
					}
					else{
						event.localPlayer=true;
						player.chooseCard('请选择拼点牌',true).set('type','compare').set('glow_result',true).ai=event.ai;
					}
					if(event.fixedResult&&event.fixedResult[target.playerid]){
						event.card2=event.fixedResult[target.playerid];
						event.lose_list.push([target,event.card2]);
					}
					else if(target.isOnline()){
						target.wait(sendback);
						event.ol=true;
						target.send(function(ai){
							game.me.chooseCard('请选择拼点牌',true).set('type','compare').set('glow_result',true).ai=ai;
							game.resume();
						},event.ai);
					}
					else{
						event.localTarget=true;
					}
					"step 2"
					if(event.localPlayer){
						if(result.skill&&lib.skill[result.skill]&&lib.skill[result.skill].onCompare){
							result.cards=lib.skill[result.skill].onCompare(player);
							player.logSkill(result.skill);
						}
						else event.lose_list.push([player,result.cards[0]]);
						event.card1=result.cards[0];
					}
					if(event.localTarget){
						target.chooseCard('请选择拼点牌',true).set('type','compare').set('glow_result',true).ai=event.ai;
					}
					"step 3"
					if(event.localTarget){
						if(result.skill&&lib.skill[result.skill]&&lib.skill[result.skill].onCompare){
							target.logSkill(result.skill);
							result.cards=lib.skill[result.skill].onCompare(target);
						}
						else event.lose_list.push([target,result.cards[0]]);
						event.card2=result.cards[0];
					}
					if(!event.resultOL&&event.ol){
						game.pause();
					}
					"step 4"
					try{
						if(!event.card1){
							if(event.resultOL[player.playerid].skill&&lib.skill[event.resultOL[player.playerid].skill]&&lib.skill[event.resultOL[player.playerid].skill].onCompare){
								player.logSkill(event.resultOL[player.playerid].skill);
								event.resultOL[player.playerid].cards=lib.skill[event.resultOL[player.playerid].skill].onCompare(player);
							}
							else event.lose_list.push([player,event.resultOL[player.playerid].cards[0]]);
							event.card1=event.resultOL[player.playerid].cards[0];
						};
						if(!event.card2){
							if(event.resultOL[target.playerid].skill&&lib.skill[event.resultOL[target.playerid].skill]&&lib.skill[event.resultOL[target.playerid].skill].onCompare){
								target.logSkill(event.resultOL[target.playerid].skill);
								event.resultOL[target.playerid].cards=lib.skill[event.resultOL[target.playerid].skill].onCompare(player);
							}
							else event.lose_list.push([target,event.resultOL[target.playerid].cards[0]]);
							event.card2=event.resultOL[target.playerid].cards[0];
						}
						if(!event.card1||!event.card2){
							throw('err');
						}
					}
					catch(e){
						console.log(e);
						game.print(e);
						event.finish();
						return;
					}
					if(event.card2.number>=10||event.card2.number<=4){
						if(target.countCards('h')>2){
							event.addToAI=true;
						}
					}
					if(event.lose_list.length){
						game.loseAsync({
							lose_list:event.lose_list,
						}).setContent('chooseToCompareLose');
					}
					"step 5"
					event.trigger('compareCardShowBefore');
					"step 6"
					game.broadcast(function(){
						ui.arena.classList.add('thrownhighlight');
					});
					ui.arena.classList.add('thrownhighlight');
					game.addVideo('thrownhighlight1');
					player.$compare(event.card1,target,event.card2);
					game.log(player,'的拼点牌为',event.card1);
					game.log(target,'的拼点牌为',event.card2);
					var getNum=function(card){
						for(var i of event.lose_list){
							if(i[1]==card) return get.number(card,i[0]);
						}
						return get.number(card,false);
					}
					event.num1=getNum(event.card1);
					event.num2=getNum(event.card2);
					event.trigger('compare');
					game.delay(0,1500);
					"step 7"
					event.result={
						player:event.card1,
						target:event.card2,
						num1:event.num1,
						num2:event.num2
					}
					var str;
					if(event.num1>event.num2){
						event.result.bool=true;
						event.result.winner=player;
						str=get.translation(player)+'拼点成功';
						player.popup('胜');
						target.popup('负');
					}
					else{
						event.result.bool=false;
						str=get.translation(player)+'拼点失败';
						if(event.num1==event.num2){
							event.result.tie=true;
							player.popup('平');
							target.popup('平');
						}
						else{
							event.result.winner=target;
							player.popup('负');
							target.popup('胜');
						}
					}
					game.broadcastAll(function(str){
						var dialog=ui.create.dialog(str);
						dialog.classList.add('center');
						setTimeout(function(){
							dialog.close();
						},1000);
					},str);
					game.delay(2);
					"step 8"
					if(typeof event.target.ai.shown=='number'&&event.target.ai.shown<=0.85&&event.addToAI){
						event.target.ai.shown+=0.1;
					}
					game.broadcastAll(function(){
						ui.arena.classList.remove('thrownhighlight');
					});
					game.addVideo('thrownhighlight2');
					if(event.clear!==false){
						game.broadcastAll(ui.clear);
					}
					if(typeof event.preserve=='function'){
						event.preserve=event.preserve(event.result);
					}
					else if(event.preserve=='win'){
						event.preserve=event.result.bool;
					}
					else if(event.preserve=='lose'){
						event.preserve=!event.result.bool;
					}
				},
				chooseSkill:function(){
					'step 0'
					var list;
					if(typeof event.target=='string'){
						list=get.gainableSkillsName(event.target,event.func);
					}
					else{
						list=event.target.getGainableSkills(event.func);
					}
					if(!list.length){
						event.finish();
						event.result={bool:false};
						return;
					}
					event.skillai=function(list){
						return get.max(list,get.skillRank,'item');
					};
					if(event.isMine()){
						var dialog=ui.create.dialog('forcebutton');
						dialog.add(event.prompt||'选择获得一项技能');
						_status.event.list=list;
						var clickItem=function(){
							_status.event._result=this.link;
							game.resume();
						};
						for(i=0;i<list.length;i++){
							if(lib.translate[list[i]+'_info']){
								var translation=get.translation(list[i]);
								if(translation[0]=='新'&&translation.length==3){
									translation=translation.slice(1,3);
								}
								else{
									translation=translation.slice(0,2);
								}
								var item=dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【'+
								translation+'】</div><div>'+lib.translate[list[i]+'_info']+'</div></div>');
								item.firstChild.addEventListener('click',clickItem);
								item.firstChild.link=list[i];
							}
						}
						dialog.add(ui.create.div('.placeholder'));
						event.dialog=dialog;
						event.switchToAuto=function(){
							event._result=event.skillai(event.list);
							game.resume();
						};
						_status.imchoosing=true;
						game.pause();
					}
					else{
						event._result=event.skillai(list);
					}
					'step 1'
					_status.imchoosing=false;
					if(event.dialog){
						event.dialog.close();
					}
					event.result={bool:true,skill:result};
				},
				discoverCard:function(){
					'step 0'
					var num=event.num||3;
					var choice;
					if(typeof event.list=='string'||typeof event.list=='function'){
						choice=get.inpile(event.list).randomGets(num);
					}
					else if(Array.isArray(event.list)){
						choice=event.list.randomGets(num);
					}
					else{
						choice=Array.from(event.list).randomGets(num);
					}
					if(choice.length){
						var prompt=event.prompt;
						if(!prompt){
							prompt='选择一张牌';
							if(event.use){
								prompt+='使用之';
							}
							else if(!event.nogain){
								prompt+='获得之';
							}
						}
						if(typeof choice[0]==='string'){
							var next=player.chooseVCardButton(choice,prompt,event.forced);
							if(event.ai){
								next.set('ai',event.ai);
							}
						}
						else if(get.itemtype(choice[0])=='card'){
							var next=player.chooseCardButton(choice,prompt,event.forced);
							if(event.ai){
								next.set('ai',event.ai);
							}
						}
						else{
							event.finish();
						}
					}
					else{
						event.finish();
					}
					'step 1'
					event.result={
						bool:result.bool,
						card:null,
						choice:null
					};
					if(result.bool&&result.links.length){
						var link=result.links[0];
						var togain=null;
						if(get.itemtype(link)=='card'){
							event.result.card=link;
							togain=link;
						}
						else if(Array.isArray(link)){
							event.result.choice=link[2];
							togain=game.createCard(link[2]);
						}
						if(togain){
							if(event.use){
								player.chooseUseTarget(togain);
							}
							else if(!event.nogain){
								player.gain(togain,'draw');
								game.log(player,'获得了一张牌');
							}
						}
					}
				},
				chooseButton:function(){
					"step 0"
					if(typeof event.dialog=='number'){
						event.dialog=get.idDialog(event.dialog);
					}
					if(event.createDialog&&!event.dialog){
						if(Array.isArray(event.createDialog)){
							event.createDialog.add('hidden');
							event.dialog=ui.create.dialog.apply(this,event.createDialog);
						}
						event.closeDialog=true;
					}
					if(event.dialog==undefined) event.dialog=ui.dialog;
					if(event.isMine()||event.dialogdisplay){
						event.dialog.style.display='';
						event.dialog.open();
					}
					var filterButton=event.filterButton||function(){return true};
					var selectButton=get.select(event.selectButton);
					var buttons=event.dialog.buttons;
					var buttonsx=[];
					var num=0;
					for(var i=0;i<buttons.length;i++){
						var button=buttons[i];
						if(filterButton(button,player)){
							num++;
							buttonsx.add(button);
						}
					}
					if(event.isMine()){
						if(event.direct&&num==selectButton[0]||event.forceDirect){
							var buttons=buttonsx.slice(0,num);
							event.result={
								bool:true,
								button:[buttons],
								links:get.links(buttons),
							};
							event.dialog.close();
						}
						else{
							game.check();
							game.pause();
						}
						if(event.hsskill&&!event.forced&&_status.prehidden_skills.contains(event.hsskill)){
							ui.click.cancel();
							return;
						}
					}
					else if(event.isOnline()){
						if(event.direct&&num==1||event.forceDirect){
							var buttons=buttonsx.slice(0,num);
							event.result={
								bool:true,
								button:[buttons],
								links:get.links(buttons),
							};
							event.dialog.close();
						}
						else{
							event.send();
						}
						delete event.callback;
					}
					else{
						event.result='ai';
					}
					if(event.onfree){
						lib.init.onfree();
					}
					"step 1"
					if(event.result=='ai'){
						if(event.processAI){
							event.result=event.processAI();
						}
						else{
							game.check();
							if((ai.basic.chooseButton(event.ai)||forced)&&(!event.filterOk||event.filterOk())) ui.click.ok();
							else ui.click.cancel();
						}
					}
					if(event.closeDialog){
						event.dialog.close();
					}
					if(event.callback){
						event.callback(event.player,event.result);
					}
					event.resume();
				},
				chooseCardOL:function(){
					'step 0'
					event.targets=event.list.slice(0);
					if(!_status.connectMode){
						event.result=[];
						event.goto(7);
					}
					else{
						for(var i=0;i<event.list.length;i++){
							var target=event.list[i];
							target.wait();
							if(target.isOnline()){
								target.send(function(args,set){
									game.me.chooseCard.apply(game.me,args).set(set);
									game.resume();
								},event._args,event._set);
								event.list.splice(i--,1);
							}
							else if(target==game.me){
								event.withme=true;
								event.list.splice(i--,1);
							}
						}
					}
					'step 1'
					if(event.list.length){
						event.target=event.list.shift();
						event.target.chooseCard.apply(event.target,event._args).set(event._set);
					}
					else{
						event.goto(3);
					}
					'step 2'
					event.target.unwait(result);
					event.goto(1);
					'step 3'
					if(event.withme){
						game.me.chooseCard.apply(game.me,event._args).set(event._set);
					}
					else{
						event.goto(5);
					}
					'step 4'
					game.me.unwait(result);
					'step 5'
					if(!event.resultOL){
						game.pause();
					}
					'step 6'
					event.result=[];
					for(var i=0;i<event.targets.length;i++){
						event.result[i]=event.resultOL[event.targets[i].playerid]||{};
						if(event.result[i]=='ai'&&event.aiCard){
							event.result[i]=event.aiCard(event.targets[i]);
						}
					}
					event.finish();
					'step 7'
					if(event.list.length){
						event.target=event.list.shift();
						event.target.chooseCard.apply(event.target,event._args).set(event._set);
					}
					else{
						for(var i=0;i<event.targets.length;i++){
							if(!event.result[i]){
								event.result[i]={};
							}
						}
						event.finish();
					}
					'step 8'
					event.result[event.targets.indexOf(event.target)]=result;
					event.goto(7);
				},
				chooseButtonOL:function(){
					'step 0'
					ui.arena.classList.add('markhidden');
					for(var i=0;i<event.list.length;i++){
						var current=event.list[i];
						current[0].wait();
						if(current[0].isOnline()){
							var target=current.shift();
							target.send(function(args,callback,switchToAuto,processAI){
								ui.arena.classList.add('markhidden');
								var next=game.me.chooseButton.apply(game.me,args);
								next.callback=callback;
								next.switchToAuto=switchToAuto;
								next.processAI=processAI;
								next.complexSelect=true;
								game.resume();
							},current,event.callback,event.switchToAuto,event.processAI);
							target._choose_button_ol=current;
							event.list.splice(i--,1);
						}
						else if(current[0]==game.me){
							event.last=current;
							event.last.shift();
							event.list.splice(i--,1);
						}
					}
					'step 1'
					if(event.list.length){
						var current=event.list.shift();
						event.target=current.shift();
						var next=event.target.chooseButton.apply(event.target,current);
						next.callback=event.callback;
						next.switchToAuto=event.switchToAuto;
						next.processAI=event.processAI;
					}
					else{
						event.goto(3);
					}
					'step 2'
					event.target.unwait(result);
					event.goto(1);
					'step 3'
					if(event.last){
						var next=game.me.chooseButton.apply(game.me,event.last);
						next.callback=event.callback;
						next.switchToAuto=event.switchToAuto;
						next.processAI=event.processAI;
					}
					else{
						event.goto(5);
					}
					'step 4'
					game.me.unwait(result);
					'step 5'
					if(!event.resultOL){
						game.pause();
					}
					'step 6'
					game.broadcastAll(function(){
						ui.arena.classList.remove('markhidden');
					});
					event.result=event.resultOL;
				},
				chooseCard:function(){
					"step 0"
					if(event.directresult){
						event.result={
							buttons:[],
							cards:event.directresult.slice(0),
							targets:[],
							confirm:'ok',
							bool:true,
							links:[]
						};
					}
					else{
						if(event.isMine()){
							game.check();
							game.pause();
							if(event.hsskill&&!event.forced&&_status.prehidden_skills.contains(event.hsskill)){
								ui.click.cancel();
								return;
							}
							if(event.prompt!=false){
								var str;
								if(typeof event.prompt=='string') str=event.prompt;
								else{
									str='请选择'
									var range=get.select(event.selectCard);
									if(range[0]==range[1]) str+=get.cnNumber(range[0]);
									else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
									else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
									str+='张';
									if(event.position=='h'||event.position==undefined) str+='手';
									if(event.position=='e') str+='装备';
									str+='牌';
								}
								event.dialog=ui.create.dialog(str);
								if(event.prompt2){
									event.dialog.addText(event.prompt2,event.prompt2.length<=20);
								}
								if(Array.isArray(event.promptx)){
									for(var i=0;i<event.promptx.length;i++){
										event.dialog.add(event.promptx[i]);
									}
								}
								if(Array.isArray(event.selectCard)){
									event.promptbar=event.dialog.add('0/'+get.numStr(event.selectCard[1],'card'));
									event.custom.add.card=function(){
										_status.event.promptbar.innerHTML=
										ui.selected.cards.length+'/'+get.numStr(_status.event.selectCard[1],'card');
									}
								}
							}
						}
						else if(event.isOnline()){
							event.send();
						}
						else{
							event.result='ai';
						}
					}
					"step 1"
					if(event.result=='ai'){
						game.check();
						if((ai.basic.chooseCard(event.ai)||forced)&&(!event.filterOk||event.filterOk())){
							ui.click.ok();
						}
						else if(event.skill){
							var skill=event.skill;
							ui.click.cancel();
							event._aiexclude.add(skill);
							event.redo();
							game.resume();
						}
						else{
							ui.click.cancel();
						}
					}
					"step 2"
					event.resume();
					if(event.glow_result&&event.result.cards&&!event.directresult){
						for(var i=0;i<event.result.cards.length;i++){
							event.result.cards[i].classList.add('glow');
						}
					}
					if(event.dialog) event.dialog.close();
				},
				chooseTarget:function(){
					"step 0"
					if(event.isMine()){
						if(event.hsskill&&!event.forced&&_status.prehidden_skills.contains(event.hsskill)){
							ui.click.cancel();
							return;
						}
						game.check();
						game.pause();
						if(event.createDialog&&!event.dialog&&Array.isArray(event.createDialog)){
							event.dialog=ui.create.dialog.apply(this,event.createDialog);
						}
						else if(event.prompt!=false){
							var str;
							if(typeof event.prompt=='string') str=event.prompt;
							else{
								str='请选择'
								var range=get.select(event.selectTarget);
								if(range[0]==range[1]) str+=get.cnNumber(range[0]);
								else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
								else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
								str+='个目标';
							}
							event.dialog=ui.create.dialog(str);
							if(event.prompt2){
								event.dialog.addText(event.prompt2,event.prompt2.length<=20);
							}
							if(event.promptbar!='none'){
								event.promptbar=event.dialog.add('0/'+get.numStr(get.select(event.selectTarget)[1],'target'));
								event.custom.add.target=function(){
									_status.event.promptbar.innerHTML=
									ui.selected.targets.length+'/'+get.numStr(get.select(event.selectTarget)[1],'target');
								}
							}
						}
						else if(get.itemtype(event.dialog)=='dialog'){
							event.dialog.open();
						}
					}
					else if(event.isOnline()){
						event.send();
					}
					else{
						event.result='ai';
					}
					"step 1"
					if(event.result=='ai'){
						game.check();
						if((ai.basic.chooseTarget(event.ai)||forced)&&(!event.filterOk||event.filterOk())){
							ui.click.ok();
						}
						else{
							ui.click.cancel();
						}
					}
					if(event.result.bool&&event.animate!==false){
						for(var i=0;i<event.result.targets.length;i++){
							event.result.targets[i].animate('target');
						}
					}
					if(event.dialog) event.dialog.close();
					event.resume();
					"step 2"
					if(event.onresult){
						event.onresult(event.result);
					}
					if(event.result.bool&&event.autodelay&&!event.isMine()){
						if(typeof event.autodelay=='number'){
							game.delayx(event.autodelay);
						}
						else{
							game.delayx();
						}
					}
				},
				chooseCardTarget:function(){
					"step 0"
					if(event.isMine()){
						if(event.hsskill&&!event.forced&&_status.prehidden_skills.contains(event.hsskill)){
							ui.click.cancel();
							return;
						}
						game.check();
						game.pause();
						if(event.prompt!=false){
							event.dialog=ui.create.dialog(event.prompt||'请选择卡牌和目标');
							if(event.prompt2){
								event.dialog.addText(event.prompt2,event.prompt2.length<=20);
							}
						}
					}
					else if(event.isOnline()){
						event.send();
					}
					else{
						event.result='ai';
					}
					"step 1"
					if(event.result=='ai'){
						game.check();
						if(ai.basic.chooseCard(event.ai1)||forced){
							if((ai.basic.chooseTarget(event.ai2)||forced)&&(!event.filterOk||event.filterOk())){
								ui.click.ok();
								_status.event._aiexclude.length=0;
							}
							else{
								ui.click.cancel();
							}
						}
						else{
							ui.click.cancel();
						}
					}
					"step 2"
					event.resume();
					if(event.result.bool&&event.animate!==false){
						for(var i=0;i<event.result.targets.length;i++){
							event.result.targets[i].animate('target');
						}
					}
					if(event.dialog) event.dialog.close();
				},
				chooseControl:function(){
					"step 0"
					if(event.controls.length==0){
						if(event.sortcard){
							var sortnum=2;
							if(event.sorttop){
								sortnum=1;
							}
							for(var i=0;i<event.sortcard.length+sortnum;i++){
								event.controls.push(get.cnNumber(i,true));
							}
						}
						else if(event.choiceList){
							for(var i=0;i<event.choiceList.length;i++){
								event.controls.push('选项'+get.cnNumber(i+1,true));
							}
						}
						else{
							event.finish();
							return;
						}
					}
					else if(event.choiceList&&event.controls.length==1&&event.controls[0]=='cancel2'){
						event.controls.shift();
						for(var i=0;i<event.choiceList.length;i++){
							event.controls.push('选项'+get.cnNumber(i+1,true));
						}
						event.controls.push('cancel2');
					}
					if(event.isMine()){
						if(event.arrangeSkill){
							var hidden=player.hiddenSkills.slice(0);
							game.expandSkills(hidden);
							if(hidden.length){
								for(var i of event.controls){
									if(_status.prehidden_skills.contains(i)&&hidden.contains(i)){
										event.result={
											bool:true,
											control:i,
										}
										return;
									}
								}
							}
						}
						else if(event.hsskill&&_status.prehidden_skills.contains(event.hsskill)&&event.controls.contains('cancel2')){
							event.result={
								bool:true,
								control:'cancel2',
							}
							return;
						}
						if(event.sortcard){
							var prompt=event.prompt||'选择一个位置';
							if(event.tosort){
								prompt+='放置'+get.translation(event.tosort);
							}
							event.dialog=ui.create.dialog(prompt,'hidden');
							if(event.sortcard&&event.sortcard.length){
								event.dialog.addSmall(event.sortcard);
							}
							else{
								event.dialog.buttons=[];
								event.dialog.add(ui.create.div('.buttons'));
							}
							var buttons=event.dialog.content.lastChild;
							var sortnum=2;
							if(event.sorttop){
								sortnum=1;
							}
							for(var i=0;i<event.dialog.buttons.length+sortnum;i++){
								var item=ui.create.div('.button.card.pointerdiv.mebg');
								item.style.width='50px';
								buttons.insertBefore(item,event.dialog.buttons[i]);
								item.innerHTML='<div style="font-family: xinwei;font-size: 25px;height: 75px;line-height: 25px;top: 8px;left: 10px;width: 30px;">第'+get.cnNumber(i+1,true)+'张</div>';
								if(i==event.dialog.buttons.length+1){
									item.firstChild.innerHTML='牌堆底';
								}
								item.link=get.cnNumber(i,true);
								item.listen(ui.click.dialogcontrol);
							}

							event.dialog.forcebutton=true;
							event.dialog.classList.add('forcebutton');
							event.dialog.open();
						}
						else if(event.dialogcontrol){
							event.dialog=ui.create.dialog(event.prompt||'选择一项','hidden');
							for(var i=0;i<event.controls.length;i++){
								var item=event.dialog.add('<div class="popup text pointerdiv" style="width:calc(100% - 10px);display:inline-block">'+event.controls[i]+'</div>');
								item.firstChild.listen(ui.click.dialogcontrol);
								item.firstChild.link=event.controls[i];
							}
							event.dialog.forcebutton=true;
							event.dialog.classList.add('forcebutton');
							if(event.addDialog){
								for(var i=0;i<event.addDialog.length;i++){
									if(get.itemtype(event.addDialog[i])=='cards'){
										event.dialog.addSmall(event.addDialog[i]);
									}
									else{
										event.dialog.add(event.addDialog[i]);
									}
								}
								event.dialog.add(ui.create.div('.placeholder.slim'));
							}
							event.dialog.open();
						}
						else{
							if(event.seperate||lib.config.seperate_control){
								var controls=event.controls.slice(0);
								var num=0;
								controls.remove('cancel2');
								if(event.direct&&controls.length==1||event.forceDirect){
									event.result={
										control:event.controls[0].link,
										links:get.links([event.controls[0]]),
									};
									return;
								}
								else{
									event.controlbars=[];
									for(var i=0;i<event.controls.length;i++){
										event.controlbars.push(ui.create.control([event.controls[i]]));
									}
								}
							}
							else{
								var controls=event.controls.slice(0);
								var num=0;
								controls.remove('cancel2');
								if(event.direct&&controls.length==1||event.forceDirect){
									event.result={
										control:event.controls[0].link,
										links:get.links([event.controls[0]]),
									};
									return;
								}
								event.controlbar=ui.create.control(event.controls);
							}
							if(event.dialog){
								if(Array.isArray(event.dialog)){
									event.dialog=ui.create.dialog.apply(this,event.dialog);
								}
								event.dialog.open();
							}
							else if(event.choiceList){
								event.dialog=ui.create.dialog(event.prompt||'选择一项','hidden');
								event.dialog.forcebutton=true;
								event.dialog.open();
								for(var i=0;i<event.choiceList.length;i++){
									event.dialog.add('<div class="popup text" style="width:calc(100% - 10px);display:inline-block">'+
									(event.displayIndex!==false?('选项'+get.cnNumber(i+1,true)+'：'):'')+event.choiceList[i]+'</div>');
								}
							}
							else if(event.prompt){
								event.dialog=ui.create.dialog(event.prompt);
								if(event.prompt2){
									event.dialog.addText(event.prompt2,Boolean(event.prompt2.length<=20||event.centerprompt2));
								}
							}
						}
						game.pause();
						game.countChoose();
						event.choosing=true;
					}
					else if(event.isOnline()){
						event.send();
					}
					else{
						event.result='ai';
					}
					"step 1"
					if(event.result=='ai'){
						event.result={};
						if(event.ai){
							var result=event.ai(event.getParent(),player);
							if(typeof result=='number') event.result.control=event.controls[result];
							else event.result.control=result;
						}
						else event.result.control=event.controls[event.choice];
					}
					event.result.index=event.controls.indexOf(event.result.control);
					event.choosing=false;
					_status.imchoosing=false;
					if(event.dialog&&event.dialog.close) event.dialog.close();
					if(event.controlbar) event.controlbar.close();
					if(event.controlbars){
						for(var i=0;i<event.controlbars.length;i++){
							event.controlbars[i].close();
						}
					}
					event.resume();
				},
				chooseBool:function(){
					"step 0"
					if(event.isMine()){
						if(event.frequentSkill&&!lib.config.autoskilllist.contains(event.frequentSkill)){
							ui.click.ok();
							return;
						}
						else if(event.hsskill&&_status.prehidden_skills.contains(event.hsskill)){
							ui.click.cancel();
							return;
						}
						ui.create.confirm('oc');
						if(event.createDialog&&!event.dialog){
							if(Array.isArray(event.createDialog)){
								event.dialog=ui.create.dialog.apply(this,event.createDialog);
								if(event.dialogselectx){
									for(var i=0;i<event.dialog.buttons.length;i++){
										event.dialog.buttons[i].classList.add('selectedx');
									}
								}
							}
						}
						if(event.dialog){
							event.dialog.open();
						}
						else if(event.prompt){
							event.dialog=ui.create.dialog(event.prompt);
							if(event.prompt2){
								event.dialog.addText(event.prompt2,event.prompt2.length<=20);
							}
						}
						game.pause();
						game.countChoose();
						event.choosing=true;
					}
					else if(event.isOnline()){
						event.send();
					}
					else{
						event.result='ai';
					}
					"step 1"
					if(event.result=='ai'){
						if(event.ai){
							event.choice=event.ai(event.getParent(),player);
						}
						event.result={bool:event.choice};
					}
					_status.imchoosing=false;
					event.choosing=false;
					if(event.dialog) event.dialog.close();
					event.resume();
				},
				chooseDrawRecover:function(){
					'step 0'
					if(player.isHealthy()&&event.forced){
						player.draw(event.num1);
						event.finish();
						return;
					}
					var controls=['draw_card'];
					if(player.isDamaged()){
						event.num2=Math.min(event.num2,player.maxHp-player.hp);
						controls.push('recover_hp');
					}
					if(!event.forced){
						controls.push('cancel2');
					}
					var prompt=event.prompt;
					if(!prompt){
						if(player.isHealthy()){
							prompt='是否摸'+get.cnNumber(event.num1)+'张牌？';
						}
						else{
							prompt='摸'+get.cnNumber(event.num1)+'张牌或回复'+get.cnNumber(event.num2)+'点体力';
						}
					}
					var next=player.chooseControl(controls);
					next.set('prompt',prompt);
					if(event.hsskill) next.setHiddenSkill(event.hsskill);
					if(event.ai){
						next.set('ai',event.ai);
					}
					else{
						var choice;
						if(player.isDamaged()&&get.recoverEffect(player)>0&&(
							player.hp==1||player.needsToDiscard()||
							player.hasSkillTag('maixie_hp')||event.num2>event.num1||
							(event.num2==event.num1&&player.needsToDiscard(1))
						)){
							choice='recover_hp';
						}
						else{
							choice='draw_card';
						}
						next.set('ai',function(){
							return _status.event.choice;
						});
						next.set('choice',choice);
					}
					'step 1'
					if(result.control!='cancel2'){
						if(event.logSkill){
							if(typeof event.logSkill=='string'){
								player.logSkill(event.logSkill);
							}
							else if(Array.isArray(event.logSkill)){
								player.logSkill.apply(player,event.logSkill);
							}
						}
						if(result.control=='draw_card'){
							player.draw(event.num1);
						}
						else{
							player.recover(event.num2);
						}
					}
					event.result=result;
				},
				choosePlayerCard:function(){
					"step 0"
					if(!event.dialog) event.dialog=ui.create.dialog('hidden');
					else if(!event.isMine()){
						event.dialog.style.display='none';
					}
					if(event.prompt){
						event.dialog.add(event.prompt);
					}
					else{
						event.dialog.add('选择'+get.translation(target)+'的一张牌');
					}
					if(event.prompt2){
						event.dialog.addText(event.prompt2);
					}
					var expand_length=0;
					var directh=!lib.config.unauto_choose;
					for(var i=0;i<event.position.length;i++){
						if(event.position[i]=='h'){
							var hs=target.getCards('h');
							if(hs.length){
								expand_length+=Math.ceil(hs.length/6);
								var title=event.dialog.add('<div class="text center" style="margin: 0px;">手牌区</div>');
								title.style.margin='0px';
								title.style.padding='0px';
								hs.randomSort();
								if(event.visible||target.isUnderControl(true)||player.hasSkillTag('viewHandcard',null,target,true)){
									event.dialog.add(hs);
									directh=false;
								}
								else{
									var shown=hs.filter(card=>get.is.shownCard(card));
									if(shown.length){
										var hidden=hs.filter(card=>!shown.includes(card));
										var buttons=ui.create.div('.buttons',event.dialog.content);
										event.dialog.buttons=event.dialog.buttons.concat(ui.create.buttons(shown,'card',buttons));
										event.dialog.buttons=event.dialog.buttons.concat(ui.create.buttons(hidden,'blank',buttons));
										if(event.dialog.forcebutton!==false) event.dialog.forcebutton=true;
										if(event.dialog.buttons.length>3){
											event.dialog.classList.remove('forcebutton-auto');
										}
										else if(!event.dialog.noforcebutton){
											event.dialog.classList.add('forcebutton-auto');
										}
									}
									else{
										event.dialog.add([hs,'blank']);
									}
								}
							}
						}
						else if(event.position[i]=='e'){
							var es=target.getCards('e');
							if(es.length){
								expand_length+=Math.ceil(es.length/6);
								var title=event.dialog.add('<div class="text center" style="margin: 0px;">装备区</div>');
								title.style.margin='0px';
								title.style.padding='0px';
								event.dialog.add(es);
								directh=false;
							}
						}
						else if(event.position[i]=='j'){
							var js=target.getCards('j');
							if(js.length){
								expand_length+=Math.ceil(js.length/6);
								var title=event.dialog.add('<div class="text center" style="margin: 0px;">判定区</div>');
								title.style.margin='0px';
								title.style.padding='0px';
								event.dialog.add(js);
								directh=false;
							}
						}
					}
					if(event.dialog.buttons.length==0){
						event.finish();
						return;
					}
					var cs=target.getCards(event.position);
					var select=get.select(event.selectButton);
					if(event.forced&&select[0]>=cs.length){
						event.result={
							bool:true,
							buttons:event.dialog.buttons,
							links:cs
						}
					}
					else if(event.forced&&directh&&!event.isOnline()&&select[0]==select[1]){
						event.result={
							bool:true,
							buttons:event.dialog.buttons.randomGets(select[0]),
							links:[]
						}
						for(var i=0;i<event.result.buttons.length;i++){
							event.result.links[i]=event.result.buttons[i].link;
						}
					}
					else{
						if(event.isMine()){
							if(event.hsskill&&!event.forced&&_status.prehidden_skills.contains(event.hsskill)){
								ui.click.cancel();
								return;
							}
							event.dialog.open();
							game.check();
							game.pause();
							if(expand_length>2){
								ui.arena.classList.add('choose-player-card');
								event.dialog.classList.add('fullheight');
							}
						}
						else if(event.isOnline()){
							event.send();
						}
						else{
							event.result='ai';
						}
					}
					"step 1"
					if(event.result=='ai'){
						game.check();
						if((ai.basic.chooseButton(event.ai)||forced)&&(!event.filterOk||event.filterOk())) ui.click.ok();
						else ui.click.cancel();
					}
					event.dialog.close();
					if(event.result.links){
						event.result.cards=event.result.links.slice(0);
					}
					event.resume();
					setTimeout(function(){
						ui.arena.classList.remove('choose-player-card');
					},500);
				},
				discardPlayerCard:function(){
					"step 0"
					if(event.directresult){
						event.result={
							buttons:[],
							cards:event.directresult.slice(0),
							links:event.directresult.slice(0),
							targets:[],
							confirm:'ok',
							bool:true
						};
						event.cards=event.directresult.slice(0);
						event.goto(2);
						return;
					}
					if(!event.dialog) event.dialog=ui.create.dialog('hidden');
					else if(!event.isMine()){
						event.dialog.style.display='none';
					}
					if(event.prompt==undefined){
						var str='弃置'+get.translation(target);
						var range=get.select(event.selectButton);
						if(range[0]==range[1]) str+=get.cnNumber(range[0]);
						else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
						else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
						str+='张';
						if(event.position=='h'||event.position==undefined) str+='手';
						if(event.position=='e') str+='装备';
						str+='牌';
						event.prompt=str;
					}
					if(event.prompt){
						event.dialog.add(event.prompt);
					}
					if(event.prompt2){
						event.dialog.addText(event.prompt2);
					}
					var directh=(!lib.config.unauto_choose&&!event.complexSelect);
					var expand_length=0;
					for(var i=0;i<event.position.length;i++){
						if(event.position[i]=='h'){
							var hs=target.getDiscardableCards(player,'h');
							expand_length+=Math.ceil(hs.length/6);
							if(hs.length){
								var title=event.dialog.add('<div class="text center" style="margin: 0px;">手牌区</div>');
								title.style.margin='0px';
								title.style.padding='0px';
								hs.randomSort();
								if(event.visible||target.isUnderControl(true)||player.hasSkillTag('viewHandcard',null,target,true)){
									event.dialog.add(hs);
									directh=false;
								}
								else{
									var shown=hs.filter(card=>get.is.shownCard(card));
									if(shown.length){
										var hidden=hs.filter(card=>!shown.includes(card));
										var buttons=ui.create.div('.buttons',event.dialog.content);
										event.dialog.buttons=event.dialog.buttons.concat(ui.create.buttons(shown,'card',buttons));
										event.dialog.buttons=event.dialog.buttons.concat(ui.create.buttons(hidden,'blank',buttons));
										if(event.dialog.forcebutton!==false) event.dialog.forcebutton=true;
										if(event.dialog.buttons.length>3){
											event.dialog.classList.remove('forcebutton-auto');
										}
										else if(!event.dialog.noforcebutton){
											event.dialog.classList.add('forcebutton-auto');
										}
									}
									else{
										event.dialog.add([hs,'blank']);
									}
								}
							}
						}
						else if(event.position[i]=='e'){
							var es=target.getDiscardableCards(player,'e');
							if(es.length){
								expand_length+=Math.ceil(es.length/6);
								var title=event.dialog.add('<div class="text center" style="margin: 0px;">装备区</div>');
								title.style.margin='0px';
								title.style.padding='0px';
								event.dialog.add(es);
								directh=false;
							}
						}
						else if(event.position[i]=='j'){
							var js=target.getDiscardableCards(player,'j');
							if(js.length){
								expand_length+=Math.ceil(js.length/6);
								var title=event.dialog.add('<div class="text center" style="margin: 0px;">判定区</div>');
								title.style.margin='0px';
								title.style.padding='0px';
								event.dialog.add(js);
								directh=false;
							}
						}
					}
					if(event.dialog.buttons.length==0){
						event.finish();
						return;
					}
					var cs=target.getCards(event.position);
					var select=get.select(event.selectButton);
					if(event.forced&&select[0]>=cs.length){
						event.result={
							bool:true,
							buttons:event.dialog.buttons,
							links:cs
						}
					}
					else if(event.forced&&directh&&!event.isOnline()&&select[0]==select[1]){
						event.result={
							bool:true,
							buttons:event.dialog.buttons.randomGets(select[0]),
							links:[]
						}
						for(var i=0;i<event.result.buttons.length;i++){
							event.result.links[i]=event.result.buttons[i].link;
						}
					}
					else{
						if(event.isMine()){
							event.dialog.open();
							game.check();
							game.pause();
							if(expand_length>2){
								ui.arena.classList.add('discard-player-card');
								event.dialog.classList.add('fullheight');
							}
						}
						else if(event.isOnline()){
							event.send();
						}
						else{
							event.result='ai';
						}
					}
					"step 1"
					if(event.result=='ai'){
						game.check();
						if((ai.basic.chooseButton(event.ai)||forced)&&(!event.filterOk||event.filterOk())) ui.click.ok();
						else ui.click.cancel();
					}
					event.dialog.close();
					"step 2"
					event.resume();
					setTimeout(function(){
						ui.arena.classList.remove('discard-player-card');
					},500);
					if(event.result.bool&&event.result.links&&!game.online){
						if(event.logSkill){
							if(typeof event.logSkill=='string'){
								player.logSkill(event.logSkill);
							}
							else if(Array.isArray(event.logSkill)){
								player.logSkill.apply(player,event.logSkill);
							}
						}
						var cards=[];
						for(var i=0;i<event.result.links.length;i++){
							cards.push(event.result.links[i]);
						}
						event.result.cards=event.result.links.slice(0);
						event.cards=cards;
						event.trigger("rewriteDiscardResult");
					}
					"step 3"
					if(event.boolline){
						player.line(target,'green');
					}
					if(!event.chooseonly){
						var next=target.discard(event.cards);
						if(player!=target) next.notBySelf=true;
						next.discarder=player;
						event.done=next;
						if(event.delay===false){
							next.set('delay',false);
						}
					}
				},
				gainPlayerCard:function(){
					"step 0"
					if(event.directresult){
						event.result={
							buttons:[],
							cards:event.directresult.slice(0),
							links:event.directresult.slice(0),
							targets:[],
							confirm:'ok',
							bool:true
						};
						event.cards=event.directresult.slice(0);
						event.goto(2);
						return;
					}
					if(!event.dialog) event.dialog=ui.create.dialog('hidden');
					else if(!event.isMine()){
						event.dialog.style.display='none';
					}
					if(event.prompt==undefined){
						var str='获得'+get.translation(target);
						var range=get.select(event.selectButton);
						if(range[0]==range[1]) str+=get.cnNumber(range[0]);
						else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
						else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
						str+='张';
						if(event.position=='h'||event.position==undefined) str+='手';
						if(event.position=='e') str+='装备';
						str+='牌';
						event.prompt=str;
					}
					if(event.prompt){
						event.dialog.add(event.prompt);
					}
					if(event.prompt2){
						event.dialog.addText(event.prompt2);
					}
					var expand_length=0;
					var directh=(!lib.config.unauto_choose&&!event.complexSelect);
					for(var i=0;i<event.position.length;i++){
						if(event.position[i]=='h'){
							var hs=target.getGainableCards(player,'h');
							if(hs.length){
								expand_length+=Math.ceil(hs.length/6);
								var title=event.dialog.add('<div class="text center" style="margin: 0px;">手牌区</div>');
								title.style.margin='0px';
								title.style.padding='0px';
								hs.randomSort();
								if(event.visible||target.isUnderControl(true)||player.hasSkillTag('viewHandcard',null,target,true)){
									event.dialog.add(hs);
									directh=false;
								}
								else{
									var shown=hs.filter(card=>get.is.shownCard(card));
									if(shown.length){
										var hidden=hs.filter(card=>!shown.includes(card));
										var buttons=ui.create.div('.buttons',event.dialog.content);
										event.dialog.buttons=event.dialog.buttons.concat(ui.create.buttons(shown,'card',buttons));
										event.dialog.buttons=event.dialog.buttons.concat(ui.create.buttons(hidden,'blank',buttons));
										if(event.dialog.forcebutton!==false) event.dialog.forcebutton=true;
										if(event.dialog.buttons.length>3){
											event.dialog.classList.remove('forcebutton-auto');
										}
										else if(!event.dialog.noforcebutton){
											event.dialog.classList.add('forcebutton-auto');
										}
									}
									else{
										event.dialog.add([hs,'blank']);
									}
								}
							}
						}
						else if(event.position[i]=='e'){
							var es=target.getGainableCards(player,'e');
							if(es.length){
								expand_length+=Math.ceil(es.length/6);
								var title=event.dialog.add('<div class="text center" style="margin: 0px;">装备区</div>');
								title.style.margin='0px';
								title.style.padding='0px';
								event.dialog.add(es);
								directh=false;
							}
						}
						else if(event.position[i]=='j'){
							var js=target.getGainableCards(player,'j');
							if(js.length){
								expand_length+=Math.ceil(js.length/6);
								var title=event.dialog.add('<div class="text center" style="margin: 0px;">判定区</div>');
								title.style.margin='0px';
								title.style.padding='0px';
								event.dialog.add(js);
								directh=false;
							}
						}
					}
					if(event.dialog.buttons.length==0){
						event.dialog.close();
						event.finish();
						return;
					}
					var cs=target.getCards(event.position);
					var select=get.select(event.selectButton);
					if(event.forced&&select[0]>=cs.length){
						event.result={
							bool:true,
							buttons:event.dialog.buttons,
							links:cs
						}
					}
					else if(event.forced&&directh&&!event.isOnline()&&select[0]==select[1]){
						event.result={
							bool:true,
							buttons:event.dialog.buttons.randomGets(select[0]),
							links:[]
						}
						for(var i=0;i<event.result.buttons.length;i++){
							event.result.links[i]=event.result.buttons[i].link;
						}
					}
					else{
						if(event.isMine()){
							event.dialog.open();
							game.check();
							game.pause();
							if(expand_length>2){
								ui.arena.classList.add('gain-player-card');
								event.dialog.classList.add('fullheight');
							}
						}
						else if(event.isOnline()){
							event.send();
						}
						else{
							event.result='ai';
						}
					}
					"step 1"
					if(event.result=='ai'){
						game.check();
						if((ai.basic.chooseButton(event.ai)||forced)&&(!event.filterOk||event.filterOk())) ui.click.ok();
						else ui.click.cancel();
					}
					event.dialog.close();
					"step 2"
					event.resume();
					setTimeout(function(){
						ui.arena.classList.remove('gain-player-card');
					},500);
					if(game.online||!event.result.bool){
						event.finish();
					}
					"step 3"
					if(event.logSkill&&event.result.bool&&!game.online){
						if(typeof event.logSkill=='string'){
							player.logSkill(event.logSkill);
						}
						else if(Array.isArray(event.logSkill)){
							player.logSkill.apply(player,event.logSkill);
						}
					}
					var cards=[];
					for(var i=0;i<event.result.links.length;i++){
						cards.push(event.result.links[i]);
					}
					event.result.cards=event.result.links.slice(0);
					event.cards=cards;
					event.trigger("rewriteGainResult");
					"step 4"
					if(event.boolline){
						player.line(target,'green');
					}
					if(!event.chooseonly){
						if(event.delay!==false){
							var next=player.gain(event.cards,target,event.visibleMove?'give':'giveAuto','bySelf');
							event.done=next;
						}
						else{
							var next=player.gain(event.cards,target,'bySelf');
							event.done=next;
							target[event.visibleMove?'$give':'$giveAuto'](cards,player);
							if(event.visibleMove) next.visible=true;
						}
					}
					else target[event.visibleMove?'$give':'$giveAuto'](cards,player);
				},
				showHandcards:function(){
					"step 0"
					if(player.countCards('h')==0){
						event.finish();
						return;
					}
					var cards=player.getCards('h');
					player.showCards(cards).setContent(function(){});
					var str=get.translation(player.name)+'的手牌';
					if(typeof event.prompt=='string'){
						str=event.prompt;
					}
					event.dialog=ui.create.dialog(str,cards);
					event.dialogid=lib.status.videoId++;
					event.dialog.videoId=event.dialogid;
					game.broadcast(function(str,cards,id){
						ui.create.dialog(str,cards).videoId=id;
					},str,cards,event.dialogid);
					game.log(player,'展示了',cards);
					game.addVideo('showCards',player,[str,get.cardsInfo(cards)]);
					game.delayx(2);
					"step 1"
					game.broadcast('closeDialog',event.dialogid);
					event.dialog.close();
				},
				showCards:function(){
					"step 0"
					if(get.itemtype(cards)!='cards'){
						event.finish();
						return;
					}
					if(!event.str){
						event.str=get.translation(player.name)+'展示的牌';
					}
					event.dialog=ui.create.dialog(event.str,cards);
					event.dialogid=lib.status.videoId++;
					event.dialog.videoId=event.dialogid;

					if(event.hiddencards){
						for(var i=0;i<event.dialog.buttons.length;i++){
							if(event.hiddencards.contains(event.dialog.buttons[i].link)){
								event.dialog.buttons[i].className='button card';
								event.dialog.buttons[i].innerHTML='';
							}
						}
					}
					game.broadcast(function(str,cards,cards2,id){
						var dialog=ui.create.dialog(str,cards);
						dialog.forcebutton=true;
						dialog.videoId=id;
						if(cards2){
							for(var i=0;i<dialog.buttons.length;i++){
								if(cards2.contains(dialog.buttons[i].link)){
									dialog.buttons[i].className='button card';
									dialog.buttons[i].innerHTML='';
								}
							}
						}
					},event.str,cards,event.hiddencards,event.dialogid);
					if(event.hiddencards){
						var cards2=cards.slice(0);
						for(var i=0;i<event.hiddencards.length;i++){
							cards2.remove(event.hiddencards[i]);
						}
						game.log(player,'展示了',cards2);
					}
					else{
						game.log(player,'展示了',cards);
					}
					game.delayx(event.delay_time||2.5);
					game.addVideo('showCards',player,[event.str,get.cardsInfo(cards)]);
					"step 1"
					game.broadcast('closeDialog',event.dialogid);
					event.dialog.close();
				},
				viewCards:function(){
					"step 0"
					if(player==game.me){
						event.dialog=ui.create.dialog(event.str,event.cards);
						if(event.isMine()){
							game.pause();
							ui.create.confirm('o');
							game.countChoose();
							event.choosing=true;
						}
						else{
							event.finish();
							event.result='viewed';
							setTimeout(function(){
								event.dialog.close();
							},2*lib.config.duration);
							game.delayx(2);
						}
					}
					else if(event.isOnline()){
						event.send();
					}
					else{
						event.finish();
					}
					"step 1"
					event.result='viewed';
					_status.imchoosing=false;
					event.choosing=false;
					if(event.dialog) event.dialog.close();
				},
				moveCard:function(){
					'step 0'
					if(!player.canMoveCard(null,event.nojudge)){
						event.finish();
						return;
					}
					var next=player.chooseTarget(2,function(card,player,target){
						if(ui.selected.targets.length){
							var from=ui.selected.targets[0];
							var js=from.getCards('j');
							for(var i=0;i<js.length;i++){
								if(_status.event.nojudge) break;
								if(target.canAddJudge(js[i])) return true;
							}
							if(target.isMin()) return false;
							var es=from.getCards('e');
							for(var i=0;i<es.length;i++){
								if(target.canEquip(es[i])) return true;
							}
							return false;
						}
						else{
							var range='ej';
							if(_status.event.nojudge) range='e';
							return target.countCards(range)>0;
						}
					});
					next.set('nojudge',event.nojudge||false);
					next.set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						var sgnatt=get.sgn(att);
						if(ui.selected.targets.length==0){
							if(att>0){
								if(!_status.event.nojudge&&target.countCards('j',function(card){
									return game.hasPlayer(function(current){
										return current!=target&&current.canAddJudge(card)&&get.attitude(player,current)<0;
									})
								})) return 14;
								if(target.countCards('e',function(card){
									return get.value(card,target)<0&&game.hasPlayer(function(current){
										return current!=target&&get.attitude(player,current)<0&&current.canEquip(card)&&get.effect(target,card,player,player)<0;
									});
								})>0) return 9;
							}
							else if(att<0){
								if(game.hasPlayer(function(current){
									if(current!=target&&get.attitude(player,current)>0){
										var es=target.getCards('e');
										for(var i=0;i<es.length;i++){
											if(get.value(es[i],target)>0&&current.canEquip(es[i])&&get.effect(current,es[i],player,player)>0) return true;
										}
									}
								})){
									return -att;
								}
							}
							return 0;
						}
						var es=ui.selected.targets[0].getCards('e');
						var i;
						var att2=get.sgn(get.attitude(player,ui.selected.targets[0]));
						for(i=0;i<es.length;i++){
							if(sgnatt!=0&&att2!=0&&sgnatt!=att2&&
								get.sgn(get.value(es[i],ui.selected.targets[0]))==-att2&&
								get.sgn(get.effect(target,es[i],player,target))==sgnatt&&
								target.canEquip(es[i])){
								return Math.abs(att);
							}
						}
						if(i==es.length&&(_status.event.nojudge||!ui.selected.targets[0].countCards('j',function(card){
							return target.canAddJudge(card);
						})||att2<=0)){
							return 0;
						}
						return -att*att2;
					});
					next.set('multitarget',true);
					next.set('targetprompt',_status.event.targetprompt||['被移走','移动目标']);
					next.set('prompt',event.prompt||'移动场上的一张牌');
					if(event.prompt2) next.set('prompt2',event.prompt2);
					if(event.forced) next.set('forced',true);
					'step 1'
					event.result=result;
					if(result.bool){
						player.line2(result.targets,'green');
						event.targets=result.targets;
					}
					else{
						event.finish();
					}
					'step 2'
					game.delay();
					'step 3'
					if(targets.length==2){
						player.choosePlayerCard('ej',true,function(button){
							var player=_status.event.player;
							var targets0=_status.event.targets0;
							var targets1=_status.event.targets1;
							if(get.attitude(player,targets0)>0&&get.attitude(player,targets1)<0){
								if(get.position(button.link)=='j') return 12;
								if(get.value(button.link,targets0)<0&&get.effect(targets1,button.link,player,targets1)>0) return 10;
								return 0;
							}
							else{
								if(get.position(button.link)=='j') return -10;
								return get.value(button.link)*get.effect(targets1,button.link,player,targets1);
							}
						},targets[0]).set('nojudge',event.nojudge||false).set('targets0',targets[0]).set('targets1',targets[1]).set('filterButton',function(button){
							var targets1=_status.event.targets1;
							if(get.position(button.link)=='j'){
								if(_status.event.nojudge) return false;
								return targets1.canAddJudge(button.link);
							}
							else{
								return targets1.canEquip(button.link);
							}
						});
					}
					else{
						event.finish();
					}
					'step 4'
					if(result.bool&&result.links.length){
						var link=result.links[0];
						if(get.position(link)=='e'){
							event.targets[1].equip(link);
						}
						else if(link.viewAs){
							event.targets[1].addJudge({name:link.viewAs},[link]);
						}
						else{
							event.targets[1].addJudge(link);
						}
						event.targets[0].$give(link,event.targets[1],false);
						game.log(event.targets[0],'的',link,'被移动给了',event.targets[1])
						event.result.card=link;
						event.result.position=get.position(link);
						game.delay();
					}
				},
				useCard:function(){
					"step 0"
					if(!card){
						console.log('err: no card',get.translation(event.player));
						event.finish();
						return;
					}
					if(!get.info(card,false).noForceDie) event.forceDie=true;
					if(cards.length){
						var owner=(get.owner(cards[0])||player);
						var next=owner.lose(cards,'visible',ui.ordering).set('type','use');
						var directDiscard=[];
						for(var i=0;i<cards.length;i++){
							if(!next.cards.contains(cards[i])){
								directDiscard.push(cards[i]);
							}
						}
						if(directDiscard.length) game.cardsGotoOrdering(directDiscard);
					}
					//player.using=cards;
					var cardaudio=true;
					if(event.skill){
						if(lib.skill[event.skill].audio){
							cardaudio=false;
						}
						if(lib.skill[event.skill].log!=false){
							player.logSkill(event.skill);
						}
						if(get.info(event.skill).popname){
							player.tryCardAnimate(card,event.card.name,'metal',true);
						}
					}
					else if(!event.nopopup){
						if(lib.translate[event.card.name+'_pop']){
							player.tryCardAnimate(card,lib.translate[event.card.name+'_pop'],'metal');
						}
						else{
							player.tryCardAnimate(card,event.card.name,'metal');
						}
					}	
					if(event.audio===false){
						cardaudio=false;
					}
					if(cardaudio) game.broadcastAll((player,card)=>{
						if(!lib.config.background_audio||get.type(card)=='equip'&&!lib.config.equip_audio) return;
						const sex=player.sex=='female'?'female':'male';
						var nature=get.natureList(card)[0];
						if(card.name=='sha'&&['fire','thunder','ice','stab'].includes(nature)){
							game.playAudio('card',sex,`${card.name}_${nature}`);
							return;
						}
						const audio=lib.card[card.name].audio;
						if(typeof audio=='string'){
							const audioInfo=audio.split(':');
							if(audio.startsWith('db:')) game.playAudio(`${audioInfo[0]}:${audioInfo[1]}`,audioInfo[2],`${card.name}_${sex}.${audioInfo[3]||'mp3'}`);
							else if(audio.startsWith('ext:')) game.playAudio(`${audioInfo[0]}:${audioInfo[1]}`,`${card.name}_${sex}.${audioInfo[2]||'mp3'}`);
							else game.playAudio('card',sex,`${audioInfo[0]}.${audioInfo[1]||'mp3'}`);
						}
						else game.playAudio('card',sex,card.name);
					},player,card);
					if(event.animate!=false&&event.line!=false){
						if(card.name=='wuxie'&&event.getParent()._info_map){
							var evtmap=event.getParent()._info_map;
							if(evtmap._source) evtmap=evtmap._source;
							var lining=(evtmap.multitarget?evtmap.targets:evtmap.target)||event.player;
							if(Array.isArray(lining)&&event.getTrigger().name=='jiedao'){
								player.line(lining[0],'green');
							}
							else{
								player.line(lining,'green');
							}
						}
						else if(card.name=='youdishenru'&&event.getParent().source){
							var lining=event.getParent().sourcex||event.getParent().source2||event.getParent().source;
							if(lining==player&&event.getParent().sourcex2){
								lining=event.getParent().sourcex2;
							}
							if(Array.isArray(lining)&&event.getTrigger().name=='jiedao'){
								player.line(lining[0],'green');
							}
							else{
								player.line(lining,'green');
							}
						}
						else{
							var config={};
							var nature=get.natureList(card)[0];
							if(nature||card.classList&&card.classList.contains(nature)) config.color=nature;
							if(event.addedTarget){
								player.line2(targets.concat(event.addedTargets),config);
							}
							else if(get.info(card,false).multitarget&&targets.length>1&&!get.info(card,false).multiline){
								player.line2(targets,config);
							}
							else{
								player.line(targets,config);
							}
						}
						if(event.throw!==false) player.$throw(cards);
						if(lib.config.sync_speed&&cards[0]&&cards[0].clone){
							var waitingForTransition=get.time();
							event.waitingForTransition=waitingForTransition;
							cards[0].clone.listenTransition(function(){
								if(_status.waitingForTransition==waitingForTransition&&_status.paused){
									game.resume();
								}
								delete event.waitingForTransition;
							});
						}
					}
					event.id=get.id();
					if(!Array.isArray(event.excluded)) event.excluded=[];
					if(!Array.isArray(event.directHit)) event.directHit=[];
					if(typeof event.customArgs!='object'||typeof event.customArgs.default!='object') event.customArgs={default:{}};
					if(typeof event.baseDamage!='number') event.baseDamage=get.info(card,false).baseDamage||1;
					if(typeof event.effectCount!='number') event.effectCount=get.info(card,false).effectCount||1;
					event.effectedCount=0;
					if(event.oncard){
						event.oncard(event.card,event.player);
					}
					player.actionHistory[player.actionHistory.length-1].useCard.push(event);
					game.getGlobalHistory().useCard.push(event);
					if(event.addCount!==false){
						if(player.stat[player.stat.length-1].card[card.name]==undefined){
							player.stat[player.stat.length-1].card[card.name]=1;
						}
						else{
							player.stat[player.stat.length-1].card[card.name]++;
						}
					}
					if(event.skill){
						if(player.stat[player.stat.length-1].skill[event.skill]==undefined){
							player.stat[player.stat.length-1].skill[event.skill]=1;
						}
						else{
							player.stat[player.stat.length-1].skill[event.skill]++;
						}
						var sourceSkill=get.info(event.skill).sourceSkill;
						if(sourceSkill){
							if(player.stat[player.stat.length-1].skill[sourceSkill]==undefined){
								player.stat[player.stat.length-1].skill[sourceSkill]=1;
							}
							else{
								player.stat[player.stat.length-1].skill[sourceSkill]++;
							}
						}
					}
					if(targets.length){
						var str=(targets.length==1&&targets[0]==player)?'#b自己':targets;
						if(cards.length&&!card.isCard){
							if(event.addedTarget){
								game.log(player,'对',str,'使用了',card,'（',cards,'，指向',event.addedTargets,'）');
							}
							else{
								game.log(player,'对',str,'使用了',card,'（',cards,'）');
							}
						}
						else{
							if(event.addedTarget){
								game.log(player,'对',str,'使用了',card,'（指向',event.addedTargets,'）');
							}
							else{
								game.log(player,'对',str,'使用了',card);
							}
						}
					}
					else{
						if(cards.length&&!card.isCard){
							if(event.addedTarget){
								game.log(player,'使用了',card,'（',cards,'，指向',event.addedTargets,'）');
							}
							else{
								game.log(player,'使用了',card,'（',cards,'）');
							}
						}
						else{
							if(event.addedTarget){
								game.log(player,'使用了',card,'（指向',event.addedTargets,'）');
							}
							else{
								game.log(player,'使用了',card);
							}
						}
					}
					if(card.name=='wuxie'){
						game.logv(player,[card,cards],[event.getTrigger().card]);
					}
					else{
						game.logv(player,[card,cards],targets);
					}
					event.trigger('useCard1');
					"step 1"
					event.trigger('yingbian');
					"step 2"
					event.trigger('useCard2');
					"step 3"
					event.trigger('useCard');
					event._oncancel=function(){
						game.broadcastAll(function(id){
							if(ui.tempnowuxie&&ui.tempnowuxie._origin==id){
								ui.tempnowuxie.close();
								delete ui.tempnowuxie;
							}
						},event.id);
					};
					"step 4"
					event.sortTarget=function(animate,sort){
						var info=get.info(card,false);
						if(num==0&&targets.length>1){
							if(!info.multitarget){
								if(!event.fixedSeat&&!sort){
									targets.sortBySeat((_status.currentPhase||player));
								}
								if(animate)	for(var i=0;i<targets.length;i++){
									targets[i].animate('target');
								}
							}
							else if(animate){
								for(var i=0;i<targets.length;i++){
									targets[i].animate('target');
								}
							}
						}
					}
					event.sortTarget();
					event.getTriggerTarget=function(list1,list2){
						var listx=list1.slice(0).sortBySeat((_status.currentPhase||player));
						for(var i=0;i<listx.length;i++){
							if(get.numOf(list2,listx[i])<get.numOf(listx,listx[i])) return listx[i];
						}
						return null;
					}
					"step 5"
					if(event.all_excluded) return;
					if(!event.triggeredTargets1) event.triggeredTargets1=[];
					var target=event.getTriggerTarget(targets,event.triggeredTargets1);
					if(target){
						event.triggeredTargets1.push(target);
						var next=game.createEvent('useCardToPlayer',false);
						if(!event.isFirstTarget1){
							event.isFirstTarget1=true;
							next.isFirstTarget=true;
						}
						next.setContent('emptyEvent');
						next.targets=targets;
						next.target=target;
						next.card=card;
						next.cards=cards;
						next.player=player;
						next.skill=event.skill;
						next.excluded=event.excluded;
						next.directHit=event.directHit;
						next.customArgs=event.customArgs;
						if(event.forceDie) next.forceDie=true;
						event.redo();
					}
					"step 6"
					if(event.all_excluded) return;
					if(!event.triggeredTargets2) event.triggeredTargets2=[];
					var target=event.getTriggerTarget(targets,event.triggeredTargets2);
					if(target){
						event.triggeredTargets2.push(target);
						var next=game.createEvent('useCardToTarget',false);
						if(!event.isFirstTarget2){
							event.isFirstTarget2=true;
							next.isFirstTarget=true;
						}
						next.setContent('emptyEvent');
						next.targets=targets;
						next.target=target;
						next.card=card;
						next.cards=cards;
						next.player=player;
						next.skill=event.skill;
						next.excluded=event.excluded;
						next.directHit=event.directHit;
						next.customArgs=event.customArgs;
						if(event.forceDie) next.forceDie=true;
						event.redo();
					}
					"step 7"
					var info=get.info(card,false);
					if(!info.nodelay&&event.animate!=false){
						if(event.delayx!==false){
							if(event.waitingForTransition){
								_status.waitingForTransition=event.waitingForTransition;
								game.pause();
							}
							else{
								game.delayx();
							}
						}
					}
					"step 8"
					if(event.all_excluded) return;
					if(!event.triggeredTargets3) event.triggeredTargets3=[];
					var target=event.getTriggerTarget(targets,event.triggeredTargets3);
					if(target){
						event.triggeredTargets3.push(target);
						var next=game.createEvent('useCardToPlayered',false);
						if(!event.isFirstTarget3){
							event.isFirstTarget3=true;
							next.isFirstTarget=true;
						}
						next.setContent('emptyEvent');
						next.targets=targets;
						next.target=target;
						next.card=card;
						next.cards=cards;
						next.player=player;
						next.skill=event.skill;
						next.excluded=event.excluded;
						next.directHit=event.directHit;
						next.customArgs=event.customArgs;
						if(event.forceDie) next.forceDie=true;
						event.redo();
					}
					"step 9"
					if(event.all_excluded) return;
					if(!event.triggeredTargets4) event.triggeredTargets4=[];
					var target=event.getTriggerTarget(targets,event.triggeredTargets4);
					if(target){
						event.triggeredTargets4.push(target);
						var next=game.createEvent('useCardToTargeted',false);
						if(!event.isFirstTarget4){
							event.isFirstTarget4=true;
							next.isFirstTarget=true;
						}
						next.setContent('emptyEvent');
						next.targets=targets;
						next.target=target;
						next.card=card;
						next.cards=cards;
						next.player=player;
						next.skill=event.skill;
						next.excluded=event.excluded;
						next.directHit=event.directHit;
						next.customArgs=event.customArgs;
						if(event.forceDie) next.forceDie=true;
						if(targets.length==event.triggeredTargets4.length){
							event.sortTarget();
						}
						event.redo();
					}
					"step 10"
					if(event.all_excluded) return;
					event.effectedCount++;
					event.num=0;
					var info=get.info(card,false);
					if(info.contentBefore){
						var next=game.createEvent(card.name+'ContentBefore');
						next.setContent(info.contentBefore);
						next.targets=targets;
						next.card=card;
						next.cards=cards;
						next.player=player;
						next.skill=event.skill;
						next.type='precard';
						if(event.forceDie) next.forceDie=true;
					}
					else if(info.reverseOrder&&get.is.versus()&&targets.length>1){
						var next=game.createEvent(card.name+'ContentBefore');
						next.setContent('reverseOrder');
						next.targets=targets;
						next.card=card;
						next.cards=cards;
						next.player=player;
						next.skill=event.skill;
						next.type='precard';
						if(event.forceDie) next.forceDie=true;
					}
					else if(info.singleCard&&info.filterAddedTarget&&event.addedTargets&&event.addedTargets.length<targets.length){
						var next=game.createEvent(card.name+'ContentBefore');
						next.setContent('addExtraTarget');
						next.target=target;
						next.targets=targets;
						next.card=card;
						next.cards=cards;
						next.player=player;
						next.skill=event.skill;
						next.type='precard';
						next.addedTarget=event.addedTarget;
						next.addedTargets=event.addedTargets;
						if(event.forceDie) next.forceDie=true;
					}
					"step 11"
					if(event.all_excluded) return;
					var info=get.info(card,false);
					if(num==0&&targets.length>1){
						event.sortTarget(true,true);
					}
					if(targets[num]&&targets[num].isDead()) return;
					if(targets[num]&&targets[num].isOut()) return;
					if(targets[num]&&targets[num].removed) return;
					if(targets[num]&&info.ignoreTarget&&info.ignoreTarget(card,player,targets[num])) return;
					if(targets.length==0&&!info.notarget) return;
					if(targets[num]&&event.excluded.contains(targets[num])){
					var next=game.createEvent('useCardToExcluded',false);
						next.setContent('emptyEvent');
						next.targets=targets;
						next.target=targets[num];
						next.num=num;
						next.card=card;
						next.cards=cards;
						next.player=player;
						return;
					};
					var next=game.createEvent(card.name);
					next.setContent(info.content);
					next.targets=targets;
					next.card=card;
					next.cards=cards;
					next.player=player;
					next.num=num;
					next.type='card';
					next.skill=event.skill;
					next.multitarget=info.multitarget;
					next.preResult=event.preResult;
					next.baseDamage=event.baseDamage;
					if(event.forceDie) next.forceDie=true;
					if(event.addedTargets){
						next.addedTargets=event.addedTargets;
						next.addedTarget=event.addedTargets[num];
						next._targets=event._targets;
					}
					if(info.targetDelay===false){
						event.targetDelay=false;
					}
					next.target=targets[num];
					for(var i in event.customArgs.default) next[i]=event.customArgs.default[i];
					if(next.target&&event.customArgs[next.target.playerid]){
						var customArgs=event.customArgs[next.target.playerid];
						for(var i in customArgs) next[i]=customArgs[i];
					}
					if(next.target&&event.directHit.contains(next.target)) next.directHit=true;
					if(next.target&&!info.multitarget){
						if(num==0&&targets.length>1){
							// var ttt=next.target;
							// setTimeout(function(){ttt.animate('target');},0.5*lib.config.duration);
						}
						else{
							next.target.animate('target');
						}
					}
					if(!info.nodelay&&num>0){
						if(event.targetDelay!==false){
							game.delayx(0.5);
						}
					}
					"step 12"
					if(event.all_excluded) return;
					if(!get.info(event.card,false).multitarget&&num<targets.length-1&&!event.cancelled){
						event.num++;
						event.goto(11);
					}
					"step 13"
					if(event.all_excluded) return;
					if(get.info(card,false).contentAfter){
						var next=game.createEvent(card.name+'ContentAfter');
						next.setContent(get.info(card,false).contentAfter);
						next.targets=targets;
						next.card=card;
						next.cards=cards;
						next.player=player;
						next.skill=event.skill;
						next.preResult=event.preResult;
						next.type='postcard';
						if(event.forceDie) next.forceDie=true;
					}
					"step 14"
					if(event.all_excluded) return;
					if(event.effectedCount<event.effectCount){
						if(document.getElementsByClassName('thrown').length){
							if(event.delayx!==false&&get.info(event.card,false).finalDelay!==false) game.delayx();
						}
						event.goto(10);
					}
					"step 15"
					if(event.postAi){
						event.player.logAi(event.targets,event.card);
					}
					if(event._result){
						event.result=event._result;
					}
					//delete player.using;
					if(document.getElementsByClassName('thrown').length){
						if(event.delayx!==false&&get.info(event.card,false).finalDelay!==false) game.delayx();
					}
					else{
						event.finish();
					}
					"step 16"
					event._oncancel();
				},
				useSkill:function(){
					"step 0"
					var info=get.info(event.skill);
					if(!info.noForceDie) event.forceDie=true;
					if(!info.noForceOut) event.includeOut=true;
					event._skill=event.skill;
					game.trySkillAudio(event.skill,player);
					var checkShow=player.checkShow(event.skill);
					if(info.discard!=false&&info.lose!=false&&!info.viewAs){
						player.discard(cards).delay=false;
						if(lib.config.low_performance){
							event.discardTransition=true;
						}
					}
					else{
						if(info.lose!=false){
							if(info.losetrigger==false){
								var losecard=player.lose(cards,ui.special)._triggered=null;
							}
							else{
								var losecard=player.lose(cards,ui.special);
								if(info.visible) losecard.visible=true;
								if(info.loseTo) losecard.position=ui[info.loseTo];
								if(info.insert) losecard.insert_card=true;
								if(losecard.position==ui.special&&info.toStorage) losecard.toStorage=true;
							}
						}
						if(!info.prepare&&info.viewAs){
							player.$throw(cards);
							if(losecard) losecard.visible=true;
							if(lib.config.sync_speed&&cards[0]&&cards[0].clone){
								var waitingForTransition=get.time();
								event.waitingForTransition=waitingForTransition;
								cards[0].clone.listenTransition(function(){
									if(_status.waitingForTransition==waitingForTransition&&_status.paused){
										game.resume();
									}
									delete event.waitingForTransition;
								});
							}
						}
					}
					if(info.line!=false&&targets.length){
						var config={};
						if(get.is.object(info.line)) config=info.line;
						else if(info.line=='fire'){
							config.color='fire';
						}
						else if(info.line=='thunder'){
							config.color='thunder';
						}
						else if(info.line===undefined||info.line=='green'){
							config.color='green';
						}
						if(info.multitarget&&!info.multiline&&targets.length>1){
							player.line2(targets,config);
						}
						else{
							player.line(targets,config);
						}
					}
					var str='';
					if(targets&&targets.length&&info.log!='notarget'){
						str+='对<span class="bluetext">'+(targets[0]==player?'自己':get.translation(targets[0]));
						for(var i=1;i<targets.length;i++){
							str+='、'+(targets[i]==player?'自己':get.translation(targets[i]));
						}
						str+='</span>'
					}
					str+='发动了';
					if(!info.direct&&info.log!==false){
						game.log(player,str,'【'+get.skillTranslation(skill,player)+'】');
						if(info.logv!==false) game.logv(player,skill,targets);
						player.trySkillAnimate(skill,skill,checkShow);
					}
					if(event.addCount!=false){
						if(player.stat[player.stat.length-1].skill[skill]==undefined){
							player.stat[player.stat.length-1].skill[skill]=1;
						}
						else{
							player.stat[player.stat.length-1].skill[skill]++;
						}
						var sourceSkill=get.info(skill).sourceSkill;
						if(sourceSkill){
							if(player.stat[player.stat.length-1].skill[sourceSkill]==undefined){
								player.stat[player.stat.length-1].skill[sourceSkill]=1;
							}
							else{
								player.stat[player.stat.length-1].skill[sourceSkill]++;
							}
						}
					}
					if(player.stat[player.stat.length-1].allSkills==undefined){
						player.stat[player.stat.length-1].allSkills=1;
					}
					else{
						player.stat[player.stat.length-1].allSkills++;
					}
					if(info.prepare){
						switch(info.prepare){
							case 'give':if(losecard) losecard.visible=true;player.$give(cards,targets[0]);break;
							case 'give2':player.$give(cards.length,targets[0]);break;
							case 'throw':if(losecard) losecard.visible=true;player.$throw(cards);break;
							case 'throw2':player.$throw(cards.length);break;
							default:info.prepare(cards,player,targets);
						}
					}
					if(info.round){
						var roundname=skill+'_roundcount';
						player.storage[roundname]=game.roundNumber;
						player.syncStorage(roundname);
						player.markSkill(roundname);
					}
					var name=event.skill;
					var players=player.getSkills(false,false,false);
					var equips=player.getSkills('e');
					var global=lib.skill.global.slice(0);
					var logInfo={
						skill:name,
						targets:targets,
						event:_status.event,
					};
					if(info.sourceSkill){
						logInfo.sourceSkill=info.sourceSkill;
						if(global.contains(info.sourceSkill)){
							logInfo.type='global';
						}
						else if(players.contains(info.sourceSkill)){
							logInfo.type='player';
						}
						else if(equips.contains(info.sourceSkill)){
							logInfo.type='equip';
						}
					}
					else{
						if(global.contains(name)){
							logInfo.sourceSkill=name;
							logInfo.type='global';
						}
						else if(players.contains(name)){
							logInfo.sourceSkill=name;
							logInfo.type='player';
						}
						else if(equips.contains(name)){
							logInfo.sourceSkill=name;
							logInfo.type='equip';
						}
						else{
							var bool=false;
							for(var i of players){
								var expand=[i];
								game.expandSkills(expand);
								if(expand.contains(name)){
									bool=true;
									logInfo.sourceSkill=i;
									logInfo.type='player';
									break;
								}
							}
							if(!bool){
								for(var i of players){
									var expand=[i];
									game.expandSkills(expand);
									if(expand.contains(name)){
										logInfo.sourceSkill=i;
										logInfo.type='equip';
										break;
									}
								}
							}
						}
					}
					event.sourceSkill=logInfo.sourceSkill;
					event.type=logInfo.type;
					player.getHistory('useSkill').push(logInfo);
					event.trigger('useSkill');
					"step 1"
					var info=get.info(event.skill);
					if(info&&info.contentBefore){
						var next=game.createEvent(event.skill+'ContentBefore');
						next.setContent(info.contentBefore);
						next.targets=targets;
						next.cards=cards;
						next.player=player;
						if(event.forceDie) next.forceDie=true;
						if(event.includeOut) next.includeOut=true;
					}
					"step 2"
					if(!event.skill){
						console.log('error: no skill',get.translation(event.player),event.player.getSkills());
						if(event._skill){
							event.skill=event._skill;
							console.log(event._skill);
						}
						else{
							event.finish();
							return;
						}
					}
					var info=get.info(event.skill);
					if(targets[num]&&targets[num].isDead()||
						targets[num]&&targets[num].isOut()||
						targets[num]&&targets[num].removed){
						if(!info.multitarget&&num<targets.length-1){
							event.num++;
							event.redo();
						}
						return;
					}
					var next=game.createEvent(event.skill);
					next.setContent(info.content);
					next.targets=targets;
					next.cards=cards;
					next.player=player;
					next.num=num;
					next.multitarget=info.multitarget;
					if(num==0&&next.targets.length>1){
						if(!info.multitarget){
							lib.tempSortSeat=player;
							targets.sort(lib.sort.seat);
							delete lib.tempSortSeat;
						}
						for(var i=0;i<targets.length;i++){
							targets[i].animate('target');
						}
					}
					next.target=targets[num];
					if(event.forceDie) next.forceDie=true;
					if(event.includeOut) next.includeOut=true;
					if(next.target&&!info.multitarget){
						if(num==0&&targets.length>1){
							// var ttt=next.target;
							// setTimeout(function(){ttt.animate('target');},0.5*lib.config.duration);
						}
						else{
							next.target.animate('target');
						}
					}
					if(num==0){
						if(typeof info.delay=='number') game.delay(info.delay);
						else if(info.delay!==false&&info.delay!==0){
							if(event.waitingForTransition){
								_status.waitingForTransition=event.waitingForTransition;
								game.pause();
							}
							else{
								game.delayx()
							}
						}
					}
					else game.delayx(0.5);
					if(!info.multitarget&&num<targets.length-1){
						event.num++;
						event.redo();
					}
					"step 3"
					var info=get.info(event.skill);
					if(info&&info.contentAfter){
						var next=game.createEvent(event.skill+'ContentAfter');
						next.setContent(info.contentAfter);
						next.targets=targets;
						next.cards=cards;
						next.player=player;
						if(event.forceDie) next.forceDie=true;
						if(event.includeOut) next.includeOut=true;
					}
					"step 4"
					if(player.getStat().allSkills>200){
						player._noSkill=true;
						console.log(player.name,event.skill);
					}
					if(document.getElementsByClassName('thrown').length){
						if(event.skill&&get.info(event.skill).delay!==false&&get.info(event.skill).delay!==0) game.delayx();
					}
					else{
						event.finish();
					}
					"step 5"
					ui.clear();
				},
				draw:function(){
					// if(lib.config.background_audio){
					// 	game.playAudio('effect','draw');
					// }
					// game.broadcast(function(){
					//     if(lib.config.background_audio){
					// 		game.playAudio('effect','draw');
					// 	}
					// });
					if(typeof event.minnum=='number'&&num<event.minnum){
						num=event.minnum;
					}
					if(event.drawDeck){
						if(event.drawDeck>num){
							event.drawDeck=num;
						}
						num-=event.drawDeck;
					}
					if(event.log!=false){
						if(num>0){
							if(event.bottom) game.log(player,'从牌堆底摸了'+get.cnNumber(num)+'张牌');
							else game.log(player,'摸了'+get.cnNumber(num)+'张牌');
						}
						if(event.drawDeck){
							game.log(player,'从牌库中获得了'+get.cnNumber(event.drawDeck)+'张牌');
						}
					}
					var cards;
					if(num>0){
						if(event.bottom) cards=get.bottomCards(num);
						else if(player.getTopCards) cards=player.getTopCards(num);
						else cards=get.cards(num);
					}
					else{
						cards=[];
					}
					if(event.drawDeck){
						cards=cards.concat(player.getDeckCards(event.drawDeck));
					}
					if(event.animate!=false){
						if(event.visible){
							var next=player.gain(cards,'gain2');
							if(event.bottom) game.log(player,'从牌堆底摸了'+get.cnNumber(num)+'张牌（',cards,'）');
							else game.log(player,'摸了'+get.cnNumber(num)+'张牌（',cards,'）');
						}
						else{
							var next=player.gain(cards,'draw');
						}
					}
					else{
						var next=player.gain(cards);
						if(event.$draw){
							player.$draw(cards.length);
						}
					}
					if(event.gaintag) next.gaintag.addArray(event.gaintag);
					event.result=cards;
				},
				discard:function(){
					"step 0"
					game.log(player,'弃置了',cards);
					event.done=player.lose(cards,event.position,'visible');
					event.done.type='discard';
					if(event.discarder) event.done.discarder=event.discarder;
					"step 1"
					event.trigger('discard');
				},
				loseToDiscardpile:function(){
					"step 0"
					if(event.log!=false) game.log(player,'将',cards,'置入了弃牌堆');
					var next=player.lose(cards,event.position);
					if(event.insert_index) next.insert_index=event.insert_index;
					if(event.insert_card) next.insert_card=true;
					if(!event.blank) next.visible=true;
					next.type='loseToDiscardpile';
					event.done=next;
					"step 1"
					event.trigger('loseToDiscardpile');
				},
				respond:function(){
					'step 0'
					var cardaudio=true;
					if(event.skill){
						if(lib.skill[event.skill].audio){
							cardaudio=false;
						}
						player.logSkill(event.skill);
						player.checkShow(event.skill,true);
						if(lib.skill[event.skill].onrespond&&!game.online){
							lib.skill[event.skill].onrespond(event,player);
						}
					}
					else if(!event.nopopup) player.tryCardAnimate(card,card.name,'wood');
					if(cardaudio&&event.getParent(3).name=='useCard') game.broadcastAll((player,card)=>{
						if(!lib.config.background_audio) return;
						const sex=player.sex=='female'?'female':'male',audio=lib.card[card.name].audio;
						if(typeof audio=='string'){
							const audioInfo=audio.split(':');
							if(audio.startsWith('db:')) game.playAudio(`${audioInfo[0]}:${audioInfo[1]}`,audioInfo[2],`${card.name}_${sex}.${audioInfo[3]||'mp3'}`);
							else if(audio.startsWith('ext:')) game.playAudio(`${audioInfo[0]}:${audioInfo[1]}`,`${card.name}_${sex}.${audioInfo[2]||'mp3'}`);
							else game.playAudio('card',sex,`${audioInfo[0]}.${audioInfo[1]||'mp3'}`);
						}
						else game.playAudio('card',sex,card.name);
					},player,card);
					if(event.skill){
						if(player.stat[player.stat.length-1].skill[event.skill]==undefined){
							player.stat[player.stat.length-1].skill[event.skill]=1;
						}
						else{
							player.stat[player.stat.length-1].skill[event.skill]++;
						}
						var sourceSkill=get.info(event.skill).sourceSkill;
						if(sourceSkill){
							if(player.stat[player.stat.length-1].skill[sourceSkill]==undefined){
								player.stat[player.stat.length-1].skill[sourceSkill]=1;
							}
							else{
								player.stat[player.stat.length-1].skill[sourceSkill]++;
							}
						}
					}
					if(cards.length&&(cards.length>1||cards[0].name!=card.name)){
						game.log(player,'打出了',card,'（',cards,'）');
					}
					else{
						game.log(player,'打出了',card);
					}
					player.actionHistory[player.actionHistory.length-1].respond.push(event);
					if(cards.length){
						var owner=(get.owner(cards[0])||player);
						var next=owner.lose(cards,'visible',ui.ordering).set('type','use');
						var directDiscard=[];
						for(var i=0;i<cards.length;i++){
							if(!next.cards.contains(cards[i])){
								directDiscard.push(cards[i]);
							}
						}
						if(directDiscard.length) game.cardsGotoOrdering(directDiscard);
					}
					if(event.animate!=false&&event.throw!==false){
						for(var i=0;i<cards.length;i++){
							player.$throw(cards[i]);
							if(event.highlight){
								cards[i].clone.classList.add('thrownhighlight');
								game.addVideo('highlightnode',player,get.cardInfo(cards[i]));
							}
						}
						if(event.highlight){
							game.broadcast(function(cards){
								for(var i=0;i<cards.length;i++){
									if(cards[i].clone){
										cards[i].clone.classList.add('thrownhighlight');
									}
								}
							},cards);
						}
					}
					event.trigger('respond');
					'step 1'
					game.delayx(0.5);
				},
				swapHandcards:function(){
					'step 0'
					event.cards1=event.cards1||player.getCards('h');
					event.cards2=event.cards2||target.getCards('h');
					game.loseAsync({
						player:player,
						target:target,
						cards1:event.cards1,
						cards2:event.cards2,
					}).setContent('swapHandcardsx');
					'step 1'
					game.loseAsync({
						gain_list:[
							[player,event.cards2.filterInD()],
							[target,event.cards1.filterInD()]
						],
					}).setContent('gaincardMultiple');
					'step 2'
					game.delayx();
				},
				swapHandcardsx:function(){
					'step 0'
					player.$giveAuto(event.cards1,target);
					target.$giveAuto(event.cards2,player);
					'step 1'
					event.cards=event.cards1;
					var next=player.lose(event.cards,ui.ordering);
					next.getlx=false;
					next.relatedEvent=event.getParent();
					if(player==game.me){
						event.delayed=true;
					}
					else{
						next.delay=false;
					}
					'step 2'
					event.cards=event.cards2;
					var next=target.lose(event.cards,ui.ordering);
					next.getlx=false;
					next.relatedEvent=event.getParent();
					if(target==game.me){
						event.delayed=true;
					}
					else{
						next.delay=false;
					}
					'step 3'
					if(!event.delayed) game.delay();
				},
				gainMultiple:function(){
					'step 0'
					event.delayed=false;
					event.num=0;
					event.cards=[];
					'step 1'
					player.gainPlayerCard(targets[num],event.position,true).set('boolline',false).set('delay',num==targets.length-1);
					'step 2'
					if(result.bool){
						event.cards.addArray(result.cards);
						if(num==targets.length-1) event.delayed=true;
					}
					event.num++;
					if(event.num<targets.length){
						event.goto(1);
					}
					'step 3'
					if(!event.delayed) game.delay();
				},
				gain:function(){
					"step 0"
					if(event.animate=='give') event.visible=true;
					if(cards){
						var map={};
						for(var i of cards){
							var owner=get.owner(i,'judge');
							if(owner&&(owner!=player||get.position(i)!='h')){
								var id=owner.playerid;
								if(!map[id]) map[id]=[[],[],[]];
								map[id][0].push(i);
								var position=get.position(i);
								if(position=='h') map[id][1].push(i);
								else map[id][2].push(i);
							}
							else if(!event.updatePile&&get.position(i)=='c') event.updatePile=true;
						}
						event.losing_map=map;
						for(var i in map){
							var owner=(_status.connectMode?lib.playerOL:game.playerMap)[i];
							var next=owner.lose(map[i][0],ui.special).set('type','gain').set('forceDie',true).set('getlx',false);
							if(event.visible==true) next.visible=true;
							event.relatedLose=next;
						}
					}
					else{
						event.finish();
					}
					"step 1"
					for(var i=0;i<cards.length;i++){
						if(cards[i].destroyed){
							if(player.hasSkill(cards[i].destroyed)){
								delete cards[i].destroyed;
							}
							else{
								cards.splice(i--,1);
							}
						}
						else if(event.losing_map){
							for(var id in event.losing_map){
								if(event.losing_map[id][0].contains(cards[i])){
									var source=(_status.connectMode?lib.playerOL:game.playerMap)[id];
									var hs=source.getCards('hejsx');
									if(hs.contains(cards[i])){
										cards.splice(i--,1);
									}
								}
							}
						}
					}
					if(cards.length==0){
						event.finish();
						return;
					}
					player.getHistory('gain').push(event);
					//if(event.source&&event.delay!==false) game.delayx();
					"step 2"
					if(player.getStat().gain==undefined){
						player.getStat().gain=cards.length;
					}
					else{
						player.getStat().gain+=cards.length;
					}
					"step 3"
					var sort;
					var frag1=document.createDocumentFragment();
					var frag2=document.createDocumentFragment();
					var hs=player.getCards('hs');
					for(var i=0;i<cards.length;i++){
						if(hs.contains(cards[i])){
							cards.splice(i--,1);
						}
					}
					for(var num=0;num<cards.length;num++){
						sort=lib.config.sort_card(cards[num]);
						if(lib.config.reverse_sort) sort=-sort;
						cards[num].fix();
						cards[num].style.transform='';
						cards[num].addGaintag(event.gaintag);
						if(_status.discarded){
							_status.discarded.remove(cards[num]);
						}
						// cards[num].vanishtag.length=0;
						for(var num2=0;num2<cards[num].vanishtag.length;num2++){
							if(cards[num].vanishtag[num2][0]!='_'){
								cards[num].vanishtag.splice(num2--,1);
							}
						}
						if(player==game.me){
							cards[num].classList.add('drawinghidden');
						}
						if(get.is.singleHandcard()||sort>1) frag1.appendChild(cards[num]);
						else frag2.appendChild(cards[num]);
					}
					var addv=function(){
						if(player==game.me){
							game.addVideo('gain12',player,[get.cardsInfo(frag1.childNodes),get.cardsInfo(frag2.childNodes),event.gaintag]);
						}
					};
					var broadcast=function(){
						game.broadcast(function(player,cards,num,gaintag){
							player.directgain(cards,null,gaintag);
							_status.cardPileNum=num;
						},player,cards,ui.cardPile.childNodes.length,event.gaintag);
					};
					if(event.animate=='draw'){
						player.$draw(cards.length);
						game.pause();
						setTimeout(function(){
							addv();
							player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
							player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
							player.update();
							if(player==game.me) ui.updatehl();
							broadcast();
							game.resume();
						},get.delayx(500,500));
					}
					else if(event.animate=='gain'){
						player.$gain(cards,event.log);
						game.pause();
						setTimeout(function(){
							addv();
							player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
							player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
							player.update();
							if(player==game.me) ui.updatehl();
							broadcast();
							game.resume();
						},get.delayx(700,700));
					}
					else if(event.animate=='gain2'||event.animate=='draw2'){
						var gain2t=300;
						if(player.$gain2(cards,event.log)&&player==game.me){
							gain2t=500;
						}
						game.pause();
						setTimeout(function(){
							addv();
							player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
							player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
							player.update();
							if(player==game.me) ui.updatehl();
							broadcast();
							game.resume();
						},get.delayx(gain2t,gain2t));
					}
					else if(event.animate=='give'||event.animate=='giveAuto'){
						var evtmap=event.losing_map;
						if(event.animate=='give'){
							for(var i in evtmap){
								var source=(_status.connectMode?lib.playerOL:game.playerMap)[i];
								source.$give(evtmap[i][0],player,event.log)
							}
						}
						else{
							for(var i in evtmap){
								var source=(_status.connectMode?lib.playerOL:game.playerMap)[i];
								if(evtmap[i][1].length) source.$giveAuto(evtmap[i][1],player,event.log);
								if(evtmap[i][2].length) source.$give(evtmap[i][2],player,event.log);
							}
						}
						game.pause();
						setTimeout(function(){
							addv();
							player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
							player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
							player.update();
							if(player==game.me) ui.updatehl();
							broadcast();
							game.resume();
						},get.delayx(500,500));
					}
					else if(typeof event.animate=='function'){
						var time=event.animate(event);
						game.pause();
						setTimeout(function(){
							addv();
							player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
							player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
							player.update();
							if(player==game.me) ui.updatehl();
							broadcast();
							game.resume();
						},get.delayx(time,time));
					}
					else{
						addv();
						player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
						player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
						player.update();
						if(player==game.me) ui.updatehl();
						broadcast();
						event.finish();
					}
					"step 4"
					game.delayx();
					if(event.updatePile) game.updateRoundNumber();
				},
				addToExpansion:function(){
					"step 0"
					if(event.animate=='give') event.visible=true;
					if(cards){
						var map={};
						for(var i of cards){
							var owner=get.owner(i,'judge');
							if(owner&&(owner!=player||get.position(i)!='x')){
								var id=owner.playerid;
								if(!map[id]) map[id]=[[],[],[]];
								map[id][0].push(i);
								var position=get.position(i);
								if(position=='h') map[id][1].push(i);
								else map[id][2].push(i);
							}
							else if(!event.updatePile&&get.position(i)=='c') event.updatePile=true;
						}
						event.losing_map=map;
						for(var i in map){
							var owner=(_status.connectMode?lib.playerOL:game.playerMap)[i];
							var next=owner.lose(map[i][0],ui.special).set('type','loseToExpansion').set('forceDie',true).set('getlx',false);
							if(event.visible==true) next.visible=true;
							event.relatedLose=next;
						}
					}
					else{
						event.finish();
					}
					"step 1"
					for(var i=0;i<cards.length;i++){
						if(cards[i].destroyed){
							if(player.hasSkill(cards[i].destroyed)){
								delete cards[i].destroyed;
							}
							else{
								cards.splice(i--,1);
							}
						}
						else if(event.losing_map){
							for(var id in event.losing_map){
								if(event.losing_map[id][0].contains(cards[i])){
									var source=(_status.connectMode?lib.playerOL:game.playerMap)[id];
									var hs=source.getCards('hejsx');
									if(hs.contains(cards[i])){
										cards.splice(i--,1);
									}
								}
							}
						}
					}
					if(cards.length==0){
						event.finish();
						return;
					}
					"step 2"
					var hs=player.getCards('x');
					for(var i=0;i<cards.length;i++){
						if(hs.contains(cards[i])){
							cards.splice(i--,1);
						}
					}
					for(var num=0;num<cards.length;num++){
						if(_status.discarded){
							_status.discarded.remove(cards[num]);
						}
						for(var num2=0;num2<cards[num].vanishtag.length;num2++){
							if(cards[num].vanishtag[num2][0]!='_'){
								cards[num].vanishtag.splice(num2--,1);
							}
						}
					}
					if(event.animate=='draw'){
						player.$draw(cards.length);
						if(event.log) game.log(player,'将',get.cnNumber(cards.length),'张牌置于了武将牌上');
						game.pause();
						setTimeout(function(){
							player.$addToExpansion(cards,null,event.gaintag);
							for(var i of event.gaintag) player.markSkill(i);
							game.resume();
						},get.delayx(500,500));
					}
					else if(event.animate=='gain'){
						player.$gain(cards,false);
						game.pause();
						setTimeout(function(){
							player.$addToExpansion(cards,null,event.gaintag);
							for(var i of event.gaintag) player.markSkill(i);
							game.resume();
						},get.delayx(700,700));
					}
					else if(event.animate=='gain2'||event.animate=='draw2'){
						var gain2t=300;
						if(player.$gain2(cards)&&player==game.me){
							gain2t=500;
						}
						game.pause();
						setTimeout(function(){
							player.$addToExpansion(cards,null,event.gaintag);
							for(var i of event.gaintag) player.markSkill(i);
							game.resume();
						},get.delayx(gain2t,gain2t));
					}
					else if(event.animate=='give'||event.animate=='giveAuto'){
						var evtmap=event.losing_map;
						if(event.animate=='give'){
							for(var i in evtmap){
								var source=(_status.connectMode?lib.playerOL:game.playerMap)[i];
								source.$give(evtmap[i][0],player,false);
								if(event.log) game.log(player,'将',evtmap[i][0],'置于了武将牌上');
							}
						}
						else{
							for(var i in evtmap){
								var source=(_status.connectMode?lib.playerOL:game.playerMap)[i];
								if(evtmap[i][1].length){
									source.$giveAuto(evtmap[i][1],player,false);
									if(event.log) game.log(player,'将',get.cnNumber(evtmap[i][1].length),'张牌置于了武将牌上');
								}
								if(evtmap[i][2].length){
									source.$give(evtmap[i][2],player,false);
									if(event.log) game.log(player,'将',evtmap[i][2],'置于了武将牌上');
								}
							}
						}
						game.pause();
						setTimeout(function(){
							player.$addToExpansion(cards,null,event.gaintag);
							for(var i of event.gaintag) player.markSkill(i);
							game.resume();
						},get.delayx(500,500));
					}
					else if(typeof event.animate=='function'){
						var time=event.animate(event);
						game.pause();
						setTimeout(function(){
							player.$addToExpansion(cards,null,event.gaintag);
							for(var i of event.gaintag) player.markSkill(i);
							game.resume();
						},get.delayx(time,time));
					}
					else{
						player.$addToExpansion(cards,null,event.gaintag);
						for(var i of event.gaintag) player.markSkill(i);
						event.finish();
					}
					"step 4"
					game.delayx();
					if(event.updatePile) game.updateRoundNumber();
				},
				lose:function(){
					"step 0"
					var evt=event.getParent();
					if((evt.name!='discard'||event.type!='discard')&&(evt.name!='loseToDiscardpile'||event.type!='loseToDiscardpile')){
						event.delay=false;
						return;
					}
					if(evt.delay===false) event.delay=false;
					if(evt.animate!=false){
						evt.discardid=lib.status.videoId++;
						game.broadcastAll(function(player,cards,id,visible){
							player.$throw(cards,null,'nobroadcast');
							var cardnodes=[];
							cardnodes._discardtime=get.time();
							for(var i=0;i<cards.length;i++){
								if(cards[i].clone){
									cardnodes.push(cards[i].clone);
									if(!visible){
										cards[i].clone.classList.add('infohidden');
										cards[i].clone.classList.add('infoflip');
									}
								}
							}
							ui.todiscard[id]=cardnodes;
						},player,cards,evt.discardid,event.visible);
						if(lib.config.sync_speed&&cards[0]&&cards[0].clone){
							if(evt.delay!=false){
								var waitingForTransition=get.time();
								evt.waitingForTransition=waitingForTransition;
								cards[0].clone.listenTransition(function(){
									if(_status.waitingForTransition==waitingForTransition&&_status.paused){
										game.resume();
									}
									delete evt.waitingForTransition;
								});
							}
							else if(evt.getParent().discardTransition){
								delete evt.getParent().discardTransition;
								var waitingForTransition=get.time();
								evt.getParent().waitingForTransition=waitingForTransition;
								cards[0].clone.listenTransition(function(){
									if(_status.waitingForTransition==waitingForTransition&&_status.paused){
										game.resume();
									}
									delete evt.getParent().waitingForTransition;
								});
							}
						}
					}
					"step 1"
					event.gaintag_map={};
					var hs=[],es=[],js=[],ss=[],xs=[];
					var unmarks=[];
					if(event.insert_card&&event.position==ui.cardPile) event.cards.reverse();
					var hej=player.getCards('hejsx');
					event.stockcards=cards.slice(0);
					for(var i=0;i<cards.length;i++){
						if(!hej.contains(cards[i])){
							cards.splice(i--,1);
							continue;
						}
						else if(cards[i].parentNode){
							if(cards[i].parentNode.classList.contains('equips')){
								cards[i].original='e';
								es.push(cards[i]);
							}
							else if(cards[i].parentNode.classList.contains('judges')){
								cards[i].original='j';
								js.push(cards[i]);
							}
							else if(cards[i].parentNode.classList.contains('expansions')){
								cards[i].original='x';
								xs.push(cards[i]);
								if(cards[i].gaintag&&cards[i].gaintag.length) unmarks.addArray(cards[i].gaintag);
							}
							else if(cards[i].parentNode.classList.contains('handcards')){
								if(cards[i].classList.contains('glows')){
									cards[i].original='s';
									ss.push(cards[i]);
								}
								else{
									cards[i].original='h';
									hs.push(cards[i]);
								}
							}
							else{
								cards[i].original=null;
							}
						}
						if(cards[i].gaintag&&cards[i].gaintag.length){
							event.gaintag_map[cards[i].cardid]=cards[i].gaintag.slice(0);
							cards[i].removeGaintag(true);
						}
						
						cards[i].style.transform+=' scale(0.2)';
						cards[i].classList.remove('glow');
						cards[i].classList.remove('glows');
						cards[i].recheck();
						
						var info=lib.card[cards[i].name];
						if(info.destroy||cards[i]._destroy){
							cards[i].delete();
							cards[i].destroyed=info.destroy||cards[i]._destroy;
						}
						else if(event.position){
							if(_status.discarded){
								if(event.position==ui.discardPile){
									_status.discarded.add(cards[i]);
								}
								else{
									_status.discarded.remove(cards[i]);
								}
							}
							if(event.insert_index){
								cards[i].fix();
								event.position.insertBefore(cards[i],event.insert_index(event,cards[i]));
							}
							else if(event.insert_card){
								cards[i].fix();
								event.position.insertBefore(cards[i],event.position.firstChild);
							}
							else if(event.position==ui.cardPile){
								cards[i].fix();
								event.position.appendChild(cards[i]);
							}
							else cards[i].goto(event.position);
						}
						else{
							cards[i].remove();
						}
						//if(ss.contains(cards[i])) cards.splice(i--,1);
					}
					if(player==game.me) ui.updatehl();
					ui.updatej(player);
					game.broadcast(function(player,cards,num){
						for(var i=0;i<cards.length;i++){
							cards[i].classList.remove('glow');
							cards[i].classList.remove('glows');
							cards[i].fix();
							cards[i].remove();
						}
						if(player==game.me){
							ui.updatehl();
						}
						ui.updatej(player);
						_status.cardPileNum=num;
					},player,cards,ui.cardPile.childNodes.length);
					game.addVideo('lose',player,[get.cardsInfo(hs),get.cardsInfo(es),get.cardsInfo(js),get.cardsInfo(ss)]);
					event.cards2=hs.concat(es);
					player.getHistory('lose').push(event);
					game.getGlobalHistory().cardMove.push(event);
					player.update();
					game.addVideo('loseAfter',player);
					event.num=0;
					if(event.position==ui.ordering){
						var evt=event.relatedEvent||event.getParent();
						if(!evt.orderingCards)	evt.orderingCards=[];
						if(!evt.noOrdering&&!evt.cardsOrdered){
							evt.cardsOrdered=true;
							var next=game.createEvent('orderingDiscard',false,evt.getParent());
							next.relatedEvent=evt;
							next.setContent('orderingDiscard');
						}
						if(!evt.noOrdering){
							evt.orderingCards.addArray(cards);
						}
					}
					else if(event.position==ui.cardPile){
						game.updateRoundNumber();
					}
					if(unmarks.length){
						for(var i of unmarks){
							player[(lib.skill[i]&&lib.skill[i].mark||player.hasCard((card)=>card.hasGaintag(i),'x'))?'markSkill':'unmarkSkill'](i);
						}
					}
					event.hs=hs;
					event.es=es;
					event.js=js;
					event.ss=ss;
					event.xs=xs;
					"step 2"
					if(num<cards.length){
						if(event.es.contains(cards[num])){
							event.loseEquip=true;
							player.removeEquipTrigger(cards[num]);
							var info=get.info(cards[num]);
							if(info.onLose&&(!info.filterLose||info.filterLose(cards[num],player))){
								event.goto(3);
								return;
							}
						}
						event.num++;
						event.redo();
					}
					else{
						if(event.loseEquip){
							player.addEquipTrigger();
						}
						event.goto(4);
					}
					"step 3"
					var info=get.info(cards[num]);
					if(info.loseDelay!=false&&(player.isAlive()||info.forceDie)){
						player.popup(cards[num].name);
						game.delayx();
					}
					if(Array.isArray(info.onLose)){
						for(var i=0;i<info.onLose.length;i++){
							var next=game.createEvent('lose_'+cards[num].name);
							next.setContent(info.onLose[i]);
							if(info.forceDie) next.forceDie=true;
							next.player=player;
							next.card=cards[num];
						}
					}
					else{
						var next=game.createEvent('lose_'+cards[num].name);
						next.setContent(info.onLose);
						next.player=player;
						if(info.forceDie) next.forceDie=true;
						next.card=cards[num];
					}
					event.num++;
					event.goto(2);
					"step 4"
					if(event.toRenku){
						_status.renku.addArray(cards.filter(function(card){
							return !card.destroyed;
						}));
						if(_status.renku.length>6){
							var cards=_status.renku.splice(0,_status.renku.length-6);
							game.log(cards,'从仁库进入了弃牌堆');
							game.cardsDiscard(cards).set('outRange',true).fromRenku=true;
						}
						game.updateRenku();
					}
					"step 5"
					var evt=event.getParent();
					if((evt.name!='discard'&&event.type!='discard')&&(evt.name!='loseToDiscardpile'&&event.type!='loseToDiscardpile')) return;
					if(event.animate===false||event.delay===false) return;
					if(evt.delay!=false){
						if(evt.waitingForTransition){
							_status.waitingForTransition=evt.waitingForTransition;
							game.pause();
						}
						else{
							game.delayx();
						}
					}
				},
				damage:function(){
					"step 0"
					event.forceDie=true;
					if(event.unreal) event.goto(4)
					event.trigger('damageBegin1');
					"step 1"
					event.trigger('damageBegin2');
					"step 2"
					event.trigger('damageBegin3');
					"step 3"
					event.trigger('damageBegin4');
					"step 4"
					//moved changeHujia to changeHp
					if(['fire','thunder','ice'].contains(event.nature)){
						if(player.hujia>0&&!player.hasSkillTag('nohujia')&&event.nature!='ice'){
							game.broadcastAll(function(num){
								if(lib.config.background_audio) game.playAudio('effect','hujia_damage_'+event.nature+(num>1?'2':''));
							},num);
						}
						else{
							game.broadcastAll(function(num){
								if(lib.config.background_audio) game.playAudio('effect','damage_'+event.nature+(num>1?'2':''));
							},num);
						}
					}
					else{
						if(player.hujia>0&&!player.hasSkillTag('nohujia')){
							game.broadcastAll(function(num){
								if(lib.config.background_audio) game.playAudio('effect','hujia_damage'+(num>1?'2':''));
							},num);
						}
						else{
							game.broadcastAll(function(num){
								if(lib.config.background_audio) game.playAudio('effect','damage'+(num>1?'2':''));
							},num);
						}
					}
					var str=event.unreal?'视为受到了':'受到了';
					if(source) str+='来自<span class="bluetext">'+(source==player?'自己':get.translation(source))+'</span>的';
					str+=get.cnNumber(num)+'点';
					if(event.nature) str+=get.translation(event.nature)+'属性';
					str+='伤害';
					game.log(player,str);
					if(player.stat[player.stat.length-1].damaged==undefined){
						player.stat[player.stat.length-1].damaged=num;
					}
					else{
						player.stat[player.stat.length-1].damaged+=num;
					}
					if(source){
						source.getHistory('sourceDamage').push(event);
						if(source.stat[source.stat.length-1].damage==undefined){
							source.stat[source.stat.length-1].damage=num;
						}
						else{
							source.stat[source.stat.length-1].damage+=num;
						}
					}
					player.getHistory('damage').push(event);
					if(!event.unreal){
						if(event.notrigger){
							player.changeHp(-num,false)._triggered=null;
						}
						else{
							player.changeHp(-num,false);
						}
					}
					if(event.animate!==false){
						player.$damage(source);
						var natures=(event.nature||'').split(lib.natureSeparator);
						game.broadcastAll(function(natures,player){
							if(lib.config.animation&&!lib.config.low_performance){
								if(natures.includes('fire')){
									player.$fire();
								}
								if(natures.includes('thunder')){
									player.$thunder();
								}
							}
						},natures,player);
						var numx=Math.max(0,num-player.hujia);
						player.$damagepop(-numx,natures[0]);
					}
					if(event.unreal) event.goto(6)
					if(!event.notrigger){
						if(num==0){
							event.trigger('damageZero');
							event._triggered=null;
						}
						else{
							event.trigger('damage');
						}
					}
					"step 5"
					if(player.hp<=0&&player.isAlive()&&!event.nodying){
						game.delayx();
						event._dyinged=true;
						player.dying(event);
					}
					if(source&&lib.config.border_style=='auto'){
						var dnum=0;
						for(var j=0;j<source.stat.length;j++){
							if(source.stat[j].damage!=undefined) dnum+=source.stat[j].damage;
						}
						if(dnum>=2){
							if(lib.config.autoborder_start=='silver'){
								dnum+=4;
							}
							else if(lib.config.autoborder_start=='gold'){
								dnum+=8;
							}
						}
						if(lib.config.autoborder_count=='damage'){
							source.node.framebg.dataset.decoration='';
							if(dnum>=10){
								source.node.framebg.dataset.auto='gold';
								if(dnum>=12) source.node.framebg.dataset.decoration='gold';
							}
							else if(dnum>=6){
								source.node.framebg.dataset.auto='silver';
								if(dnum>=8) source.node.framebg.dataset.decoration='silver';
							}
							else if(dnum>=2){
								source.node.framebg.dataset.auto='bronze';
								if(dnum>=4) source.node.framebg.dataset.decoration='bronze';
							}
							if(dnum>=2){
								source.classList.add('topcount');
							}
						}
						else if(lib.config.autoborder_count=='mix'){
							source.node.framebg.dataset.decoration='';
							switch(source.node.framebg.dataset.auto){
								case 'bronze':if(dnum>=4) source.node.framebg.dataset.decoration='bronze';break;
								case 'silver':if(dnum>=8) source.node.framebg.dataset.decoration='silver';break;
								case 'gold':if(dnum>=12) source.node.framebg.dataset.decoration='gold';break;
							}
						}
					}
					"step 6"
					if(!event.notrigger) event.trigger('damageSource');
				},
				recover:function(){
					if(lib.config.background_audio){
						game.playAudio('effect','recover');
					}
					game.broadcast(function(){
						if(lib.config.background_audio){
							game.playAudio('effect','recover');
						}
					});
					if(num>player.maxHp-player.hp){
						num=player.maxHp-player.hp;
						event.num=num;
					}
					if(num>0){
						player.changeHp(num,false);
						game.broadcastAll(function(player){
							if(lib.config.animation&&!lib.config.low_performance){
								player.$recover();
							}
						},player);
						player.$damagepop(num,'wood');
						game.log(player,'回复了'+get.cnNumber(num)+'点体力')
					}
				},
				loseHp:function(){
					"step 0"
					if(lib.config.background_audio){
						game.playAudio('effect','loseHp');
					}
					game.broadcast(function(){
						if(lib.config.background_audio){
							game.playAudio('effect','loseHp');
						}
					});
					game.log(player,'失去了'+get.cnNumber(num)+'点体力')
					player.changeHp(-num);
					"step 1"
					if(player.hp<=0&&!event.nodying){
						game.delayx();
						event._dyinged=true;
						player.dying(event);
					}
				},
				doubleDraw:function(){
					"step 0"
					player.chooseBool('你的主副将体力上限之和是奇数，是否摸一张牌？');
					"step 1"
					if(result.bool){
						player.draw();
					}
				},
				loseMaxHp:function(){
					"step 0"
					game.log(player,'减少了'+get.cnNumber(num)+'点体力上限');
					player.maxHp-=num;
					event.loseHp=Math.max(0,player.hp-player.maxHp);
					player.update();
					"step 1"
					if(player.maxHp<=0){
						player.die(event);
					}
				},
				gainMaxHp:function(){
					"step 0"
					game.log(player,'增加了'+get.cnNumber(num)+'点体力上限');
					player.maxHp+=num;
					player.update();
				},
				changeHp:function(){
					//add to GlobalHistory
					game.getGlobalHistory().changeHp.push(event);
					//changeHujia moved here
					if(num<0&&player.hujia>0&&event.getParent().name=='damage'&&!player.hasSkillTag('nohujia')){
						event.hujia=Math.min(-num,player.hujia);
						event.getParent().hujia=event.hujia;
						event.num+=event.hujia;
						game.log(player,'的护甲抵挡了'+get.cnNumber(event.hujia)+'点伤害');
						player.changeHujia(-event.hujia).type='damage';
					}
					//old part
					num=event.num;
					player.hp+=num;
					if(isNaN(player.hp)) player.hp=0;
					if(player.hp>player.maxHp) player.hp=player.maxHp;
					player.update();
					if(event.popup!==false){
						player.$damagepop(num,'water');
					}
					if(_status.dying.contains(player)&&player.hp>0){
						_status.dying.remove(player);
						game.broadcast(function(list){
							_status.dying=list;
						},_status.dying);
						var evt=event.getParent('_save');
						if(evt&&evt.finish) evt.finish();
						evt=event.getParent('dying');
						if(evt&&evt.finish) evt.finish()
					}
					event.trigger('changeHp');
				},
				changeHujia:function(){
					player.hujia+=num;
					if(num>0){
						game.log(player,'获得了'+get.cnNumber(num)+'点护甲');
					}
					if(player.hujia<0){
						player.hujia=0;
					}
					player.update();
				},
				dying:function(){
					"step 0"
					event.forceDie=true;
					if(player.isDying()||player.hp>0){
						event.finish();
						return;
					}
					_status.dying.unshift(player);
					game.broadcast(function(list){
						_status.dying=list;
					},_status.dying);
					event.trigger('dying');
					game.log(player,'濒死');
					"step 1"
					delete event.filterStop;
					if(player.hp>0||event.nodying){
						_status.dying.remove(player);
						game.broadcast(function(list){
							_status.dying=list;
						},_status.dying);
						event.finish();
					}
					else if(!event.skipTao){
						var next=game.createEvent('_save');
						var start=false;
						var starts=[_status.currentPhase,event.source,event.player,game.me,game.players[0]];
						for(var i=0;i<starts.length;i++){
							if(get.itemtype(starts[i])=='player'){
								start=starts[i];break;
							}
						}
						next.player=start;
						next._trigger=event;
						next.triggername='_save';
						next.forceDie=true;
						next.setContent(lib.skill._save.content);
					}
					"step 2"
					_status.dying.remove(player);
					game.broadcast(function(list){
						_status.dying=list;
					},_status.dying);
					if(player.hp<=0&&!event.nodying&&!player.nodying) player.die(event.reason);
				},
				die:function(){
					"step 0"
					event.forceDie=true;
					if(_status.roundStart==player){
						_status.roundStart=player.next||player.getNext()||game.players[0];
					}
					if(ui.land&&ui.land.player==player){
						game.addVideo('destroyLand');
						ui.land.destroy();
					}
					var unseen=false;
					if(player.classList.contains('unseen')){
						player.classList.remove('unseen');
						unseen=true;
					}
					var logvid=game.logv(player,'die',source);
					event.logvid=logvid;
					if(unseen){
						player.classList.add('unseen');
					}
					if(source){
						game.log(player,'被',source,'杀害');
						if(source.stat[source.stat.length-1].kill==undefined){
							source.stat[source.stat.length-1].kill=1;
						}
						else{
							source.stat[source.stat.length-1].kill++;
						}
					}
					else{
						game.log(player,'阵亡')
					}
					
					
					// player.removeEquipTrigger();
					
					// for(var i in lib.skill.globalmap){
					//     if(lib.skill.globalmap[i].contains(player)){
					//      			lib.skill.globalmap[i].remove(player);
					//      			if(lib.skill.globalmap[i].length==0&&!lib.skill[i].globalFixed){
					//      						 game.removeGlobalSkill(i);
					//      			}
					//     }
					// }
					game.broadcastAll(function(player){
						player.classList.add('dead');
						player.removeLink();
						player.classList.remove('turnedover');
						player.classList.remove('out');
						player.node.count.innerHTML='0';
						player.node.hp.hide();
						player.node.equips.hide();
						player.node.count.hide();
						player.previous.next=player.next;
						player.next.previous=player.previous;
						game.players.remove(player);
						game.dead.push(player);
						_status.dying.remove(player);

						if(lib.config.background_speak){
							if(lib.character[player.name]&&lib.character[player.name][4].some(tag=>/^die:.+$/.test(tag))){
								var tag=lib.character[player.name][4].find(tag=>/^die:.+$/.test(tag));
								var reg=new RegExp("^ext:(.+)?/");
								var match=tag.match(/^die:(.+)$/);
								if(match){
									var path=match[1];
									if(reg.test(path)) path=path.replace(reg,(_o,p)=>`../extension/${p}/`);
									game.playAudio(path);
								}
							}
							else if(lib.character[player.name]&&lib.character[player.name][4].contains('die_audio')){
								game.playAudio('die',player.name);
							}
							else{
								game.playAudio('die',player.name,function(){
									game.playAudio('die',player.name.slice(player.name.indexOf('_')+1));
								});
							}
						}
					},player);

					game.addVideo('diex',player);
					if(event.animate!==false){
						player.$die(source);
					}
					if(player.hp!=0){
						player.changeHp(0-player.hp,false).forceDie=true;
					}
					"step 1"
					if(player.dieAfter) player.dieAfter(source);
					"step 2"
					event.trigger('die');
					"step 3"
					if(player.isDead()){
						if(!game.reserveDead){
							for(var mark in player.marks){
								player.unmarkSkill(mark);
							}
							while(player.node.marks.childNodes.length>1){
								player.node.marks.lastChild.remove();
							}
							game.broadcast(function(player){
								while(player.node.marks.childNodes.length>1){
									player.node.marks.lastChild.remove();
								}
							},player);
						}
						for(var i in player.tempSkills){
							player.removeSkill(i);
						}
						var skills=player.getSkills();
						for(var i=0;i<skills.length;i++){
							if(lib.skill[skills[i]].temp){
								player.removeSkill(skills[i]);
							}
						}
						if(_status.characterlist){
							if(lib.character[player.name]&&!player.name.startsWith('gz_shibing')&&!player.name.startsWith('gz_jun_')) _status.characterlist.add(player.name);
							if(lib.character[player.name1]&&!player.name1.startsWith('gz_shibing')&&!player.name1.startsWith('gz_jun_')) _status.characterlist.add(player.name1);
							if(lib.character[player.name2]&&!player.name2.startsWith('gz_shibing')&&!player.name2.startsWith('gz_jun_')) _status.characterlist.add(player.name2);
						}
						event.cards=player.getCards('hejsx');
						if(event.cards.length){
							player.discard(event.cards).forceDie=true;
							//player.$throw(event.cards,1000);
						}
					}
					"step 4"
					if(player.dieAfter2) player.dieAfter2(source);
					"step 5"
					game.broadcastAll(function(player){
						if(game.online&&player==game.me&&!_status.over&&!game.controlOver&&!ui.exit){
							if(lib.mode[lib.configOL.mode].config.dierestart){
								ui.create.exit();
							}
						}
					},player);
					if(!_status.connectMode&&player==game.me&&!_status.over&&!game.controlOver){
						ui.control.show();
						if(get.config('revive')&&lib.mode[lib.config.mode].config.revive&&!ui.revive){
							ui.revive=ui.create.control('revive',ui.click.dierevive);
						}
						if(get.config('continue_game')&&!ui.continue_game&&lib.mode[lib.config.mode].config.continue_game&&!_status.brawl&&!game.no_continue_game){
							ui.continue_game=ui.create.control('再战',game.reloadCurrent);
						}
						if(get.config('dierestart')&&lib.mode[lib.config.mode].config.dierestart&&!ui.restart){
							ui.restart=ui.create.control('restart',game.reload);
						}
					}

					if(!_status.connectMode&&player==game.me&&!game.modeSwapPlayer){
						// _status.auto=false;
						if(ui.auto){
							// ui.auto.classList.remove('glow');
							ui.auto.hide();
						}
						if(ui.wuxie) ui.wuxie.hide();
					}
					
					if(typeof _status.coin=='number'&&source&&!_status.auto){
						if(source==game.me||source.isUnderControl()){
							_status.coin+=10;
						}
					}
					if(source&&lib.config.border_style=='auto'&&(lib.config.autoborder_count=='kill'||lib.config.autoborder_count=='mix')){
						switch(source.node.framebg.dataset.auto){
							case 'gold':case 'silver':source.node.framebg.dataset.auto='gold';break;
							case 'bronze':source.node.framebg.dataset.auto='silver';break;
							default:source.node.framebg.dataset.auto=lib.config.autoborder_start||'bronze';
						}
						if(lib.config.autoborder_count=='kill'){
							source.node.framebg.dataset.decoration=source.node.framebg.dataset.auto;
						}
						else{
							var dnum=0;
							for(var j=0;j<source.stat.length;j++){
								if(source.stat[j].damage!=undefined) dnum+=source.stat[j].damage;
							}
							source.node.framebg.dataset.decoration='';
							switch(source.node.framebg.dataset.auto){
								case 'bronze':if(dnum>=4) source.node.framebg.dataset.decoration='bronze';break;
								case 'silver':if(dnum>=8) source.node.framebg.dataset.decoration='silver';break;
								case 'gold':if(dnum>=12) source.node.framebg.dataset.decoration='gold';break;
							}
						}
						source.classList.add('topcount');
					}
				},
				addJudge:function(){
					"step 0"
					if(cards){
						var owner=get.owner(cards[0]);
						if(owner){
							event.relatedLose=owner.lose(cards,'visible',ui.special).set('getlx',false);
						}
						else if(get.position(cards[0])=='c') event.updatePile=true;
					}
					"step 1"
					if(cards[0].destroyed){
						if(player.hasSkill(cards[0].destroyed)){
							delete cards[0].destroyed;
						}
						else{
							event.finish();
							return;
						}
					}
					else if(event.relatedLose){
						var owner=event.relatedLose.player;
						if(owner.getCards('hejsx').contains(card)){
							event.finish();
							return;
						}
					}
					cards[0].fix();
					cards[0].style.transform='';
					cards[0].classList.remove('drawinghidden');
					delete cards[0]._transform;
					var viewAs=typeof card=='string'?card:card.name;
					if(!lib.card[viewAs]||!lib.card[viewAs].effect){
						game.cardsDiscard(cards[0]);
					}
					else{
						cards[0].style.transform='';
						cards[0].classList.add('drawinghidden');
						player.node.judges.insertBefore(cards[0],player.node.judges.firstChild);
						if(_status.discarded){
							_status.discarded.remove(cards[0]);
						}
						ui.updatej(player);
						game.broadcast(function(player,card,viewAs){
							card.fix();
							card.style.transform='';
							card.classList.add('drawinghidden');
							card.viewAs=viewAs;
							if(viewAs&&viewAs!=card.name&&(card.classList.contains('fullskin')||card.classList.contains('fullborder'))){
								card.classList.add('fakejudge');
								card.node.background.innerHTML=lib.translate[viewAs+'_bg']||get.translation(viewAs)[0]
							}
							else{
								card.classList.remove('fakejudge');
							}
							player.node.judges.insertBefore(card,player.node.judges.firstChild);
							ui.updatej(player);
							if(card.clone&&(card.clone.parentNode==player.parentNode||card.clone.parentNode==ui.arena)){
								card.clone.moveDelete(player);
								game.addVideo('gain2',player,get.cardsInfo([card]));
							}
						},player,cards[0],viewAs);
						if(cards[0].clone&&(cards[0].clone.parentNode==player.parentNode||cards[0].clone.parentNode==ui.arena)){
							cards[0].clone.moveDelete(player);
							game.addVideo('gain2',player,get.cardsInfo(cards));
						}
						// player.$gain2(cards);
						if(get.itemtype(card)!='card'){
							if(typeof card=='string') cards[0].viewAs=card;
							else cards[0].viewAs=card.name;
						}
						else{
							delete cards[0].viewAs;
						}
						if(cards[0].viewAs&&cards[0].viewAs!=cards[0].name){
							if(cards[0].classList.contains('fullskin')||cards[0].classList.contains('fullborder')){
								cards[0].classList.add('fakejudge');
								cards[0].node.background.innerHTML=lib.translate[cards[0].viewAs+'_bg']||get.translation(cards[0].viewAs)[0];
							}
							game.log(player,'被贴上了<span class="yellowtext">'+get.translation(cards[0].viewAs)+'</span>（',cards,'）');
						}
						else{
							cards[0].classList.remove('fakejudge');
							game.log(player,'被贴上了',cards);
						}
						game.addVideo('addJudge',player,[get.cardInfo(cards[0]),cards[0].viewAs]);
					}
					if(event.updatePile) game.updateRoundNumber();
				},
				judge:function(){
					"step 0"
					var judgestr=get.translation(player)+'的'+event.judgestr+'判定';
					event.videoId=lib.status.videoId++;
					var cardj=event.directresult;
					if(!cardj){
						if(player.getTopCards) cardj=player.getTopCards()[0];
						else cardj=get.cards()[0];
					}
					var owner=get.owner(cardj);
					if(owner){
						owner.lose(cardj,'visible',ui.ordering);
					}
					else{
						var nextj=game.cardsGotoOrdering(cardj);
						if(event.position!=ui.discardPile) nextj.noOrdering=true;
					}
					player.judging.unshift(cardj);
					game.addVideo('judge1',player,[get.cardInfo(player.judging[0]),judgestr,event.videoId]);
					game.broadcastAll(function(player,card,str,id,cardid){
						var event;
						if(game.online){
							event={};
						}
						else{
							event=_status.event;
						}
						if(game.chess){
							event.node=card.copy('thrown','center',ui.arena).animate('start');
						}
						else{
							event.node=player.$throwordered(card.copy(),true);
						}
						if(lib.cardOL) lib.cardOL[cardid]=event.node;
						event.node.cardid=cardid;
						event.node.classList.add('thrownhighlight');
						ui.arena.classList.add('thrownhighlight');
						event.dialog=ui.create.dialog(str);
						event.dialog.classList.add('center');
						event.dialog.videoId=id;
					},player,player.judging[0],judgestr,event.videoId,get.id());

					game.log(player,'进行'+event.judgestr+'判定，亮出的判定牌为',player.judging[0]);
					game.delay(2);
					if(!event.noJudgeTrigger) event.trigger('judge');
					"step 1"
					event.result={
						card:player.judging[0],
						name:player.judging[0].name,
						number:get.number(player.judging[0]),
						suit:get.suit(player.judging[0]),
						color:get.color(player.judging[0]),
						node:event.node,
					};
					if(event.fixedResult){
						for(var i in event.fixedResult){
							event.result[i]=event.fixedResult[i];
						}
					}
					event.result.judge=event.judge(event.result);
					if(event.result.judge>0) event.result.bool=true;
					else if(event.result.judge<0) event.result.bool=false;
					else event.result.bool=null;
					player.judging.shift();
					game.checkMod(player,event.result,'judge',player);
					if(event.judge2){
						var judge2=event.judge2(event.result);
						if(typeof judge2=='boolean') player.tryJudgeAnimate(judge2);
					};
					if(event.clearArena!=false){
						game.broadcastAll(ui.clear);
					}
					game.broadcast(function(id){
						var dialog=get.idDialog(id);
						if(dialog){
							dialog.close();
						}
						ui.arena.classList.remove('thrownhighlight');
					},event.videoId);
					event.dialog.close();
					game.addVideo('judge2',null,event.videoId);
					ui.arena.classList.remove('thrownhighlight');
					game.log(player,'的判定结果为',event.result.card);
					event.trigger('judgeFixing');
					if(event.callback){
						var next=game.createEvent('judgeCallback',false);
						next.player=player;
						next.card=event.result.card;
						next.judgeResult=get.copy(event.result);
						next.setContent(event.callback);
					}
					else{
						if(!get.owner(event.result.card)){
							if(event.position!=ui.discardPile) event.position.appendChild(event.result.card);
						}
					}
				},
				turnOver:function(){
					game.log(player,'翻面');
					player.classList.toggle('turnedover');
					game.broadcast(function(player){
						player.classList.toggle('turnedover');
					},player);
					game.addVideo('turnOver',player,player.classList.contains('turnedover'));
				},
				link:function(){
					if(player.isLinked()){
						game.log(player,'解除连环');
					}
					else{
						game.log(player,'被连环');
					}
					if(lib.config.background_audio){
						game.playAudio('effect','link');
					}
					game.broadcast(function(){
						if(lib.config.background_audio){
							game.playAudio('effect','link');
						}
					});
					player.classList.remove('target');
					if(get.is.linked2(player)){
						player.classList.toggle('linked2');
					}
					else{
						player.classList.toggle('linked');
					}
					ui.updatej(player);
					ui.updatem(player);
					game.broadcast(function(player,linked){
						player.classList.remove('target');
						if(get.is.linked2(player)){
							if(linked){
								player.classList.add('linked2');
							}
							else{
								player.classList.remove('linked2');
							}
						}
						else{
							if(linked){
								player.classList.add('linked');
							}
							else{
								player.classList.remove('linked');
							}
						}
						ui.updatej(player);
						ui.updatem(player);
					},player,player.isLinked());
					game.addVideo('link',player,player.isLinked());
				},
				chooseToGuanxing:function(){
					"step 0"
					var cards=get.cards(num);
					game.cardsGotoOrdering(cards);
					var next=player.chooseToMove();
					next.set('list',[
						['牌堆顶',cards],
						['牌堆底'],
					]);
					next.set('prompt','点击将牌移动到牌堆顶或牌堆底');
					next.processAI=event.processAI||function(list){
						var cards=list[0][1],player=_status.event.player;
						var top=[];
						var bottom;
						cards.sort(function(a,b){
							return get.value(b,player)-get.value(a,player);
						});
						while(cards.length){
							if(get.value(cards[0],player)<=5) break;
							top.unshift(cards.shift());
						}
						bottom=cards;
						return [top,bottom];
					};
					"step 1"
					var top=result.moved[0];
					var bottom=result.moved[1];
					top.reverse();
					for(var i=0;i<top.length;i++){
						ui.cardPile.insertBefore(top[i],ui.cardPile.firstChild);
					}
					for(i=0;i<bottom.length;i++){
						ui.cardPile.appendChild(bottom[i]);
					}
					player.popup(get.cnNumber(top.length)+'上'+get.cnNumber(bottom.length)+'下');
					game.log(player,'将'+get.cnNumber(top.length)+'张牌置于牌堆顶');
					game.updateRoundNumber();
					game.delayx();
				},
			},
			player:{
				//新函数
				/**
				 * version 1.4
				 * 
				 * 链式创建一次性技能的api。
				 *
				 * 使用者只需要关注技能的效果，而不是技能的本身。
				 */
				when:function(){
					if(!_status.postReconnect.player_when) _status.postReconnect.player_when=[
						function(map){
							"use strict";
							for(let i in map){
								lib.skill[i]={
									charlotte:true,
									forced:true,
									popup:false,
								}
								if(typeof map[i]=='string') lib.translate[i]=map[i];
							}
						},{}
					];
					let triggerNames=Array.from(arguments);
					let trigger;
					if(triggerNames.length==0) throw 'player.when的参数数量应大于0';
					//add other triggerNames
					//arguments.length = 1
					if(triggerNames.length==1){
						//以下两种情况:
						//triggerNames = [ ['xxAfter', ...args] ]
						//triggerNames = [ 'xxAfter' ]
						if(Array.isArray(triggerNames[0])||typeof triggerNames[0]=='string') trigger={player:triggerNames[0]};
						//triggerNames = [ {player:'xxx'} ]
						else if(get.is.object(triggerNames[0])) trigger=triggerNames[0];
					}
					//arguments.length > 1
					else{
						//triggerNames = [ 'xxAfter', 'yyBegin' ]
						if(triggerNames.every(t=>typeof t=='string')) trigger={player:triggerNames};
						//triggerNames = [ {player: 'xxAfter'}, {global: 'yyBegin'} ]
						//此处不做特殊的合并处理，由使用者自行把握
						else if(triggerNames.every(t=>get.is.object(t))) trigger=triggerNames.reduce((pre,cur)=>Object.assign(pre,cur));
					}
					if(!trigger) throw 'player.when传参数类型错误:'+triggerNames;
					let skillName;
					do{
						skillName='player_when_'+Math.random().toString(36).slice(-8);
					}while(lib.skill[skillName]!=null);
					let after=`${skillName}After`;
					if(!trigger.player) trigger.player=after;
					else if(Array.isArray(trigger.player)) trigger.player.add(after);
					else if(typeof trigger.player=='string') trigger.player=[trigger.player,after];
					let skill={
						trigger,
						forced:true,
						charlotte:true,
						popup:false,
						//必要条件
						filterFuns:[],
						//充分条件
						filter2Funs:[],
						contentFuns:[],
						get filter(){
							return (event,player,name)=>{
								if(name==`${skillName}After`){
									skill.popup=false;
									return true;
								}
								return skill.filterFuns.every(fun=>Boolean(fun(event,player,name)))&&
									skill.filter2(event,player,name);
							}
						},
						get filter2(){
							return (event,player,name)=>{
								return skill.filter2Funs.length==0||
								skill.filter2Funs.some(fun=>Boolean(fun(event,player,name)));
							};
						}
					};
					Object.defineProperty(lib.skill,skillName,{
						configurable:true,
						//这类技能不需要被遍历到
						enumerable:false,
						writable:true,
						value:skill
					});
					game.broadcast(function(skillName){
						Object.defineProperty(lib.skill,skillName,{
							configurable:true,
							enumerable:false,
							writable:true,
							value:{
								forced:true,
								charlotte:true,
								popup:false,
							}
						});
					},skillName);
					this.addSkill(skillName);
					_status.postReconnect.player_when[1][skillName]=true;
					return{
						filter(fun){
							if(lib.skill[skillName]!=skill) throw `This skill has been destroyed`;
							skill.filterFuns.push(fun);
							return this;
						},
						removeFilter(fun){
							if(lib.skill[skillName]!=skill) throw `This skill has been destroyed`;
							skill.filterFuns.remove(fun);
							return this;
						},
						filter2(fun){
							if(lib.skill[skillName]!=skill) throw `This skill has been destroyed`;
							skill.filter2Funs.push(fun);
							return this;
						},
						removeFilter2(fun){
							if(lib.skill[skillName]!=skill) throw `This skill has been destroyed`;
							skill.filter2Funs.remove(fun);
							return this;
						},
						then(fun){
							if(lib.skill[skillName]!=skill) throw `This skill has been destroyed`;
							skill.contentFuns.push(fun);
							let str=`
								function content(){
									if(event.triggername=='${skillName}After'){
										player.removeSkill('${skillName}');
										delete lib.skill['${skillName}'];
										delete lib.translate['${skillName}'];
										return event.finish();
									}
							`;
							for(let i=0;i<skill.contentFuns.length;i++){
								let fun2=skill.contentFuns[i];
								let a=fun2.toString();
								let str2=a.slice(a.indexOf("{")+1,a.lastIndexOf("}")!=-1?a.lastIndexOf("}"):undefined).trim();
								str+=`'step ${i}'\n\t${str2}\n\t`;
							}
							let result=eval(str+`\n};content;`);
							skill.content=result;
							return this;
						},
						popup(str){
							if(lib.skill[skillName]!=skill) throw `This skill has been destroyed`;
							if(typeof str=='string') skill.popup=str;
							return this;
						},
						translation(translation){
							if(lib.skill[skillName]!=skill) throw `This skill has been destroyed`;
							if(typeof translation=='string'){
								_status.postReconnect.player_when[1][skillName]=translation;
								game.broadcastAll((skillName,translation)=>lib.translate[skillName]=translation,skillName,translation)
							}
							return this;
						},
						assign(obj) {
							if(lib.skill[skillName]!=skill) throw `This skill has been destroyed`;
							if(typeof obj=='object'&&obj!==null) Object.assign(skill,obj);
							return this;
						}
					};
				},
				//让一名角色明置一些手牌
				addShownCards:function(){
					const cards=[],tags=[];
					for(const argument of arguments){
						const type=get.itemtype(argument);
						if(type=='cards') cards.addArray(argument);
						else if(type=='card') cards.add(argument);
						else if(typeof argument=='string'&&argument.startsWith('visible_')) tags.add(argument);
					}
					if(!cards.length||!tags.length) return;
					const next=game.createEvent('addShownCards',false);
					next.player=this;
					next._cards=cards;
					next.gaintag=tags;
					next.setContent('addShownCards');
					return next;
				},
				hideShownCards:function(){
					const cards=[],tags=[];
					for(const argument of arguments){
						const type=get.itemtype(argument);
						if(type=='cards') cards.addArray(argument);
						else if(type=='card') cards.add(argument);
						else if(typeof argument=='string'&&argument.startsWith('visible_')) tags.add(argument);
					}
					if(!cards.length) return;
					const next=game.createEvent('hideShownCards',false);
					next.player=this;
					next._cards=cards;
					next.gaintag=tags;
					next.setContent('hideShownCards');
					return next;
				},
				//获取角色所有的明置手牌
				getShownCards:function(){
					return this.getCards('h',function(card){
						return get.is.shownCard(card);
					});
				},
				//Execute the delay card effect
				//执行延时锦囊牌效果
				executeDelayCardEffect:function(card,target,judge,judge2){
					const executeDelayCardEffect=game.createEvent('executeDelayCardEffect');
					executeDelayCardEffect.player=this;
					executeDelayCardEffect.target=target||this;
					if(typeof card=='string'){
						const virtualCard=executeDelayCardEffect.card=ui.create.card();
						virtualCard._destroy=true;
						virtualCard.expired=true;
						const info=lib.card[card];
						virtualCard.init(['','',card,info&&info.cardnature]);
					}
					else if(get.itemtype(card)=='card') executeDelayCardEffect.card=card;
					else _status.event.next.remove(executeDelayCardEffect);
					executeDelayCardEffect.judge=judge;
					executeDelayCardEffect.judge2=judge2;
					executeDelayCardEffect.setContent('executeDelayCardEffect');
					executeDelayCardEffect._args=Array.from(arguments);
					return executeDelayCardEffect;
				},
				//Check if the card does not count toward hand limit
				//检测此牌是否不计入手牌上限
				canIgnoreHandcard:function(card){
					return lib.filter.ignoredHandcard(card,this);
				},
				//Gift
				//赠予
				gift:function(cards,target){
					const gift=game.createEvent('gift');
					gift.player=this;
					gift.target=target;
					const isArray=Array.isArray(cards);
					if(cards&&!isArray) gift.cards=[cards];
					else if(isArray&&cards.length) gift.cards=cards;
					else _status.event.next.remove(gift);
					gift.deniedGifts=[];
					gift.setContent('gift');
					gift._args=Array.from(arguments);
					return gift;
				},
				//Check if the player can gift the card
				//检测角色是否能赠予此牌
				canGift:function(card,target,strict){
					return lib.filter.cardGiftable(card,this,target,strict);
				},
				//Check if the player refuses gifts
				//检测角色是否拒绝赠予
				refuseGifts:function(card,player){
					return this.hasSkillTag('refuseGifts',null,{
						player:player,
						card:card
					});
				},
				//Gift AI related
				//赠予AI相关
				getGiftAIResultTarget:function(card,target){
					if(!card||target.refuseGifts(card,this)) return 0;
					if(get.type(card,false)=='equip') return get.effect(target,card,target,target);
					if(card.name=='du') return this.hp>target.hp?-1:0;
					if(target.hasSkillTag('nogain')) return 0;
					return Math.max(1,get.value(card,this)-get.value(card,target));
				},
				getGiftEffect:function(card,target){
					return this.getGiftAIResultTarget(card,target)*get.attitude(this,target);
				},
				//Recast
				//重铸
				recast:function(cards,recastingLose,recastingGain){
					const recast=game.createEvent('recast');
					recast.player=this;
					const isArray=Array.isArray(cards);
					if(cards&&!isArray) recast.cards=[cards];
					else if(isArray&&cards.length) recast.cards=cards;
					else _status.event.next.remove(recast);
					if(typeof recastingLose!='function') recastingLose=(player,cards)=>player.loseToDiscardpile(cards).log=false;
					recast.recastingLose=recastingLose;
					recast.recastingLosingEvents=[];
					if(typeof recastingGain!='function') recastingGain=(player,cards)=>player.draw(cards.length).log=false;
					recast.recastingGain=recastingGain;
					recast.recastingGainingEvents=[];
					recast.setContent('recast');
					recast._args=Array.from(arguments);
					return recast;
				},
				//Check if the player can recast the card
				//检测角色是否能重铸此牌
				canRecast:function(card,source,strict){
					return lib.filter.cardRecastable(card,this,source,strict);
				},
				//装备栏相关
				//判断一名角色的某个区域是否被废除
				//type为要判断的区域 若为空 则判断玩家是否有任意一个被废除的区域
				hasDisabledSlot:function(type){
					var player=this;
					if(type=='horse') return player.hasDisabledSlot(3)&&player.hasDisabledSlot(4);
					return player.countDisabledSlot(type)>0;
				},
				//判断一名角色的某个区域被废除的数量
				//用法同上
				countDisabledSlot:function(type){
					var player=this;
					var map=(player.disabledSlots||{});
					if(type==undefined){
						num=0;
						for(var i=1;i<=5;i++){
							num+=player.countDisabledSlot(i);
						}
						return num;
					}
					else{
						if(typeof type=='number') type=('equip'+type);
						var num=map[type];
						if(typeof num=='number'&&num>0) return num;
						return 0;
					}
				},
				//判断一名角色是否有某个装备栏空着
				hasEmptySlot:function(type){
					var player=this;
					if(type=='horse') return player.hasEmptySlot(3)&&player.hasEmptySlot(4);
					return player.countEmptySlot(type)>0;
				},
				//判断一名角色的某个装备栏空位的数量
				countEmptySlot:function(type){
					if(!type) return 0;
					var player=this;
					if(typeof type=='number') type=('equip'+type);
					return Math.max(0,player.countEnabledSlot(type)-player.getEquips(type).reduce(function(num,card){
						var types=get.subtypes(card,false);
						return num+get.numOf(types,type);
					},0))
				},
				//判断一名角色是否有可以用于装备新装备牌的区域（排除金箍棒和六龙等“不可被替换装备”）
				//用法同下
				hasEquipableSlot:function(type){
					return this.countEquipableSlot(type)>0;
				},
				//统计一名角色有多少个可以用于装备新的装备牌的区域
				//用法同下
				countEquipableSlot:function(type){
					if(!type) return 0;
					var player=this;
					if(typeof type=='number') type=('equip'+type);
					return Math.max(0,player.countEnabledSlot(type)-player.getEquips(type).reduce(function(num,card){
						var types=get.subtypes(card,false);
						if(!lib.filter.canBeReplaced(card,player)) num+=get.numOf(types,type);
						return num;
					},0))
				},
				//判断一名角色是否拥有未被废除的某个区域
				//type为要判断的区域 若为空 则判断玩家是否有任意一个未被废除的区域
				hasEnabledSlot:function(type){
					var player=this;
					if(type=='horse') return player.hasEnabledSlot(3)&&player.hasEnabledSlot(4);
					return player.countEnabledSlot(type)>0;
				},
				//判断一名角色的某个区域未被废除的数量
				//用法同上
				countEnabledSlot:function(type){
					var player=this;
					var map=(player.expandedSlots||{});
					if(!type){
						num=0;
						for(var i=1;i<=5;i++){
							num+=player.countEnabledSlot(i);
						}
						return num;
					}
					else{
						if(typeof type=='number') type=('equip'+type);
						var slots=1;
						var num=map[type];
						if(typeof num=='number'&&num>0) slots+=num;
						slots-=player.countDisabledSlot(type);
						return slots;
					}
				},
				//获取一名角色装备区内某种类型的装备牌
				//参数可以为数字/区域字符串/实体牌/虚拟牌/牌名
				getEquips:function(subtype){
					var type=(typeof subtype);
					switch(type){
						case 'string':
							if(subtype.startsWith('equip')&&parseInt(subtype.slice(5))>0){
								break;
							}
							else if(lib.card[subtype]){
								return this.getCards('e',card=>card.name==subtype);
							}
							else return [];
						case 'number':
							subtype='equip'+subtype;
							break;
						case 'object':
							subtype=get.subtype(subtype,false);
							break;
						default:
							return [];
					}
					if(!subtype) return [];
					return this.getCards('e',function(card){
						return get.subtypes(card,false).contains(subtype);
					})
				},
				//新的废除装备区/恢复装备区/扩展装备区
				//参数：废除来源角色（不写默认当前事件角色），废除区域（数字/区域字符串/数组，可以写多个，重复废除）
				disableEquip:function(){
					var next=game.createEvent('disableEquip');
					next.player=this;
					next.slots=[];
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(Array.isArray(arguments[i])){
							for(var arg of arguments[i]){
								if(typeof arg=='string'){
									if(arg.startsWith('equip')&&parseInt(arg.slice(5))>0) next.slots.push(arg);
								}
								else if(typeof arg=='number'){
									next.slots.push('equip'+arg);
								}
							}
						}
						else if(typeof arguments[i]=='string'){
							if(arguments[i].startsWith('equip')&&parseInt(arguments[i].slice(5))>0) next.slots.push(arguments[i]);
						}
						else if(typeof arguments[i]=='number'){
							next.slots.push('equip'+arguments[i]);
						}
					}
					if(!next.source) next.source=_status.event.player;
					if(!next.slots.length){
						_status.event.next.remove(next);
					}
					next.setContent('disableEquip');
					return next;
				},
				enableEquip:function(){
					var next=game.createEvent('enableEquip');
					next.player=this;
					next.slots=[];
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(Array.isArray(arguments[i])){
							for(var arg of arguments[i]){
								if(typeof arg=='string'){
									if(arg.startsWith('equip')&&parseInt(arg.slice(5))>0) next.slots.push(arg);
								}
								else if(typeof arg=='number'){
									next.slots.push('equip'+arg);
								}
							}
						}
						else if(typeof arguments[i]=='string'){
							if(arguments[i].startsWith('equip')&&parseInt(arguments[i].slice(5))>0) next.slots.push(arguments[i]);
						}
						else if(typeof arguments[i]=='number'){
							next.slots.push('equip'+arguments[i]);
						}
					}
					if(!next.source) next.source=_status.event.player;
					if(!next.slots.length){
						_status.event.next.remove(next);
					}
					next.setContent('enableEquip');
					return next;
				},
				expandEquip:function(){
					var next=game.createEvent('expandEquip');
					next.player=this;
					next.slots=[];
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(Array.isArray(arguments[i])){
							for(var arg of arguments[i]){
								if(typeof arg=='string'){
									if(arg.startsWith('equip')&&parseInt(arg.slice(5))>0) next.slots.push(arg);
								}
								else if(typeof arg=='number'){
									next.slots.push('equip'+arg);
								}
							}
						}
						else if(typeof arguments[i]=='string'){
							if(arguments[i].startsWith('equip')&&parseInt(arguments[i].slice(5))>0) next.slots.push(arguments[i]);
						}
						else if(typeof arguments[i]=='number'){
							next.slots.push('equip'+arguments[i]);
						}
					}
					if(!next.source) next.source=_status.event.player;
					if(!next.slots.length){
						_status.event.next.remove(next);
					}
					next.setContent('expandEquip');
					return next;
				},
				//判断判定区是否被废除
				isDisabledJudge:function(){
					return Boolean(this.storage._disableJudge);
				},
				//同步显示扩展装备区状态
				$syncExpand:function(map){
					var player=this;
					if(!map){
						map=(player.expandedSlots||{});
					}
					game.addVideo('$syncExpand',player,get.copy(map))
					game.broadcast(function(player,map){
						player.expandedSlots=map;
						player.$syncExpand(map);
					},player,map);
					player.markSkill('expandedSlots');
				},
				//同步装备区废除牌显示状态
				$syncDisable:function(map){
					var player=this;
					var suits={equip3:'+1马栏',equip4:'-1马栏',equip6:'特殊栏'};
					if(!map){
						map=(player.disabledSlots||{});
					}
					game.addVideo('$syncDisable',player,get.copy(map))
					game.broadcast(function(player,map){
						player.disabledSlots=map;
						player.$syncDisable(map);
					},player,map)
					var map2=get.copy(map);
					var cards=Array.from(player.node.equips.childNodes);
					for(var card of cards){
						if(card.name.startsWith('feichu_')){
							var index=card.name.slice(7);
							if(!map2[index]) map2[index]=0;
							map2[index]--;
						}
					}
					for(var index in map2){
						if(!index.startsWith('equip')||!(parseInt(index.slice(5))>0)) continue;
						var num=map2[index];
						if(num>0){
							for(var i=0;i<num;i++){
								var card=game.createCard('feichu_'+index,(suits[index]||(get.translation(index)+'栏')),'');
								card.fix();
								card.style.transform='';
								card.classList.remove('drawinghidden');
								card.classList.add('feichu');
								delete card._transform;
								var equipNum=get.equipNum(card);
								var equipped=false;
								for(var j=0;j<player.node.equips.childNodes.length;j++){
									if(get.equipNum(player.node.equips.childNodes[j])>=equipNum){
										player.node.equips.insertBefore(card,player.node.equips.childNodes[j]);
										equipped=true;
										break;
									}
								}
								if(!equipped){
									player.node.equips.appendChild(card);
									if(_status.discarded){
										_status.discarded.remove(card);
									}
								}
							}
						}
						else if(num<0){
							for(var i=0;i>num;i--){
								var card=cards.find(card=>card.name=='feichu_'+index);
								if(card){
									player.node.equips.removeChild(card);
									cards.remove(card);
								}
							}
						}
					}
				},
				//以下函数涉及到本次更新内容而进行修改
				canEquip:function(name,replace){
					var ranges=get.subtypes(name),rangex=[...new Set(ranges)],player=this;
					for(var range of rangex){
						var num=this.countEquipableSlot(range);
						var num2=get.numOf(rangex,range);
						if(!replace) num-=this.getEquips(range).filter(card=>lib.filter.canBeReplaced(card,player)).length;
						if(num<num2) return false;
					}
					return true;
				},
				//以下函数将不再进行后续维护
				countDisabled:function(){
					return this.countDisabledSlot.apply(this,arguments)
				},
				isDisabled:function(arg){
					return this.hasDisabledSlot(arg)&&!this.hasEnabledSlot(arg);
				},
				isEmpty:function(num){
					return this.countEnabledSlot(num)>this.getEquips(num).length;
				},
				//以下函数将被废弃
				$disableEquip:function(){},
				$enableEquip:function(){},
				//装备区End
				chooseToDebate:function(){
					var next=game.createEvent('chooseToDebate');
					next.player=this;
					next._args=[];
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='players'){
							next.list=arguments[i].slice(0);
						}
						else{
							next._args.push(arguments[i]);
						}
					}
					next.setContent('chooseToDebate');
					return next;
				},
				cooperationWith:function(target,type,reason){
					var player=this;
					if(!player.storage.cooperation) player.storage.cooperation=[];
					var info={
						target:target,
						type:type,
						reason:reason,
					};
					player.storage.cooperation.add(info);
					player.addTempSkill('cooperation',{player:'dieAfter'});
					player.addSkill('cooperation_'+type,{player:'dieAfter'});
					game.log(player,'向',target,'发起了“协力”，合作类型是','#g'+get.translation('cooperation_'+type));
				},
				chooseCooperationFor:function(){
					var next=game.createEvent('chooseCooperationFor');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.target=arguments[i];
						}
						else if(Array.isArray(arguments[i])){
							next.cardlist=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							next.reason=arguments[i];
						}
					}
					if(!next.cardlist) next.cardlist=['cooperation_damage','cooperation_draw','cooperation_discard','cooperation_use'];
					next.setContent('chooseCooperationFor');
					return next;
				},
				checkCooperationStatus:function(target,reason){
					var storage=this.getStorage('cooperation');
					for(var info of storage){
						if(info.target==target&&info.reason==reason){
							var skill=lib.skill['cooperation_'+info.type];
							if(skill&&skill.checkx&&skill.checkx(info)) return true;
						}
					}
					return false;
				},
				removeCooperation:function(info){
					var player=this;
					var storage=player.getStorage('cooperation');
					if(!storage.contains(info)) return;
					storage.remove(info);
					var unmark=true,reason=info.type;
					if(!storage.length){
						player.removeSkill('cooperation');
					}
					else{
						for(var i of storage){
							if(i.type==reason){
								unmark=false;
								break;
							}
						}
					}
					if(unmark) player.removeSkill('cooperation_'+reason);
					else player.markSkill('cooperation_'+reason);
				},
				hasClan:function(clan,unseen){
					if(unseen||!this.isUnseen(0)){
						var info=lib.character[this.name1];
						if(info&&info[4]){
							for(var i of info[4]){
								if(typeof i=='string'&&i.startsWith('clan:')&&i.slice(5)==clan) return true;
							}
						}
					}
					if(this.name2&&(unseen||!this.isUnseen(1))){
						var info=lib.character[this.name2];
						if(info&&info[4]){
							for(var i of info[4]){
								if(typeof i=='string'&&i.startsWith('clan:')&&i.slice(5)==clan) return true;
							}
						}
					}
					return false;
				},
				changeZhuanhuanji:function(skill){
					var player=this,info=get.info(skill),zhuanhuan=info.zhuanhuanji;
					if(typeof zhuanhuan=='function') zhuanhuan(player,skill);
					else if(zhuanhuan=='number') player.addMark(skill,1,false);
					else player.storage[skill]=!player.storage[skill];
					game.broadcastAll(function(player,skill){
						player.$changeZhuanhuanji(skill);
					},player,skill);
				},
				$changeZhuanhuanji:function(skill){
					var mark=this.marks[skill];
					if(mark){
						if(mark.firstChild.reversed){
							mark.firstChild.reversed=false;
							mark.firstChild.style.transform='none';
						}
						else{
							mark.firstChild.reversed=true;
							mark.firstChild.style.transform='rotate(180deg)';
						}
					}
				},
				setSeatNum:function(num){
					_status.seatNumSettled=true;
					game.broadcastAll(function(player,num){
						player.seatNum=num;
					},this,num);
				},
				getSeatNum:function(){
					if(typeof this.seatNum=='number') return this.seatNum;
					return 0;
				},
				hasSex:function(sex){
					if(this.sex=='unknown') return false;
					if(this.sex=='double') return true;
					return this.sex==sex;
				},
				sameSexAs:function(target){
					var sex1=this.sex,sex2=target.sex;
					if(sex1=='unknown'||sex2=='unknown') return false;
					if(sex1=='double'||sex2=='double') return true;
					return sex1==sex2;
				},
				differentSexFrom:function(target){
					var sex1=this.sex,sex2=target.sex;
					if(sex1=='unknown'||sex2=='unknown') return false;
					if(sex1=='double'||sex2=='double') return true;
					return sex1!=sex2;
				},
				addSkillBlocker:function(skill){
					if(!this.storage.skill_blocker) this.storage.skill_blocker=[];
					this.storage.skill_blocker.push(skill);
				},
				removeSkillBlocker:function(skill){
					if(this.storage.skill_blocker){
						this.storage.skill_blocker.remove(skill);
						if(!this.storage.skill_blocker.length) delete this.storage.skill_blocker;
					}
				},
				loseToSpecial:function(cards,tag,target){
					var next=game.loseAsync({
						player:this,
						cards:cards,
						tag:tag,
						toStorage:true,
						target:target||this,
					});
					next.setContent(function(){
						"step 0"
						player.lose(cards,ui.special).set('getlx',false);
						"step 1"
						var cards=event.cards.slice(0);
						cards.removeArray(player.getCards('hejsx'));
						if(cards.length) target.directgains(cards,null,event.tag)
					});
					return next;
				},
				addGaintag:function(cards,tag){
					if(get.itemtype(cards)=='card') cards=[cards];
					game.addVideo('addGaintag',this,[get.cardsInfo(cards),tag]);
					game.broadcastAll(function(player,cards,tag){
						var hs=player.getCards('hejsx');
						for(var i of cards){
							if(hs.contains(i)) i.addGaintag(tag);
						}
					},this,cards,tag);
				},
				removeGaintag:function(tag,cards){
					cards=cards||this.getCards('h');
					game.addVideo('removeGaintag',this,[tag,get.cardsInfo(cards)]);
					game.broadcastAll(function(player,tag,cards){
						for(var i of cards) i.removeGaintag(tag);
					},this,tag,cards);
				},
				canSave:function(target){
					var player=this;
					if(player.hasSkillTag('save',true,target,true)) return true;
					var name={},hs=player.getCards('hs');
					for(var i of hs) name[get.name(i)]=true;
					for(var i in lib.card){
						if(lib.card[i].savable&&(lib.inpile.contains(i)||name[i])){
							if(lib.filter.cardSavable({name:i},player,target)&&(_status.connectMode||player.hasUsableCard(i))) return true;
						}
					}
					return false;
				},
				canSaveCard:function(card,target){
					var player=this;
					var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
					if(mod2!='unchanged') return mod2;
					var mod=game.checkMod(card,player,target,'unchanged','cardSavable',player);
					if(mod!='unchanged') return mod;
					var savable=get.info(card).savable;
					if(typeof savable=='function') savable=savable(card,player,target);
					return savable;
				},
				showCharacter:function(num,log){
					var toShow=[];
					if((num==0||num==2)&&this.isUnseen(0)) toShow.add(this.name1);
					if((num==1||num==2)&&this.isUnseen(1)) toShow.add(this.name2);
					if(!toShow.length) return;
					lib.element.player.$showCharacter.apply(this,arguments);
					var next=game.createEvent('showCharacter',false);
					next.player=this;
					next.num=num;
					next.toShow=toShow;
					next._args=Array.from(arguments);
					next.setContent('showCharacter');
					var evt=_status.event;
					evt.next.remove(next);
					if(evt.logSkill) evt=evt.getParent();
					evt.after.push(next);
					return next;
				},
				$showCharacter:function(num,log){
					if(num==0&&!this.isUnseen(0)){
						return;
					}
					if(num==1&&(!this.name2||!this.isUnseen(1))){
						return;
					}
					if(!this.isUnseen(2)){
						return;
					}
					game.addVideo('showCharacter',this,num);
					var skills;
					switch(num){
						case 0:
						if(log!==false) game.log(this,'展示了主将','#b'+this.name1);
						this.name=this.name1;
						skills=lib.character[this.name][3]||[];
						this.sex=lib.character[this.name][0];
						if(this.group=='unknown') this.group=lib.character[this.name][1];
						this.classList.remove('unseen');
						break;
						case 1:
						if(log!==false) game.log(this,'展示了副将','#b'+this.name2);
						skills=lib.character[this.name2][3]||[];
						if(this.sex=='unknown') this.sex=lib.character[this.name2][0];
						if(this.name.startsWith('unknown')) this.name=this.name2;
						this.classList.remove('unseen2');
						break;
						case 2:
						if(log!==false){
							if(this.name2) game.log(this,'展示了主将','#b'+this.name1,'、副将','#b'+this.name2);
							else game.log(this,'展示了主将','#b'+this.name1);
						}
						this.name=this.name1;
						var skills=(lib.character[this.name][3]||[]);
						if(this.name2) skills=skills.concat(lib.character[this.name2][3]||[]);
						this.sex=lib.character[this.name][0];
						if(this.group=='unknown') this.group=lib.character[this.name][1];
						this.classList.remove('unseen');
						this.classList.remove('unseen2');
						break;
					}
					if(!this.isUnseen(2)){
						delete this.storage.nohp;
						this.hp=this.storage.rawHp+this.maxHp-1;
						this.maxHp=this.storage.rawMaxHp+this.maxHp-1;
						this.node.hp.show();
						this.update();
					}
					game.broadcast(function(player,name,sex,num,group){
						player.group=group;
						player.name=name;
						player.sex=sex;
						switch(num){
							case 0:player.classList.remove('unseen');break;
							case 1:player.classList.remove('unseen2');break;
							case 2:player.classList.remove('unseen');player.classList.remove('unseen2');break;
						}
						if(!player.isUnseen(2)){
							delete player.storage.nohp;
							player.node.hp.show();
							player.update();
						}
					},this,this.name,this.sex,num,this.group);
					skills=skills.filter(skill=>{
						var info=get.info(skill);
						if(info&&info.zhuSkill&&!this.isZhu2()) return false;
						return true;
					});
					for(var i=0;i<skills.length;i++){
						if(this.hiddenSkills.contains(skills[i])){
							this.hiddenSkills.remove(skills[i]);
							this.addSkill(skills[i]);
						}
					}
					this.checkConflict();
				},
				chooseToPlayBeatmap:function(beatmap){
					var next=game.createEvent('chooseToPlayBeatmap');
					next.player=this;
					next.beatmap=beatmap;
					next._args=Array.from(arguments);
					next.setContent('chooseToPlayBeatmap');
					return next;
				},
				chooseToMove:function(){
					var next=game.createEvent('chooseToMove');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
					}
					next.setContent('chooseToMove');
					next.filterOk=function(){return true};
					next.filterMove=function(){return true};
					return next;
				},
				chooseToGuanxing:function(num){
					var next=game.createEvent('chooseToGuanxing');
					next.num=num||1;
					next.player=this;
					next.setContent('chooseToGuanxing');
					return next;
				},
				$throwEmotion:function(target,name){
					game.addVideo('throwEmotion',this,[target.dataset.position,name]);
					var getLeft=function(player){
						if(player==game.me&&!ui.fakeme&&!ui.chess) return player.getLeft()+player.node.avatar.offsetWidth/2;
						return player.getLeft()+player.offsetWidth/2;
					}
					var player=this;
					var emotion=ui.create.div('','<div style="text-align:center"> <img src="'+lib.assetURL+'image/emotion/throw_emotion/'+name+'1.png"> </div>',game.chess?ui.chess:ui.window);
					emotion.style.width='60px';
					emotion.style.height='60px';
					var width=emotion.offsetWidth/2;
					var height=emotion.offsetHeight/2;
					if(game.chess) width+=60;
					var left=getLeft(player)-width;
					var top=player.getTop()+player.offsetHeight/3-height;
					emotion.style.left=left+'px';
					emotion.style.top=top+'px';
					var left2=getLeft(target)-width;
					var top2=target.getTop()+target.offsetHeight/3-height;
					emotion.style['z-index']=10;
					emotion.style.transform='translateY('+(top2-top)+'px) translateX('+(left2-left)+'px)';
					if(lib.config.background_audio) game.playAudio('effect','throw_'+name+get.rand(1,2));
					setTimeout(function(){
						emotion.innerHTML=('<div style="text-align:center"> <img src="'+lib.assetURL+'image/emotion/throw_emotion/'+name+'2.png"> </div>');
						setTimeout(function(){
							emotion.delete();
						},1200);
					},600);
				},
				tryJudgeAnimate:function(bool){
					var player=this;
					game.broadcast(function(player,bool){
						player.trySkillAnimate(bool);
					},player,bool);
					if(bool) this.popup('判定生效','wood',false);
					else this.popup('判定失效','fire',false);
				},
				trySkillAnimate:function(name,popname,checkShow){
					if(!game.online&&lib.config.skill_animation_type!='off'&&lib.skill[name]&&lib.skill[name].skillAnimation){
						if(lib.config.skill_animation_type=='default'){
							checkShow=checkShow||'main';
						}
						else{
							checkShow=false;
						}
						if(lib.skill[name].textAnimation){
							checkShow=false;
						}
						this.$skill(lib.skill[name].animationStr||lib.translate[name],lib.skill[name].skillAnimation,lib.skill[name].animationColor,checkShow);
						return;
					}
					var player=this;
					game.broadcast(function(player,name,popname){
						player.trySkillAnimate(name,popname);
					},player,name,popname);
					if(lib.animate.skill[name]) lib.animate.skill[name].apply(this,arguments);
					else{
						if(popname!=name) this.popup(popname,'water',false);
						else this.popup(get.skillTranslation(name,this),'water',false);
					}
				},
				tryCardAnimate:function(card,name,nature,popname){
					var player=this;
					game.broadcast(function(player,card,name,nature,popname){
						player.tryCardAnimate(card,name,nature,popname);
					},player,card,name,nature,popname);
					if(lib.animate.card[card.name]) lib.animate.card[card.name].apply(this,arguments);
					else {
						if(!lib.config.show_card_prompt) return;
						if(get.type(card)=='equip'&&lib.config.hide_card_prompt_equip) return;
						if(get.type(card)=='basic'&&lib.config.hide_card_prompt_basic) return;
						if(popname) player.popup({name:card.name,nature:card.nature},nature,false);
						else player.popup(name,nature,false);
					}
				},
				hasUsableCard:function(name){
					var player=this;
					if(player.countCards('hs',name)) return true;
					var skills=player.getSkills('invisible').concat(lib.skill.global);
					game.expandSkills(skills);
					for(var i=0;i<skills.length;i++){
						var ifo=get.info(skills[i]);
						if(ifo.viewAs&&typeof ifo.viewAs!='function'&&ifo.viewAs.name==name){
							if(!ifo.viewAsFilter||ifo.viewAsFilter(player)!==false){
								return true;
							}
						}
						else{
							var hiddenCard=get.info(skills[i]).hiddenCard;
							if(typeof hiddenCard=='function'&&hiddenCard(player,name)){
								return true;
							}
						}
					}
				},
				inRange:function(to){
					var from=this;
					if(from==to||from.hasSkill('undist')||to.hasSkill('undist')) return false;
					if(!game.players.contains(from)&&!game.dead.contains(from)) return false;
					if(!game.players.contains(to)&&!game.dead.contains(to)) return false;
					var mod1=game.checkMod(from,to,'unchanged','inRange',from);
					if(mod1!='unchanged') return mod1;
					var mod2=game.checkMod(from,to,'unchanged','inRangeOf',to);
					if(mod2!='unchanged') return mod2;
					var range=from.getAttackRange();
					if(range<1) return false;
					var player=from,m,n=1,i;
					var fxy,txy;
					if(game.chess){
						fxy=from.getXY();
						txy=to.getXY();
						n=Math.abs(fxy[0]-txy[0])+Math.abs(fxy[1]-txy[1]);
					}
					else if(to.isMin(true)||from.isMin(true)){}
					else{
						var length=game.players.length;
						var totalPopulation=game.players.length+game.dead.length+1;
						for(var iwhile=0;iwhile<totalPopulation;iwhile++){
							if(player.nextSeat!=to){
								player=player.nextSeat;
								if(player.isAlive()&&!player.isOut()&&!player.hasSkill('undist')&&!player.isMin(true)) n++;
							}
							else{
								break;
							}
						}
						for(i=0;i<game.players.length;i++){
							if(game.players[i].isOut()||game.players[i].hasSkill('undist')||game.players[i].isMin(true)) length--;
						}
						if(from.isDead()) length++;
						if(to.isDead()) length++;
						var left=from.hasSkillTag('left_hand');
						var right=from.hasSkillTag('right_hand');
						if(left===right) n=Math.min(n,length-n);
						else if(left==true) n=length-n;
					}
					n=game.checkMod(from,to,n,'globalFrom',from);
					n=game.checkMod(from,to,n,'globalTo',to);
					m=n;
					m=game.checkMod(from,to,m,'attackFrom',from);
					m=game.checkMod(from,to,m,'attackTo',to);
					var equips1=from.getCards('e',function(card){
						return !ui.selected.cards||!ui.selected.cards.contains(card);
					}),equips2=to.getCards('e',function(card){
						return !ui.selected.cards||!ui.selected.cards.contains(card);
					});
					for(i=0;i<equips1.length;i++){
						var info=get.info(equips1[i]).distance;
						if(!info) continue;
						if(info.globalFrom){
							m+=info.globalFrom;
							n+=info.globalFrom;
						}
					}
					for(i=0;i<equips2.length;i++){
						var info=get.info(equips2[i]).distance;
						if(!info) continue;
						if(info.globalTo){
							m+=info.globalTo;
							n+=info.globalTo;
						}
						if(info.attaclTo){
							m+=info.attaclTo;
						}
					}
					return m<=range;
				},
				inRangeOf:function(source){
					return source.inRange(this);
				},
				//Get the player's HP not less than 0. Set “raw” to true to get the player's raw HP instead.
				//获取角色的体力值。设置“raw”为true以获取角色的体力。
				getHp:function(raw){
					return raw?this.hp:Math.max(0,this.hp);
				},
				//Set “raw” to true to get the player's raw damaged HP instead.
				//设置“raw”为true以获取角色已损失的体力。
				getDamagedHp:function(raw){
					return this.maxHp-this.getHp(raw);
				},
				changeGroup:function(group,log,broadcast){
					var next=game.createEvent('changeGroup');
					next.player=this;
					next.log=true;
					for(var i=0;i<arguments.length;i++){
						var arg=arguments[i];
						if(lib.group.contains(arg)){
							next.group=arg;
						}
						else if(typeof arg==='boolean'){
							next.log=arg;
						}
						else if(arg==='nobroadcast'){
							next.broadcast=false;
						}
					}
					next.setContent('changeGroup');
					return next;
				},
				chooseToDuiben:function(target){
					var next=game.createEvent('chooseToDuiben');
					next.player=this;
					next.target=target;
					next.setContent('chooseToDuiben');
					return next;
				},
				chooseToPSS:function(target){
					var next=game.createEvent('chooseToPSS');
					next.player=this;
					next.target=target;
					next.setContent('chooseToPSS');
					return next;
				},
				chooseToEnable:function(){
					var next=game.createEvent('chooseToEnable');
					next.player=this;
					next.setContent('chooseToEnable');
					return next;
				},
				chooseToDisable:function(horse){
					var next=game.createEvent('chooseToDisable');
					next.player=this;
					if(horse) next.horse=true;
					next.setContent('chooseToDisable');
					return next;
				},
				isPhaseUsing:function(notmeisok){
					if(!notmeisok&&_status.currentPhase!=this) return false;
					return _status.event.name=='phaseUse'||_status.event.getParent('phaseUse').name=='phaseUse';
				},
				swapEquip:function(target){
					var next=game.createEvent('swapEquip');
					next.player=this;
					next.target=target;
					next.setContent('swapEquip');
					return next;
				},
				canCompare:function(target){
					if(this==target) return false;
					if(!this.countCards('h')||!target.countCards('h')) return false;
					if(this.hasSkillTag('noCompareSource')||target.hasSkillTag('noCompareTarget')) return false;
					return true;
				},
				$disableJudge:function(){
					var player=this;
					game.addVideo('$disableJudge',player);
					player.storage._disableJudge=true;
					var card=game.createCard('disable_judge','','');
					card.fix();
					card.classList.add('feichu');
					card.style.transform='';
					card.classList.add('drawinghidden');
					player.node.judges.insertBefore(card,player.node.judges.firstChild);
					ui.updatej(player);
				},
				$enableJudge:function(){
					var player=this;
					game.addVideo('$enableJudge',player);
					player.storage._disableJudge=false;
					for(var i=0;i<player.node.judges.childNodes.length;i++){
						if(player.node.judges.childNodes[i].name=='disable_judge'){
							player.node.judges.removeChild(player.node.judges.childNodes[i]);
							break;
						}
					}
				},
				disableJudge:function(){
					var next=game.createEvent('disableJudge');
					next.player=this;
					next.source=_status.event.player;
					next.setContent('disableJudge');
					return next;
				},
				enableJudge:function(){
					var next=game.createEvent('enableJudge');
					next.player=this;
					next.source=_status.event.player;
					next.setContent('enableJudge');
					return next;
				},
				//原有函数
				init:function(character,character2,skill,update){
					if(typeof character=='string'&&!lib.character[character]){
						lib.character[character]=get.character(character);
					}
					if(typeof character2=='string'&&!lib.character[character2]){
						lib.character[character2]=get.character(character2);
					}
					if(!lib.character[character]) return;
					if(get.is.jun(character2)){
						var tmp=character;
						character=character2;
						character2=tmp;
					}
					if(character2==false){
						skill=false;
						character2=null;
					}
					var info=lib.character[character];
					if(!info){
						info=['','',1,[],[]];
					}
					if(!info[4]){
						info[4]=[];
					}
					var skills=info[3].slice(0);
					this.clearSkills(true);
					this.classList.add('fullskin');
					if(!game.minskin&&get.is.newLayout()&&!info[4].contains('minskin')){
						this.classList.remove('minskin');
						this.node.avatar.setBackground(character,'character');
					}
					else{
						this.node.avatar.setBackground(character,'character');
						if(info[4].contains('minskin')){
							this.classList.add('minskin');
						}
						else if(game.minskin){
							this.classList.add('minskin');
						}
						else{
							this.classList.remove('minskin');
						}
					}

					var hp1=get.infoHp(info[2]);
					var maxHp1=get.infoMaxHp(info[2]);
					var hujia1=get.infoHujia(info[2]);
					
					this.node.avatar.show();
					this.node.count.show();
					this.node.equips.show();
					this.name=character;
					this.name1=character;
					this.sex=info[0];
					this.group=info[1];
					this.hp=hp1;
					this.maxHp=maxHp1;
					this.hujia=hujia1;
					this.node.intro.innerHTML=lib.config.intro;
					this.node.name.dataset.nature=get.groupnature(this.group);
					lib.setIntro(this);
					this.node.name.innerHTML=get.slimName(character);
					if(this.classList.contains('minskin')&&this.node.name.querySelectorAll('br').length>=4){
						this.node.name.classList.add('long');
					}
					if(info[4].contains('hiddenSkill')&&!this.noclick){
						if(!this.hiddenSkills) this.hiddenSkills=[];
						this.hiddenSkills.addArray(skills);
						skills=[];
						this.classList.add(_status.video?'unseen_v':'unseen');
						this.name='unknown';
						if(!this.node.name_seat&&!_status.video){
							this.node.name_seat=ui.create.div('.name.name_seat',get.verticalStr(get.translation(this.name)),this);
							this.node.name_seat.dataset.nature=get.groupnature(this.group);
						}
						this.sex='male';
						//this.group='unknown';
						this.storage.nohp=true;
						skills.add('g_hidden_ai');
					}
					if(character2&&lib.character[character2]){
						var info2=lib.character[character2];
						if(!info2){
							info2=['','',1,[],[]];
						}
						if(!info2[4]){
							info2[4]=[];
						}
						this.classList.add('fullskin2');
						this.node.avatar2.setBackground(character2,'character');

						this.node.avatar2.show();
						this.name2=character2;
						var hp2=get.infoHp(info2[2]);
						var maxHp2=get.infoMaxHp(info2[2]);
						var hujia2=get.infoHujia(info2[2]);
						this.hujia+=hujia2;
						var double_hp;
						if(_status.connectMode||get.mode()=='single'){
							double_hp='pingjun';
						}
						else{
							double_hp=get.config('double_hp');
						}
						switch(double_hp){
							case 'pingjun':{
								this.maxHp=Math.floor((maxHp1+maxHp2)/2);
								this.hp=Math.floor((hp1+hp2)/2);
								this.singleHp=((maxHp1+maxHp2)%2===1);
								break;
							}
							case 'zuidazhi':{
								this.maxHp=Math.max(maxHp1,maxHp2);
								this.hp=Math.max(hp1,hp2);
								break;
							}
							case 'zuixiaozhi':{
								this.maxHp=Math.min(maxHp1,maxHp2);
								this.hp=Math.min(hp1,hp2);
								break;
							}
							case 'zonghe':{
								this.maxHp=maxHp1+maxHp2;
								this.hp=hp1+hp2;
								break;
							}
							default:{
								this.maxHp=maxHp1+maxHp2-3;
								this.hp=hp1+hp2-3;
							};
						}
						this.node.count.classList.add('p2');
						if(info2[4].contains('hiddenSkill')&&!this.noclick){
							if(!this.hiddenSkills) this.hiddenSkills=[];
							this.hiddenSkills.addArray(info2[3]);
							this.classList.add(_status.video?'unseen2_v':'unseen2');
							this.storage.nohp=true;
							skills.add('g_hidden_ai');
						}
						else skills=skills.concat(info2[3]);

						this.node.name2.innerHTML=get.slimName(character2);
					}
					if(this.storage.nohp){
						this.storage.rawHp=this.hp;
						this.storage.rawMaxHp=this.maxHp;
						this.hp=1;
						this.maxHp=1;
						this.node.hp.hide();
					}
					if(skill!=false){
						skills=skills.filter(skill=>{
							var info=get.info(skill);
							if(info&&info.zhuSkill&&!this.isZhu2()) return false;
							return true;
						});
						for(var i=0;i<skills.length;i++){
							this.addSkill(skills[i]);
						}
						this.checkConflict();
					}
					lib.group.add(this.group);
					if(this.inits){
						for(var i=0;i<lib.element.player.inits.length;i++){
							lib.element.player.inits[i](this);
						}
					}
					if(this._inits){
						for(var i=0;i<this._inits.length;i++){
							this._inits[i](this);
						}
					}
					if(update!==false) this.update();
					return this;
				},
				initOL:function(name,character){
					this.node.avatar.setBackground(character,'character');
					this.node.avatar.show();
					this.node.name.innerHTML=get.verticalStr(name);
					this.nickname=name;
					this.avatar=character;
					this.node.nameol.innerHTML='';
					if(lib.character[character]) this.sex=lib.character[character][0];
				},
				uninitOL:function(){
					this.node.avatar.hide();
					this.node.name.innerHTML='';
					this.node.identity.firstChild.innerHTML='';
					delete this.nickname;
					delete this.avatar;
					delete this.sex;
				},
				initRoom:function(info,info2){
					var str='';
					this.serving=false;
					if(!info||info=='server'){
						this.roomempty=true;
						str='空房间';
						this.roomfull=false;
						this.roomgaming=false;
						this.version=null;
						if(info=='server'){
							this.serving=true;
						}
					}
					else{
						var config=info[2];
						this.key=info[4];
						this.roomempty=false;
						str+=get.modetrans(config);
						str+=' 模式　';
						for(var i=str.length;i<11;i++) str+='　';
						this.version=config.version;
						if(config.gameStarted){
							str+='<span class="firetext">游戏中</span>　';
							if(config.observe&&config.observeReady&&this.version==lib.versionOL){
								this.classList.remove('exclude');
							}
							else{
								this.classList.add('exclude');
							}
						}
						else{
							str+='<span class="greentext">等待中</span>　';
							if(this.version!=lib.versionOL){
								this.classList.add('exclude');
							}
							else{
								this.classList.remove('exclude');
							}
						}
						this.maxHp=parseInt(config.number);
						this.hp=Math.min(this.maxHp,info[3]);
						if(this.hp<this.maxHp||config.gameStarted) str+=('人数：'+this.hp+'/'+this.maxHp);
						else str+=('人数：<span class="firetext">'+this.hp+'/'+this.maxHp+'</span>');
						
						str+=('　('+info[0].slice(0,12)+' 的房间)');
						if(config.mode!='guozhan'&&(config.mode!='doudizhu'||config.doudizhu_mode!='online')){
							str+='【';
							for(var i=0;i<config.cardPack.length;i++){
								str+=(get.translation(config.cardPack[i]+'_card_config').slice(0,2));
								if(i<config.cardPack.length-1) str+='+';
							}
							str+='】';
						}
						this.config=config;
						if(this.hp==this.maxHp&&!config.gameStarted){
							this.roomfull=true;
						}
						else{
							this.roomfull=false;
						}
						if(config.gameStarted&&(!config.observe||!config.observeReady)){
							this.roomgaming=true;
						}
						else{
							this.roomgaming=false;
						}
					}
					this.firstChild.innerHTML=str;
					return this;
				},
				reinit:function(from,to,maxHp,online){
					var info1=lib.character[from];
					var info2=lib.character[to];
					var smooth=true;
					if(maxHp=='nosmooth'){
						smooth=false;
						maxHp=null;
					}
					if(this.name2==from){
						this.name2=to;
						if(this.isUnseen(0)&&!this.isUnseen(1)){
							this.sex=info2[0];
							this.name=to;
						}
						if(smooth) this.smoothAvatar(true);
						this.node.avatar2.setBackground(to,'character');
						this.node.name2.innerHTML=get.slimName(to);
					}
					else if(this.name==from||this.name1==from){
						if(this.name1==from){
							this.name1=to;
						}
						if(!this.classList.contains('unseen2')){
							this.name=to;
							this.sex=info2[0];
						}
						if(smooth) this.smoothAvatar(false);
						this.node.avatar.setBackground(to,'character');
						this.node.name.innerHTML=get.slimName(to);

						if(this==game.me&&ui.fakeme){
							ui.fakeme.style.backgroundImage=this.node.avatar.style.backgroundImage;
						}
					}
					else{
						return this;
					}
					if(online){
						return;
					}
					for(var i=0;i<info1[3].length;i++){
						this.removeSkill(info1[3][i]);
					}
					for(var i=0;i<info2[3].length;i++){
						var info=get.info(info2[3][i]);
						if(info&&info.zhuSkill&&!this.isZhu2()) continue;
						this.addSkill(info2[3][i]);
					}
					if(Array.isArray(maxHp)){
						this.maxHp=maxHp[1];
						this.hp=maxHp[0];
					}
					else{
						var num;
						if(maxHp===false){
							num=0;
						}
						else{
							if(typeof maxHp!='number'){
								maxHp=get.infoMaxHp(info2[2]);
							}
							num=maxHp-get.infoMaxHp(info1[2]);
						}
						if(typeof this.singleHp=='boolean'){
							if(num%2!=0){
								if(this.singleHp){
									this.maxHp+=(num+1)/2;
									this.singleHp=false;
								}
								else{
									this.maxHp+=(num-1)/2;
									this.singleHp=true;
									if(!game.online){
										this.doubleDraw();
									}
								}
							}
							else{
								this.maxHp+=num/2;
							}
						}
						else{
							this.maxHp+=num;
						}
					}
					game.broadcast(function(player,from,to,skills){
						player.reinit(from,to,null,true);
						player.applySkills(skills);
					},this,from,to,get.skillState(this));
					game.addVideo('reinit3',this,{
						from:from,
						to:to,
						hp:this.maxHp,
						avatar2:this.name2==to
					});
					this.update();
				},
				uninit:function(){
					this.expandedSlots={};
					this.disabledSlots={};
					this.$syncDisable();
					if(this.isDisabledJudge()){
						game.broadcastAll(function(player){
							player.storage._disableJudge=false;
							for(var i=0;i<player.node.judges.childNodes.length;i++){
								if(player.node.judges.childNodes[i].name=='disable_judge'){
									player.node.judges.removeChild(player.node.judges.childNodes[i]);
									break;
								}
							}
						},this);
					}
					this.node.avatar.hide();
					this.node.count.hide();
					if(this.node.wuxing){
						this.node.wuxing.hide();
					}
					if(this.node.name_seat){
						this.node.name_seat.remove();
						delete this.node.name_seat;
					}
					if(this.storage.nohp) this.node.hp.show();
					this.classList.remove('unseen');
					this.classList.remove('unseen2');
					delete this.name;
					delete this.name1;
					delete this.sex;
					delete this.group;
					delete this.hp;
					delete this.maxHp;
					delete this.hujia;
					this.clearSkills(true);
					this.node.identity.style.backgroundColor='';
					this.node.intro.innerHTML='';
					this.node.name.innerHTML='';
					this.node.hp.innerHTML='';
					this.node.count.innerHTML='0';
					if(this.name2){
						delete this.singleHp;
						this.node.avatar2.hide();
						this.node.name2.innerHTML='';
						this.classList.remove('fullskin2')
						delete this.name2;
						this.node.count.classList.remove('p2');
					}
					for(var mark in this.marks){
						this.marks[mark].remove();
					}
					ui.updatem(this);

					this.skipList=[];
					this.skills=this.skills.contains('cangji_yozuru')?['cangji_yozuru']:[];
					this.initedSkills=[];
					this.additionalSkills={};
					this.disabledSkills={};
					this.hiddenSkills=[];
					this.awakenedSkills=[];
					this.forbiddenSkills={};
					this.phaseNumber=0;
					this.stat=[{card:{},skill:{}}];
					this.tempSkills={};
					this.storage={};
					this.marks={};
					this.ai={friend:[],enemy:[],neutral:[]};

					return this;
				},
				getLeft:function(){
					return this.offsetLeft;
				},
				getTop:function(){
					return this.offsetTop;
				},
				smoothAvatar:function(vice,video){
					var div=ui.create.div('.fullsize');
					if(vice){
						div.style.background=getComputedStyle(this.node.avatar2).background;
						this.node.avatar2.appendChild(div);
					}
					else{
						div.style.background=getComputedStyle(this.node.avatar).background;
						this.node.avatar.appendChild(div);
					}
					ui.refresh(div);
					div.style.transition='all 1s';
					setTimeout(function(){
						div.classList.add('removing');
						setTimeout(function(){
							div.remove();
						},2000);
					},100);
					if(video!=false){
						game.addVideo('smoothAvatar',this,vice);
					}
				},
				changeSeat:function(position,video){
					var player=this;
					if(video!==false) game.addVideo('changeSeat',player,position);
					var rect1=player.getBoundingClientRect();
					player.style.transition='all 0s';
					ui.refresh(player);
					player.dataset.position=position;
					var rect2=player.getBoundingClientRect();
					var dx=rect1.left-rect2.left;
					var dy=rect1.top-rect2.top;
					if((game.chess||(player.dataset.position!=0&&position!=0))&&player.classList.contains('linked')){
						player.style.transform='rotate(-90deg) translate('+(-dy)+'px,'+(dx)+'px)';
					}
					else{
						player.style.transform='translate('+(dx)+'px,'+(dy)+'px)';
					}
					setTimeout(function(){
						player.style.transition='';
						ui.refresh(player);
						player.style.transform='';
					},100);
				},
				send:function(){
					if(!this.ws||this.ws.closed) return this;
					this.ws.send.apply(this.ws,arguments);
					return this;
				},
				getId:function(){
					if(_status.video||_status.connectMode) return this;
					if(this.playerid){
						delete game.playerMap[this.playerid];
					}
					this.playerid=get.id();
					game.playerMap[this.playerid]=this;
					return this;
				},
				throwEmotion:function(target,emotion){
					game.broadcastAll(function(player,target,emotion){
						player.$throwEmotion(target,emotion);
					},this,target,emotion);
				},
				emotion:function(pack,id){
					var str='<img src="##assetURL##image/emotion/'+pack+'/'+id+'.gif" width="50" height="50">';
					lib.element.player.say.call(this,str);
					game.broadcast(function(id,str){
						if(lib.playerOL[id]){
							lib.playerOL[id].say(str);
						}
						else if(game.connectPlayers){
							for(var i=0;i<game.connectPlayers.length;i++){
								if(game.connectPlayers[i].playerid==id){
									lib.element.player.say.call(game.connectPlayers[i],str);
									return;
								}
							}
						}
					},this.playerid,str);
				},
				chat:function(str){
					if(get.is.banWords(str)) return;
					lib.element.player.say.call(this,str);
					game.broadcast(function(id,str){
						if(lib.playerOL[id]){
							lib.playerOL[id].say(str);
						}
						else if(game.connectPlayers){
							for(var i=0;i<game.connectPlayers.length;i++){
								if(game.connectPlayers[i].playerid==id){
									lib.element.player.say.call(game.connectPlayers[i],str);
									return;
								}
							}
						}
					},this.playerid,str);
				},
				say:function(str){
					str=str.replace(/##assetURL##/g,lib.assetURL);
					var dialog=ui.create.dialog('hidden');
					dialog.classList.add('static');
					dialog.add('<div class="text" style="word-break:break-all;display:inline">'+str+'</div>');
					dialog.classList.add('popped');
					ui.window.appendChild(dialog);
					var width=dialog.content.firstChild.firstChild.offsetWidth;
					if(width<190){
						dialog._mod_height=-16;
					}
					else{
						dialog.content.firstChild.style.textAlign='left';
					}
					dialog.style.width=(width+16)+'px';
					var refnode;
					if(this.node&&this.node.avatar&&this.parentNode==ui.arena){
						refnode=this.node.avatar;
					}
					if(refnode){
						lib.placePoppedDialog(dialog,{
							clientX:(ui.arena.offsetLeft+this.getLeft()+refnode.offsetLeft+refnode.offsetWidth/2)*game.documentZoom,
							clientY:(ui.arena.offsetTop+this.getTop()+refnode.offsetTop+refnode.offsetHeight/4)*game.documentZoom
						});
					}
					else{
						lib.placePoppedDialog(dialog,{
							clientX:(this.getLeft()+this.offsetWidth/2)*game.documentZoom,
							clientY:(this.getTop()+this.offsetHeight/4)*game.documentZoom
						});
					}
					if(dialog._mod_height){
						dialog.content.firstChild.style.padding=0;
					}
					setTimeout(function(){
						dialog.delete();
					},lib.quickVoice.includes(str)?3800:2000);
					var name=get.translation(this.name);
					var info=[name?(name+'['+this.nickname+']'):this.nickname,str];
					lib.chatHistory.push(info);
					if(_status.addChatEntry){
						if(_status.addChatEntry._origin.parentNode){
							_status.addChatEntry(info,false);
						}
						else{
							delete _status.addChatEntry;
						}
					}
					if(lib.config.background_speak&&lib.quickVoice.includes(str)){
						game.playAudio('voice',(this.sex=='female'?'female':'male'),lib.quickVoice.indexOf(str));
					}
				},
				showGiveup:function(){
					this._giveUp=true;
					if(this==game.me){
						ui.create.giveup();
					}
					else if(this.isOnline2()){
						this.send(ui.create.giveup);
					}
				},
				applySkills:function(skills){
					for(var i in skills){
						if(i=='global'){
							lib.skill.global=skills[i];
						}
						//else if(i=='skillinfo'){
						//	for(var j in skills[i]){
						//		if(!lib.skill[j]){
						//			lib.skill[j]={};
						//		}
						//		lib.skill[j].chooseButton=skills[i][j];
						//	}
						//}
						else if(i=='stat'){
							this.stat=[skills.stat];
						}
						else if(lib.playerOL[i]){
							for(var j in skills[i]){
								lib.playerOL[i][j]=skills[i][j];
							}
						}
					}
				},
				getState:function(){
					var state={
						hp:this.hp,
						maxHp:this.maxHp,
						nickname:this.nickname,
						sex:this.sex,
						group:this.group,
						name:this.name,
						name1:this.name1,
						name2:this.name2,
						handcards:this.getCards('hs'),
						gaintag:[],
						equips:this.getCards('e'),
						judges:this.getCards('j'),
						specials:this.getCards('s'),
						expansions:this.getCards('x'),
						expansion_gaintag:[],
						disableJudge:this.isDisabledJudge(),
						disabledSlots:this.disabledSlots,
						expandedSlots:this.expandedSlots,
						views:[],
						position:parseInt(this.dataset.position),
						hujia:this.hujia,
						side:this.side,
						identityShown:this.identityShown,
						identityNode:[this.node.identity.innerHTML,this.node.identity.dataset.color],
						identity:this.identity,
						dead:this.isDead(),
						linked:this.isLinked(),
						turnedover:this.isTurnedOver(),
						out:this.isOut(),
						phaseNumber:this.phaseNumber,
						unseen:this.isUnseen(0),
						unseen2:this.isUnseen(1),
						seatNum:this.seatNum,
					}
					for(var i=0;i<state.judges.length;i++){
						state.views[i]=state.judges[i].viewAs;
					}
					for(var i=0;i<state.handcards.length;i++){
						state.gaintag[i]=state.handcards[i].gaintag;
					}
					for(var i=0;i<state.expansions.length;i++){
						state.expansion_gaintag[i]=state.expansions[i].gaintag;
					}
					if(this.getModeState){
						state.mode=this.getModeState();
					}
					return state;
				},
				setNickname:function(str){
					this.node.nameol.innerHTML=(str||this.nickname||'').slice(0,12);
					return this;
				},
				setAvatar:function(name,name2,video,fakeme){
					var node;
					if(this.name2==name){
						node=this.node.avatar2;
						this.smoothAvatar(true,video);
					}
					else if(this.name==name){
						node=this.node.avatar;
						this.smoothAvatar(false,video);
					}
					if(node){
						node.setBackground(name2,'character');
						if(this==game.me&&ui.fakeme&&fakeme!==false){
							ui.fakeme.style.backgroundImage=node.style.backgroundImage;
						}
						if(video!=false){
							game.addVideo('setAvatar',this,[name,name2]);
						}
					}
					game.broadcast(function(player,name,name2){
						player.setAvatar(name,name2,false);
					},this,name,name2);
				},
				setAvatarQueue:function(name, list){
					var node;
					var player=this;
					if(player.name2==name){
						node=player.node.avatar2;
					}
					else{
						node=player.node.avatar;
					}
					if(node._avatarqueue){
						for(var i=0;i<list.length;i++){
							node._avatarqueue.push(list[i]);
						}
					}
					else{
						var func=function(){
							if(node._avatarqueue.length){
								player.setAvatar(name,node._avatarqueue.shift(),false,false);
							}
							else{
								clearInterval(node._avatarqueueinterval);
								delete node._avatarqueue;
								delete node._avatarqueueinterval;
								player.setAvatar(name,name,false,false);
							}
						};
						node._avatarqueue=list.slice(0);
						node._avatarqueueinterval=setInterval(func,1000);
						func();
					}
					game.addVideo('setAvatarQueue',this,[name,list]);
				},
				flashAvatar:function(skill,name){
					if(lib.skill[name]&&!lib.character[name]){
						var stop=false;
						var list=lib.config.all.characters.slice(0);
						for(var i in lib.characterPack){
							list.add(i);
						}
						for(var i=0;i<list.length;i++){
							for(var j in lib.characterPack[list[i]]){
								if(lib.characterPack[list[i]][j][3].contains(name)){
									name=j;
									stop=true;
									break;
								}
							}
							if(stop){
								break;
							}
						}
					}
					if(lib.character[this.name2]&&lib.character[this.name2][3].contains(skill)){
						this.setAvatarQueue(this.name2,[name]);
					}
					else{
						this.setAvatarQueue(this.name,[name]);
					}
				},
				update:function(){
					if(_status.video&&arguments.length==0) return;
					if(this.hp>=this.maxHp) this.hp=this.maxHp;
					var hp=this.node.hp;
					hp.style.transition='none';
					game.broadcast(function(player,hp,maxHp,hujia){
						player.hp=hp;
						player.maxHp=maxHp;
						player.hujia=hujia;
						player.update();
					},this,this.hp,this.maxHp,this.hujia);
					if(!_status.video){
						if(this.hujia){
							this.markSkill('ghujia');
						}
						else{
							this.unmarkSkill('ghujia');
						}
					}
					if(!this.storage.nohp){
						if(this.maxHp==Infinity){
							hp.innerHTML='∞';
						}
						else if(game.layout=='default'&&this.maxHp>14){
							hp.innerHTML=this.hp+'/'+this.maxHp;
							hp.classList.add('text');
						}
						else if(get.is.newLayout()&&
						(
							this.maxHp>9||
							(this.maxHp>5&&this.classList.contains('minskin'))||
							((game.layout=='mobile'||game.layout=='long')&&this.dataset.position==0&&this.maxHp>7)
						)){
							hp.innerHTML=this.hp+'<br>/<br>'+this.maxHp+'<div></div>';
							if(this.hp==0){
								hp.lastChild.classList.add('lost');
							}
							hp.classList.add('textstyle');
							// hp.classList.remove('long');
						}
						else{
							hp.innerHTML='';
							hp.classList.remove('text');
							hp.classList.remove('textstyle');
							while(this.maxHp>hp.childNodes.length){
								ui.create.div(hp);
							}
							while(Math.max(0,this.maxHp)<hp.childNodes.length){
								hp.removeChild(hp.lastChild);
							}
							for(var i=0;i<this.maxHp;i++){
								var index=i;
								if(get.is.newLayout()){
									index=this.maxHp-i-1;
								}
								if(i<this.hp){
									hp.childNodes[index].classList.remove('lost');
								}
								else{
									hp.childNodes[index].classList.add('lost');
								}
							}
							// if(this.maxHp==9){
							// 	hp.classList.add('long');
							// }
							// else{
							// 	hp.classList.remove('long');
							// }
						}
						if(hp.classList.contains('room')){
							hp.dataset.condition='high';
						}
						else if(this.hp==0){
							hp.dataset.condition='';
						}
						else if(this.hp>Math.round(this.maxHp/2)||this.hp===this.maxHp){
							hp.dataset.condition='high';
						}
						else if(this.hp>Math.floor(this.maxHp/3)){
							hp.dataset.condition='mid';
						}
						else{
							hp.dataset.condition='low';
						}
	
						setTimeout(function(){
							hp.style.transition='';
						});
					}
					var numh=this.countCards('h');
					if(_status.video){
						numh=arguments[0];
					}
					if(numh>=10){
						numh=numh.toString();
						this.node.count.dataset.condition='low';
						this.node.count.innerHTML=numh[0]+'<br>'+numh[1];
					}
					else{
						if(numh>5){
							this.node.count.dataset.condition='higher';
						}
						else if(numh>2){
							this.node.count.dataset.condition='high';
						}
						else if(numh>0){
							this.node.count.dataset.condition='mid';
						}
						else{
							this.node.count.dataset.condition='none';
						}
						this.node.count.innerHTML=numh;
					}
					if(this.updates){
						for(var i=0;i<lib.element.player.updates.length;i++){
							lib.element.player.updates[i](this);
						}
					}
					if(!_status.video){
						game.addVideo('update',this,[this.countCards('h'),this.hp,this.maxHp,this.hujia]);
					}
					this.updateMarks();
					return this;
				},
				clearMark:function(i,log){
					let num=this.countMark(i);
					if(num>0) this.removeMark(i,num,log)
				},
				removeMark:function(i,num,log){
					if(typeof num!='number'||!num) num=1;
					if(typeof this.storage[i]!='number'||!this.storage[i]) return;
					if(num>this.storage[i]) num=this.storage[i];
					this.storage[i]-=num;
					if(log!==false){
						var str=false;
						var info=get.info(i);
						if(info&&info.intro&&(info.intro.name||info.intro.name2)) str=info.intro.name2||info.intro.name;
						else str=lib.translate[i];
						if(str) game.log(this,'移去了',get.cnNumber(num),'个','#g【'+str+'】');
					}
					this.syncStorage(i);
					this[(this.storage[i]||(lib.skill[i]&&lib.skill[i].mark))?'markSkill':'unmarkSkill'](i);
				},
				addMark:function(i,num,log){
					if(typeof num!='number'||!num) num=1;
					if(typeof this.storage[i]!='number') this.storage[i]=0;
					this.storage[i]+=num;
					if(log!==false){
						var str=false;
						var info=get.info(i);
						if(info&&info.intro&&(info.intro.name||info.intro.name2)) str=info.intro.name2||info.intro.name;
						else str=lib.translate[i];
						if(str) game.log(this,'获得了',get.cnNumber(num),'个','#g【'+str+'】');
					}
					this.syncStorage(i);
					this.markSkill(i);
				},
				countMark:function(i){
					if(this.storage[i]==undefined) return 0;
					if(typeof this.storage[i]=='number') return this.storage[i];
					if(Array.isArray(this.storage[i])) return this.storage[i].length;
					return 0;
				},
				hasMark:function(i){
					return this.countMark(i)>0;
				},
				updateMark:function(i,storage){
					if(!this.marks[i]){
						if(lib.skill[i]&&lib.skill[i].intro&&(this.storage[i]||lib.skill[i].intro.markcount)){
							this.markSkill(i);
							if(!this.marks[i]) return this;
						}
						else{
							return this;
						}
					}
					if(storage&&this.storage[i]){
						this.syncStorage(i);
					}
					if(i=='ghujia'||((!this.marks[i].querySelector('.image')||this.storage[i+'_markcount'])&&
						lib.skill[i]&&lib.skill[i].intro&&!lib.skill[i].intro.nocount&&
						(this.storage[i]||this.storage[i+'_markcount']||lib.skill[i].intro.markcount))){
						this.marks[i].classList.add('overflowmark')
						var num=0;
						if(typeof lib.skill[i].intro.markcount=='function'){
							num=lib.skill[i].intro.markcount(this.storage[i],this);
						}
						else if(lib.skill[i].intro.markcount=='expansion'){
							num=this.countCards('x',(card)=>card.hasGaintag(i));
						}
						else if(typeof this.storage[i+'_markcount']=='number'){
							num=this.storage[i+'_markcount'];
						}
						else if(i=='ghujia'){
							num=this.hujia;
						}
						else if(typeof this.storage[i]=='number'){
							num=this.storage[i];
						}
						else if(Array.isArray(this.storage[i])){
							num=this.storage[i].length;
						}
						if(num){
							if(!this.marks[i].markcount){
								this.marks[i].markcount=ui.create.div('.markcount.menubutton',this.marks[i]);
							}
							this.marks[i].markcount.innerHTML=num;
						}
						else if(this.marks[i].markcount){
							this.marks[i].markcount.delete();
							delete this.marks[i].markcount;
						}
					}
					else{
						if(this.marks[i].markcount){
							this.marks[i].markcount.delete();
							delete this.marks[i].markcount;
						}
						if(lib.skill[i].mark=='auto'){
							this.unmarkSkill(i);
						}
					}
					return this;
				},
				updateMarks:function(connect){
					if(typeof connect=='string'&&_status.connectMode&&!game.online){
						game.broadcast(function(player,storage,skill){
							player.storage[skill]=storage;
							player.updateMarks();
						},this,this.storage[connect],connect);
					}
					for(var i in this.marks){
						this.updateMark(i);
					}
				},
				num:function(arg1,arg2,arg3){
					if(get.itemtype(arg1)=='position'){
						return this.get(arg1,arg2,arg3).length;
					}
					else if(arg1=='s'){
						if(typeof arg2=='boolean'){
							return game.expandSkills(this.getSkills(arg2).concat(lib.skill.global)).contains(arg3);
						}
						else{
							return game.expandSkills(this.getSkills().concat(lib.skill.global)).contains(arg2);
						}
					}
				},
				line:function(target,config){
					if(get.itemtype(target)=='players'){
						for(var i=0;i<target.length;i++){
							this.line(target[i],config);
						}
					}
					else if(get.itemtype(target)=='player'){
						if(target==this) return;
						game.broadcast(function(player,target,config){
							player.line(target,config);
						},this,target,config);
						game.addVideo('line',this,[target.dataset.position,config]);
						game.linexy([
							this.getLeft()+this.offsetWidth/2,
							this.getTop()+this.offsetHeight/2,
							target.getLeft()+target.offsetWidth/2,
							target.getTop()+target.offsetHeight/2
						],config,true);
					}
				},
				line2:function(targets,config){
					this.line(targets[0],config);
					targets=targets.slice(0);
					for(var i=1;i<targets.length;i++){
						(function(j){
							setTimeout(function(){
								targets[j-1].line(targets[j],config);
							},lib.config.duration*i);
						}(i));
					}
				},
				getNext:function(){
					if(this.hasSkill('undist')) return null;
					var target=this;
					for(var i=0;i<game.players.length-1;i++){
						target=target.next;
						if(!target.hasSkill('undist')){
							return target;
						}
					}
					return null;
				},
				getPrevious:function(){
					if(this.hasSkill('undist')) return null;
					var target=this;
					for(var i=0;i<game.players.length-1;i++){
						target=target.previous;
						if(!target.hasSkill('undist')){
							return target;
						}
					}
					return null;
				},
				countUsed:function(card,type){
					if(type===true){
						var num=0;
						var history=this.getHistory('useCard');
						for(var i=0;i<history.length;i++){
							if(!card) num++;
							else if(typeof card=='string'&&history[i].card&&card==history[i].card.name) num++;
							else if(typeof card=='object'&&history[i].card&&card.name==history[i].card.name) num++;
						}
						return num;
					}
					var num;
					var stat=this.getStat('card');
					if(!card){
						num=0;
						for(var i in stat){
							if(typeof stat[i]=='number') num+=stat[i];
						}
						return num;
					}
					if(typeof card=='object'){
						card=card.name;
					}
					num=stat[card];
					if(typeof num!='number') return 0;
					return num;
				},
				countSkill:function(skill){
					var num=this.getStat('skill')[skill];
					if(num==undefined) return 0;
					return num;
				},
				getStockSkills:function(unowned,unique,hidden){
					var list=[];
					if(lib.character[this.name]&&(hidden||!this.isUnseen(0))){
						list.addArray(lib.character[this.name][3]);
					}
					if(lib.character[this.name1]&&(hidden||!this.isUnseen(0))){
						list.addArray(lib.character[this.name1][3]);
					}
					if(lib.character[this.name2]&&(hidden||!this.isUnseen(1))){
						list.addArray(lib.character[this.name2][3]);
					}
					if(!unowned){
						for(var i=0;i<list.length;i++){
							if(!this.hasSkill(list[i])){
								list.splice(i--,1);
							}
						}
					}
					if(!unique){
						for(var i=0;i<list.length;i++){
							var info=lib.skill[list[i]];
							if(!info||info.unique||info.temp||info.sub||info.charlotte){
								list.splice(i--,1);
							}
						}
					}
					return list;
				},
				getCards:function(arg1,arg2){
					if(typeof arg1!='string'){
						arg1='h';
					}
					var cards=[],cards1=[];
					var i,j;
					for(i=0;i<arg1.length;i++){
						if(arg1[i]=='h'){
							for(j=0;j<this.node.handcards1.childElementCount;j++){
								if(!this.node.handcards1.childNodes[j].classList.contains('removing')&&!this.node.handcards1.childNodes[j].classList.contains('glows')){
									cards.push(this.node.handcards1.childNodes[j]);
								}
							}
							for(j=0;j<this.node.handcards2.childElementCount;j++){
								if(!this.node.handcards2.childNodes[j].classList.contains('removing')&&!this.node.handcards2.childNodes[j].classList.contains('glows')){
									cards.push(this.node.handcards2.childNodes[j]);
								}
							}
						}
						else if(arg1[i]=='s'){
							for(j=0;j<this.node.handcards1.childElementCount;j++){
								if(!this.node.handcards1.childNodes[j].classList.contains('removing')&&this.node.handcards1.childNodes[j].classList.contains('glows')){
									cards.push(this.node.handcards1.childNodes[j]);
								}
							}
							for(j=0;j<this.node.handcards2.childElementCount;j++){
								if(!this.node.handcards2.childNodes[j].classList.contains('removing')&&this.node.handcards2.childNodes[j].classList.contains('glows')){
									cards.push(this.node.handcards2.childNodes[j]);
								}
							}
						}
						else if(arg1[i]=='e'){
							for(j=0;j<this.node.equips.childElementCount;j++){
								if(!this.node.equips.childNodes[j].classList.contains('removing')&&!this.node.equips.childNodes[j].classList.contains('feichu')){
									cards.push(this.node.equips.childNodes[j]);
								}
							}
						}
						else if(arg1[i]=='j'){
							for(j=0;j<this.node.judges.childElementCount;j++){
								if(!this.node.judges.childNodes[j].classList.contains('removing')&&!this.node.judges.childNodes[j].classList.contains('feichu')){
									cards.push(this.node.judges.childNodes[j]);
									if(this.node.judges.childNodes[j].viewAs&&arguments.length>1){
										this.node.judges.childNodes[j].tempJudge=this.node.judges.childNodes[j].name;
										this.node.judges.childNodes[j].name=this.node.judges.childNodes[j].viewAs;
										cards1.push(this.node.judges.childNodes[j]);
									}
								}
							}
						}
						else if(arg1[i]=='x'){
							for(j=0;j<this.node.expansions.childElementCount;j++){
								if(!this.node.expansions.childNodes[j].classList.contains('removing')){
									cards.push(this.node.expansions.childNodes[j]);
								}
							}
						}
					}
					if(arguments.length==1){
						return cards;
					}
					if(arg2){
						if(typeof arg2=='string'){
							for(i=0;i<cards.length;i++){
								if(get.name(cards[i])!=arg2){
									cards.splice(i,1);i--;
								}
							}
						}
						else if(typeof arg2=='object'){
							for(i=0;i<cards.length;i++){
								for(j in arg2){
									var value;
									if(j=='type'||j=='subtype'||j=='color'||j=='suit'||j=='number'){
										value=get[j](cards[i]);
									}
									else{
										value=cards[i][j];
									}
									if((typeof arg2[j]=='string'&&value!=arg2[j])||
										(Array.isArray(arg2[j])&&!arg2[j].contains(value))){
										cards.splice(i--,1);break;
									}
								}
							}
						}
						else if(typeof arg2=='function'){
							for(i=0;i<cards.length;i++){
								if(!arg2(cards[i])){
									cards.splice(i--,1);
								}
							}
						}
					}
					for(i=0;i<cards1.length;i++){
						if(cards1[i].tempJudge){
							cards1[i].name=cards1[i].tempJudge;
							delete cards1[i].tempJudge;
						}
					}
					return cards;
				},
				getDiscardableCards:function(player,arg1,arg2){
					var cards=this.getCards(arg1,arg2);
					for(var i=0;i<cards.length;i++){
						if(!lib.filter.canBeDiscarded(cards[i],player,this)){
							cards.splice(i--,1);
						}
					}
					return cards;
				},
				getGainableCards:function(player,arg1,arg2){
					var cards=this.getCards(arg1,arg2);
					for(var i=0;i<cards.length;i++){
						if(!lib.filter.canBeGained(cards[i],player,this)){
							cards.splice(i--,1);
						}
					}
					return cards;
				},
				getGainableSkills:function(func){
					var list=[];
					var names=[this.name,this.name1,this.name2];
					for(var i=0;i<names.length;i++){
						list.addArray(get.gainableSkillsName(names[i],func));
					}
					return list;
				},
				countCards:function(arg1,arg2){
					return this.getCards(arg1,arg2).length;
				},
				countDiscardableCards:function(player,arg1,arg2){
					return this.getDiscardableCards(player,arg1,arg2).length;
				},
				countGainableCards:function(player,arg1,arg2){
					return this.getGainableCards(player,arg1,arg2).length;
				},
				getOriginalSkills:function(){
					var skills=[];
					if(lib.character[this.name]&&!this.isUnseen(0)){
						skills.addArray(lib.character[this.name][3]);
					}
					if(this.name2&&lib.character[this.name2]&&!this.isUnseen(1)){
						skills.addArray(lib.character[this.name2][3]);
					}
					return skills;
				},
				getSkills:function(arg2,arg3,arg4){
					var skills=this.skills.slice(0);
					var es=[];
					var i,j;
					if(arg3!==false){
						for(i=0;i<this.node.equips.childElementCount;i++){
							if(!this.node.equips.childNodes[i].classList.contains('removing')){
								var equipskills=get.info(this.node.equips.childNodes[i],false).skills;
								if(equipskills){
									es.addArray(equipskills);
								}
							}
						}
						if(arg2=='e'){
							return es;
						}
					}
					for(var i in this.additionalSkills){
						if(Array.isArray(this.additionalSkills[i])&&(arg2||i.indexOf('hidden:')!==0)){
							for(j=0;j<this.additionalSkills[i].length;j++){
								if(this.additionalSkills[i][j]){
									skills.add(this.additionalSkills[i][j]);
								}
							}
						}
						else if(this.additionalSkills[i]&&typeof this.additionalSkills[i]=='string'){
							skills.add(this.additionalSkills[i]);
						}
					}
					for(var i in this.tempSkills){
						skills.add(i);
					}
					if(arg2) skills.addArray(this.hiddenSkills);
					if(arg2===false||arg2=='invisible') skills.addArray(this.invisibleSkills);
					if(arg3!==false) skills.addArray(es);
					for(var i in this.forbiddenSkills){
						skills.remove(i);
					}
					if(arg4!==false){
						skills=game.filterSkills(skills,this,es);
					}
					return skills;
				},
				get:function(arg1,arg2,arg3,arg4){
					var i,j;
					if(arg1=='s'){
						var skills=this.skills.slice(0);
						var es=[];
						if(arg3!==false){
							for(i=0;i<this.node.equips.childElementCount;i++){
								if(!this.node.equips.childNodes[i].classList.contains('removing')&&!this.node.equips.childNodes[i].classList.contains('feichu')){
									var equipskills=get.info(this.node.equips.childNodes[i]).skills;
									if(equipskills){
										es.addArray(equipskills);
									}
								}
							}
							if(arg2=='e'){
								return es;
							}
						}
						for(var i in this.additionalSkills){
							if(Array.isArray(this.additionalSkills[i])){
								for(j=0;j<this.additionalSkills[i].length;j++){
									if(this.additionalSkills[i][j]){
										skills.add(this.additionalSkills[i][j]);
									}
								}
							}
							else if(this.additionalSkills[i]&&typeof this.additionalSkills[i]=='string'){
								skills.add(this.additionalSkills[i]);
							}
						}
						for(var i in this.tempSkills){
							skills.add(i);
						}
						if(arg2) skills.addArray(this.hiddenSkills);
						if(arg3!==false) skills.addArray(es);
						for(var i in this.forbiddenSkills){
							skills.remove(i);
						}
						if(arg4!==false){
							skills=game.filterSkills(skills,this,es);
						}
						return skills;
					}
					else if(get.is.pos(arg1)){
						var cards=[],cards1=[];
						for(i=0;i<arg1.length;i++){
							if(arg1[i]=='h'){
								for(j=0;j<this.node.handcards1.childElementCount;j++){
									if(!this.node.handcards1.childNodes[j].classList.contains('removing')&&!this.node.handcards1.childNodes[j].classList.contains('feichu')&&!this.node.handcards1.childNodes[j].classList.contains('glows')){
										cards.push(this.node.handcards1.childNodes[j]);
									}
								}
								for(j=0;j<this.node.handcards2.childElementCount;j++){
									if(!this.node.handcards2.childNodes[j].classList.contains('removing')&&!this.node.handcards2.childNodes[j].classList.contains('feichu')&&!this.node.handcards2.childNodes[j].classList.contains('glows')){
										cards.push(this.node.handcards2.childNodes[j]);
									}
								}
							}
							else if(arg1[i]=='e'){
								for(j=0;j<this.node.equips.childElementCount;j++){
									if(!this.node.equips.childNodes[j].classList.contains('removing')&&!this.node.equips.childNodes[j].classList.contains('feichu')){
										cards.push(this.node.equips.childNodes[j]);
									}
								}
								if(arguments.length==2&&typeof arg2=='string'&&/1|2|3|4|5/.test(arg2)){
									for(j=0;j<cards.length;j++){
										if(get.subtype(cards[j])=='equip'+arg2) return cards[j];
									}
									return;
								}
							}
							else if(arg1[i]=='j'){
								for(j=0;j<this.node.judges.childElementCount;j++){
									if(!this.node.judges.childNodes[j].classList.contains('removing')&&!this.node.judges.childNodes[j].classList.contains('feichu')){
										cards.push(this.node.judges.childNodes[j]);
										if(this.node.judges.childNodes[j].viewAs&&arguments.length>1){
											this.node.judges.childNodes[j].tempJudge=this.node.judges.childNodes[j].name;
											this.node.judges.childNodes[j].name=this.node.judges.childNodes[j].viewAs;
											cards1.push(this.node.judges.childNodes[j]);
										}
									}
								}
							}
						}
						if(arguments.length==1){
							return cards;
						}
						if(arg2!=undefined){
							if(typeof arg3=='function'){
								var cards2=cards.slice(0);
								cards.sort(function(a,b){
									return arg3(b,cards2)-arg3(a,cards2);
								});
							}
							if(typeof arg2=='string'){
								for(i=0;i<cards.length;i++){
									if(cards[i].name!=arg2){
										cards.splice(i,1);i--;
									}
								}
							}
							else if(typeof arg2=='object'){
								for(i=0;i<cards.length;i++){
									for(j in arg2){
										if(j=='type'){
											if(typeof arg2[j]=='object'){
												if(arg2[j].contains(get.type(cards[i]))==false){
													cards.splice(i,1);i--;break;
												}
											}
											else if(typeof arg2[j]=='string'){
												if(get.type(cards[i])!=arg2[j]){
													cards.splice(i,1);i--;break;
												}
											}
										}
										else if(j=='subtype'){
											if(typeof arg2[j]=='object'){
												if(arg2[j].contains(get.subtype(cards[i]))==false){
													cards.splice(i,1);i--;break;
												}
											}
											else if(typeof arg2[j]=='string'){
												if(get.subtype(cards[i])!=arg2[j]){
													cards.splice(i,1);i--;break;
												}
											}
										}
										else if(j=='color'){
											if(typeof arg2[j]=='object'){
												if(arg2[j].contains(get.color(cards[i]))==false){
													cards.splice(i,1);i--;break;
												}
											}
											else if(typeof arg2[j]=='string'){
												if(get.color(cards[i])!=arg2[j]){
													cards.splice(i,1);i--;break;
												}
											}
										}
										else if(j=='suit'){
											if(typeof arg2[j]=='object'){
												if(arg2[j].contains(get.suit(cards[i]))==false){
													cards.splice(i,1);i--;break;
												}
											}
											else if(typeof arg2[j]=='string'){
												if(get.suit(cards[i])!=arg2[j]){
													cards.splice(i,1);i--;break;
												}
											}
										}
										else if(j=='number'){
											if(typeof arg2[j]=='object'){
												if(arg2[j].contains(get.number(cards[i]))==false){
													cards.splice(i,1);i--;break;
												}
											}
											else if(typeof arg2[j]=='string'){
												if(get.number(cards[i])!=arg2[j]){
													cards.splice(i,1);i--;break;
												}
											}
										}
										else if(typeof arg2[j]=='object'){
											if(arg2[j].contains(cards[i][j])==false){
												cards.splice(i,1);i--;break;
											}
										}
										else if(typeof arg2[j]=='string'){
											if(cards[i][j]!=arg2[j]){
												cards.splice(i,1);i--;break;
											}
										}
									}
								}
							}
							else if(typeof arg2=='number'&&arg2>0){
								cards.splice(arg2);
							}
							else if(typeof arg2=='function'){
								for(i=0;i<cards.length;i++){
									if(!arg2(cards[i])){
										cards.splice(i,1);i--;
									}
								}
							}
						}
						for(i=0;i<cards1.length;i++){
							if(cards1[i].tempJudge){
								cards1[i].name=cards1[i].tempJudge;
								delete cards1[i].tempJudge;
							}
						}
						if(arg2===0) return cards[0];
						if(typeof arg3=='number'){
							if(arg3==0) return cards[0];
							cards.splice(arg3);
						}
						if(typeof arg4=='number'){
							if(arg4==0) return cards[0];
							cards.splice(arg4);
						}
						return cards;
					}
				},
				syncStorage:function(skill){
					switch(get.itemtype(this.storage[skill])){
						case 'cards':game.addVideo('storage',this,[skill,get.cardsInfo(this.storage[skill]),'cards']);break;
						case 'card':game.addVideo('storage',this,[skill,get.cardInfo(this.storage[skill]),'card']);break;
						default:
						try{
							game.addVideo('storage',this,[skill,JSON.parse(JSON.stringify(this.storage[skill]))]);
						}
						catch(e){
							console.log(this.storage[skill]);
						}
					}
				},
				syncSkills:function(){
					game.broadcast(function(player,skills){
						player.applySkills(skills);
					},this,get.skillState(this));
				},
				playerfocus:function(time){
					time=time||1000;
					this.classList.add('playerfocus');
					ui.arena.classList.add('playerfocus');
					var that=this;
					setTimeout(function(){
						that.classList.remove('playerfocus');
						ui.arena.classList.remove('playerfocus');
					},time);
					game.addVideo('playerfocus',this,time);
					game.broadcast(function(player,time){
						player.playerfocus(time);
					},this,time);
					return this;
				},
				setIdentity:function(identity,nature){
					if(!identity) identity=this.identity;
					if(get.is.jun(this)){
						this.node.identity.firstChild.innerHTML='君';
					}
					else{
						this.node.identity.firstChild.innerHTML=get.translation(identity);
					}
					this.node.identity.dataset.color=nature||identity;
					return this;
				},
				insertPhase:function(skill,insert){
					var evt=_status.event.getParent('phase');
					var next;
					if(evt&&evt.parent&&evt.parent.next){
						evt=evt.parent;
						next=game.createEvent('phase',null,evt);
					}
					else if(_status.event.parent&&_status.event.parent.next){
						evt=_status.event.parent;
						next=game.createEvent('phase',null,evt);
					}
					else{
						evt=null;
						next=game.createEvent('phase');
					}
					if(evt&&insert&&evt.next.contains(next)){
						evt.next.remove(next);
						evt.next.unshift(next);
					}
					next.player=this;
					next.skill=skill||_status.event.name;
					next.setContent('phase');
					return next;
				},
				insertEvent:function(name,content,arg){
					var evt=_status.event.getParent('phase');
					var next;
					if(evt&&evt.parent&&evt.parent.next){
						next=game.createEvent(name,null,evt.parent);
					}
					else{
						next=game.createEvent(name);
					}
					for(var i in arg){
						next[i]=arg[i];
					}
					next.player=this;
					next.setContent(content);
					return next;
				},
				phase:function(skill){
					var next=game.createEvent('phase');
					next.player=this;
					next.setContent('phase');
					if(!_status.roundStart){
						_status.roundStart=this;
					}
					if(skill){
						next.skill=skill;
					}
					return next;
				},
				phaseZhunbei:function(){
					var next=game.createEvent('phaseZhunbei');
					next.player=this;
					next.setContent('phaseZhunbei');
					return next;
				},
				phaseJudge:function(){
					var next=game.createEvent('phaseJudge');
					next.player=this;
					next.setContent('phaseJudge');
					return next;
				},
				phaseDraw:function(){
					var next=game.createEvent('phaseDraw');
					next.player=this;
					next.num=2;
					if((get.config('first_less')||_status.connectMode||_status.first_less_forced)&&game.phaseNumber==1&&_status.first_less){
						next.num--;
					}
					next.setContent('phaseDraw');
					return next;
				},
				phaseUse:function(){
					var next=game.createEvent('phaseUse');
					next.player=this;
					next.setContent('phaseUse');
					return next;
				},
				phaseDiscard:function(){
					var next=game.createEvent('phaseDiscard');
					next.player=this;
					next.setContent('phaseDiscard');
					return next;
				},
				phaseJieshu:function(){
					var next=game.createEvent('phaseJieshu');
					next.player=this;
					next.setContent('phaseJieshu');
					return next;
				},
				chooseToUse:function(use){
					var next=game.createEvent('chooseToUse');
					next.player=this;
					if(arguments.length==1&&get.objtype(arguments[0])=='object'){
						for(var i in use){
							next[i]=use[i];
						}
					}
					else{
						for(var i=0;i<arguments.length;i++){
							if(typeof arguments[i]=='number'||get.itemtype(arguments[i])=='select'){
								next.selectTarget=arguments[i];
							}
							else if((typeof arguments[i]=='object'&&arguments[i])||typeof arguments[i]=='function'){
								if(get.itemtype(arguments[i])=='player'||next.filterCard){
									next.filterTarget=arguments[i];
								}
								else next.filterCard=arguments[i];
							}
							else if(typeof arguments[i]=='boolean'){
								next.forced=arguments[i];
							}
							else if(typeof arguments[i]=='string'){
								next.prompt=arguments[i];
							}
						}
					}
					if(typeof next.filterCard=='object'){
						next.filterCard=get.filter(next.filterCard);
					}
					if(typeof next.filterTarget=='object'){
						next.filterTarget=get.filter(next.filterTarget,2);
					}
					if(next.filterCard==undefined){
						next.filterCard=lib.filter.filterCard;
					}
					if(next.selectCard==undefined){
						next.selectCard=[1,1];
					}
					if(next.filterTarget==undefined){
						next.filterTarget=lib.filter.filterTarget;
					}
					if(next.selectTarget==undefined){
						next.selectTarget=lib.filter.selectTarget;
					}
					if(next.position==undefined){
						next.position='hs';
					}
					if(next.ai1==undefined) next.ai1=get.order;
					if(next.ai2==undefined) next.ai2=get.effect_use;
					next.setContent('chooseToUse');
					next._args=Array.from(arguments);
					return next;
				},
				chooseToRespond:function(){
					var next=game.createEvent('chooseToRespond');
					next.player=this;
					var filter;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='number'){
							next.selectCard=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectCard=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='position'){
							next.position=arguments[i];
						}
						else if(typeof arguments[i]=='function'){
							if(next.filterCard) next.ai=arguments[i];
							else next.filterCard=arguments[i];
						}
						else if(typeof arguments[i]=='object'&&arguments[i]){
							next.filterCard=get.filter(arguments[i]);
							filter=arguments[i];
						}
						else if(arguments[i]=='nosource'){
							next.nosource=true;
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
					}
					if(next.filterCard==undefined) next.filterCard=lib.filter.all;
					if(next.selectCard==undefined) next.selectCard=[1,1];
					if(next.source==undefined&&!next.nosource) next.source=_status.event.player;
					if(next.ai==undefined) next.ai=get.unuseful2;
					if(next.prompt!=false){
						if(typeof next.prompt=='string'){
							//next.dialog=next.prompt;
						}
						else{
							var str='请打出'+get.cnNumber(next.selectCard[0])+'张'
							if(filter){
								if(filter.name){
									str+=get.translation(filter.name);
								}
								else{
									str+='牌';
								}
							}
							else{
								str+='牌';
							}
							if(_status.event.getParent().name=='useCard'){
								var cardname=_status.event.name;
								if(lib.card[cardname]&&lib.translate[cardname]){
									str+='响应'+lib.translate[cardname];
								}
							}
							next.prompt=str;
						}
					}
					next.position='hs';
					if(next.ai2==undefined) next.ai2=(()=>1);
					next.setContent('chooseToRespond');
					next._args=Array.from(arguments);
					return next;
				},
				chooseToDiscard:function(){
					var next=game.createEvent('chooseToDiscard');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='number'){
							next.selectCard=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectCard=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='dialog'){
							next.dialog=arguments[i];
							next.prompt=false;
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='position'){
							next.position=arguments[i];
						}
						else if(typeof arguments[i]=='function'){
							if(next.filterCard) next.ai=arguments[i];
							else next.filterCard=arguments[i];
						}
						else if(typeof arguments[i]=='object'&&arguments[i]){
							next.filterCard=get.filter(arguments[i]);
						}
						else if(typeof arguments[i]=='string'){
							get.evtprompt(next,arguments[i]);
						}
						if(arguments[i]===null){
							for(var i=0;i<arguments.length;i++){
								console.log(arguments[i]);
							}
						}
					}
					if(next.isMine()==false&&next.dialog) next.dialog.style.display='none';
					if(next.filterCard==undefined) next.filterCard=lib.filter.all;
					if(next.selectCard==undefined) next.selectCard=[1,1];
					if(next.ai==undefined) next.ai=get.unuseful;
					next.autochoose=function(){
						if(!this.forced) return false;
						if(typeof this.selectCard=='function') return false;
						var cards=this.player.getCards(this.position);
						var num=cards.length;
						for(var i=0;i<cards.length;i++){
							if(!lib.filter.cardDiscardable(cards[i],this.player,this)) num--;
						}
						return get.select(this.selectCard)[0]>=num;
					}
					next.setContent('chooseToDiscard');
					next._args=Array.from(arguments);
					return next;
				},
				chooseToCompare:function(target,check){
					var next=game.createEvent('chooseToCompare');
					next.player=this;
					if(Array.isArray(target)){
						next.targets=target;
						if(check) next.ai=check;
						else next.ai=function(card){
							if(typeof card=='string'&&lib.skill[card]){
								var ais=lib.skill[card].check||function(){return 0};
								return ais();
							}
							var addi=(get.value(card)>=8&&get.type(card)!='equip')?-3:0;
							if(card.name=='du') addi-=3;
							var source=_status.event.source;
							var player=_status.event.player;
							var event=_status.event.getParent();
							var getn=function(card){
								if(player.hasSkill('tianbian')&&get.suit(card)=='heart') return 13*(Boolean(event.small)?-1:1);
								return get.number(card)*(Boolean(event.small)?-1:1);
							}
							if(source&&source!=player){
								if(get.attitude(player,source)>1){
									if(Boolean(event.small)) return getn(card)-get.value(card)/2+addi;
									return -getn(card)-get.value(card)/2+addi;
								}
								if(Boolean(event.small)) return -getn(card)-get.value(card)/2+addi;
								return getn(card)-get.value(card)/2+addi;
							}
							else{
								if(Boolean(event.small)) return -getn(card)-get.value(card)/2+addi;
								return getn(card)-get.value(card)/2+addi;
							}
						}
						next.setContent('chooseToCompareMultiple');
					}
					else{
						next.target=target;
						if(check) next.ai=check;
						else next.ai=function(card){
							if(typeof card=='string'&&lib.skill[card]){
								var ais=lib.skill[card].check||function(){return 0};
								return ais();
							}
							var player=get.owner(card);
							var getn=function(card){
								if(player.hasSkill('tianbian')&&get.suit(card)=='heart') return 13;
								return get.number(card);
							}
							var event=_status.event.getParent();
							var to=(player==event.player?event.target:event.player);
							var addi=(get.value(card)>=8&&get.type(card)!='equip')?-6:0;
							if(card.name=='du') addi-=5;
							if(player==event.player){
								if(Boolean(event.small)){
									return -getn(card)-get.value(card)/2+addi;
								}
								return getn(card)-get.value(card)/2+addi;
							}
							else{
								if((get.attitude(player,to)<=0)==Boolean(event.small)){
									return -getn(card)-get.value(card)/2+addi;
								}
								return getn(card)-get.value(card)/2+addi;
							}
						}
						next.setContent('chooseToCompare');
					}
					next.forceDie=true;
					next._args=Array.from(arguments);
					return next;
				},
				chooseSkill:function(target){
					var next=game.createEvent('chooseSkill');
					next.player=this;
					next.setContent('chooseSkill');
					next.target=target;
					for(var i=1;i<arguments.length;i++){
						if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
						else if(typeof arguments[i]=='function'){
							next.func=arguments[i];
						}
					}
				},
				discoverCard:function(list){
					var next=game.createEvent('discoverCard');
					next.player=this;
					next.setContent('discoverCard');
					next.list=list||lib.inpile.slice(0);
					next.forced=true;
					for(var i=1;i<arguments.length;i++){
						if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							switch(arguments[i]){
								case 'use': next.use=true; break;
								case 'nogain': next.nogain=true; break;
								default: next.prompt=arguments[i];
							}
						}
						else if(typeof arguments[i]=='number'){
							next.num=arguments[i];
						}
						else if(typeof arguments[i]==='function'){
							next.ai=arguments[i];
						}
					}
					return next;
				},
				chooseCardButton:function(){
					var cards,prompt,forced,select;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='cards') cards=arguments[i];
						else if(typeof arguments[i]=='boolean') forced=arguments[i];
						else if(typeof arguments[i]=='string') prompt=arguments[i];
						else if(get.itemtype(arguments[i])=='select'||typeof arguments[i]=='number') select=arguments[i];
					}
					if(prompt==undefined) prompt='请选择卡牌';
					return this.chooseButton(forced,select,'hidden',[prompt,cards,'hidden']);
				},
				chooseVCardButton:function(){
					var list,prompt,forced,select,notype=false;
					for(var i=0;i<arguments.length;i++){
						if(Array.isArray(arguments[i])){
							list=arguments[i];
						}
						else if(arguments[i]=='notype'){
							notype=true;
						}
						else if(typeof arguments[i]=='boolean') forced=arguments[i];
						else if(typeof arguments[i]=='string') prompt=arguments[i];
						else if(get.itemtype(arguments[i])=='select'||typeof arguments[i]=='number') select=arguments[i];
					}
					for(var i=0;i<list.length;i++){
						list[i]=[notype?'':(get.subtype(list[i])||get.type(list[i])),'',list[i]];
					}
					if(prompt==undefined) prompt='请选择卡牌';
					return this.chooseButton(forced,select,'hidden',[prompt,[list,'vcard'],'hidden']);
				},
				chooseButton:function(){
					var next=game.createEvent('chooseButton');
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='dialog'){
							next.dialog=arguments[i];
							next.closeDialog=true;
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectButton=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.selectButton=[arguments[i],arguments[i]];
						}
						else if(typeof arguments[i]=='function'){
							if(next.ai) next.filterButton=arguments[i];
							else next.ai=arguments[i];
						}
						else if(Array.isArray(arguments[i])){
							next.createDialog=arguments[i];
						}
					}
					next.player=this;
					if(typeof next.forced!='boolean') next.forced=false;
					if(next.isMine()==false&&next.dialog) next.dialog.style.display='none';
					if(next.filterButton==undefined) next.filterButton=lib.filter.filterButton;
					if(next.selectButton==undefined) next.selectButton=[1,1];
					if(next.ai==undefined) next.ai=function(){return 1};
					next.setContent('chooseButton');
					next._args=Array.from(arguments);
					next.forceDie=true;
					return next;
				},
				chooseButtonOL:function(list,callback,ai){
					var next=game.createEvent('chooseButtonOL');
					next.list=list;
					next.setContent('chooseButtonOL');
					next.ai=ai;
					next.callback=callback;
					next._args=Array.from(arguments);
					return next;
				},
				chooseCardOL:function(){
					var next=game.createEvent('chooseCardOL');
					next._args=[];
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='players'){
							next.list=arguments[i].slice(0);
						}
						else{
							next._args.push(arguments[i]);
						}
					}
					next.setContent('chooseCardOL');
					next._args.add('glow_result');
					return next;
				},
				chooseCard:function(choose){
					var next=game.createEvent('chooseCard');
					next.player=this;
					if(arguments.length==1&&get.is.object(choose)){
						for(var i in choose){
							next[i]=choose[i];
						}
					}
					else{
						for(var i=0;i<arguments.length;i++){
							if(typeof arguments[i]=='number'){
								next.selectCard=[arguments[i],arguments[i]];
							}
							else if(get.itemtype(arguments[i])=='select'){
								next.selectCard=arguments[i];
							}
							else if(typeof arguments[i]=='boolean'){
								next.forced=arguments[i];
							}
							else if(get.itemtype(arguments[i])=='position'){
								next.position=arguments[i];
							}
							else if(typeof arguments[i]=='function'){
								if(next.filterCard) next.ai=arguments[i];
								else next.filterCard=arguments[i];
							}
							else if(typeof arguments[i]=='object'&&arguments[i]){
								next.filterCard=get.filter(arguments[i]);
							}
							else if(arguments[i]=='glow_result'){
								next.glow_result=true;
							}
							else if(typeof arguments[i]=='string'){
								get.evtprompt(next,arguments[i]);
							}
						}
					}
					if(next.filterCard==undefined) next.filterCard=lib.filter.all;
					if(next.selectCard==undefined) next.selectCard=[1,1];
					if(next.ai==undefined) next.ai=get.unuseful3;
					next.setContent('chooseCard');
					next._args=Array.from(arguments);
					return next;
				},
				chooseUseTarget:function(){
					var next=game.createEvent('chooseUseTarget');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i].slice(0);
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.card=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='players'){
							next.targets=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='player'){
							next.targets=[arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectTarget=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.selectTarget=[arguments[i],arguments[i]];
						}
						else if(get.is.object(arguments[i])&&arguments[i].name){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							if(arguments[i]=='nopopup'){
								next.nopopup=true;
							}
							else if(arguments[i]=='noanimate'){
								next.animate=false;
							}
							else if(arguments[i]=='nothrow'){
								next.throw=false;
							}
							else if(arguments[i]=='nodistance'){
								next.nodistance=true;
							}
							else if(arguments[i]=='noTargetDelay'){
								next.noTargetDelay=true;
							}
							else if(arguments[i]=='nodelayx'){
								next.nodelayx=true;
							}
							else if(lib.card[arguments[i]]&&!next.card){
								next.card={name:arguments[i],isCard:true};
							}
							else get.evtprompt(next,arguments[i]);
						}
						else if(arguments[i]===true){
							next.forced=true;
						}
						else if(arguments[i]===false){
							next.addCount=false;
						}
					}
					if(!next.targets) next.targets=game.players.slice(0);
					if(next.cards==undefined){
						if(get.itemtype(next.card)=='card'){
							next.cards=[next.card];
						}
						else next.cards=[];
					}
					else if(next.card==undefined){
						if(next.cards){
							next.card=next.cards[0];
						}
					}
					next.setContent('chooseUseTarget');
					next._args=Array.from(arguments);
					return next;
					// Fully Online-Ready! Enjoy It!
				},
				chooseTarget:function(){
					var next=game.createEvent('chooseTarget');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='number'){
							next.selectTarget=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectTarget=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='dialog'){
							next.dialog=arguments[i];
							next.prompt=false;
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(typeof arguments[i]=='function'){
							if(next.filterTarget) next.ai=arguments[i];
							else next.filterTarget=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							get.evtprompt(next,arguments[i]);
						}
					}
					if(next.filterTarget==undefined) next.filterTarget=lib.filter.all;
					if(next.selectTarget==undefined) next.selectTarget=[1,1];
					if(next.ai==undefined) next.ai=get.attitude2;
					next.setContent('chooseTarget');
					next._args=Array.from(arguments);
					next.forceDie=true;
					return next;
				},
				chooseCardTarget:function(choose){
					var next=game.createEvent('chooseCardTarget');
					next.player=this;
					if(arguments.length==1){
						for(var i in choose){
							next[i]=choose[i];
						}
					}
					if(typeof next.filterCard=='object'){
						next.filterCard=get.filter(next.filterCard);
					}
					if(typeof next.filterTarget=='object'){
						next.filterTarget=get.filter(next.filterTarget,2);
					}
					if(next.filterCard==undefined||next.filterCard===true){
						next.filterCard=lib.filter.all;
					}
					if(next.selectCard==undefined){
						next.selectCard=1;
					}
					if(next.filterTarget==undefined||next.filterTarget===true){
						next.filterTarget=lib.filter.all;
					}
					if(next.selectTarget==undefined){
						next.selectTarget=1;
					}
					if(next.ai1==undefined) next.ai1=get.unuseful2;
					if(next.ai2==undefined) next.ai2=get.attitude2;
					next.setContent('chooseCardTarget');
					next._args=Array.from(arguments);
					return next;
				},
				chooseControlList:function(){
					var list=[];
					var prompt=null;
					var forced='cancel2';
					var func=null;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='string'){
							if(!prompt){
								prompt=arguments[i];
							}
							else{
								list.push(arguments[i]);
							}
						}
						else if(Array.isArray(arguments[i])){
							list=arguments[i];
						}
						else if(arguments[i]===true){
							forced=null;
						}
						else if(typeof arguments[i]=='function'){
							func=arguments[i];
						}
					}
					return this.chooseControl(forced,func).set('choiceList',list).set('prompt',prompt);
				},
				chooseControl:function(){
					var next=game.createEvent('chooseControl');
					next.controls=[];
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='string'){
							if(arguments[i]=='dialogcontrol'){
								next.dialogcontrol=true;
							}
							else if(arguments[i]=='seperate'){
								next.seperate=true;
							}
							else{
								next.controls.push(arguments[i]);
							}
						}
						else if(Array.isArray(arguments[i])){
							next.controls=next.controls.concat(arguments[i]);
						}
						else if(typeof arguments[i]=='function'){
							next.ai=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.choice=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='dialog'){
							next.dialog=arguments[i];
						}
					}
					next.player=this;
					if(next.choice==undefined) next.choice=0;
					next.setContent('chooseControl');
					next._args=Array.from(arguments);
					next.forceDie=true;
					return next;
				},
				chooseBool:function(){
					var next=game.createEvent('chooseBool');
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='boolean'){
							next.choice=arguments[i];
						}
						else  if(typeof arguments[i]=='function'){
							next.ai=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							get.evtprompt(next,arguments[i]);
						}
						else if(get.itemtype(arguments[i])=='dialog'){
							next.dialog=arguments[i];
						}
						if(next.choice==undefined) next.choice=true;
					}
					next.player=this;
					next.setContent('chooseBool');
					next._args=Array.from(arguments);
					next.forceDie=true;
					return next;
				},
				chooseDrawRecover:function(){
					var next=game.createEvent('chooseDrawRecover',false);
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='number'){
							if(typeof next.num1=='number'){
								next.num2=arguments[i];
							}
							else{
								next.num1=arguments[i];
							}
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
						else if(typeof arguments[i]=='function'){
							next.ai=arguments[i];
						}
					}
					if(typeof next.num1!='number'){
						next.num1=1;
					}
					if(typeof next.num2!='number'){
						next.num2=1;
					}
					next.setContent('chooseDrawRecover');
					return next;
				},
				choosePlayerCard:function(){
					var next=game.createEvent('choosePlayerCard');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.target=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.selectButton=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectButton=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='position'){
							next.position=arguments[i];
						}
						else if(arguments[i]=='visible'){
							next.visible=true;
						}
						else if(typeof arguments[i]=='function'){
							if(next.ai) next.filterButton=arguments[i];
							else next.ai=arguments[i];
						}
						else if(typeof arguments[i]=='object'&&arguments[i]){
							next.filterButton=get.filter(arguments[i]);
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
					}
					if(next.filterButton==undefined) next.filterButton=lib.filter.all;
					if(next.position==undefined) next.position='he';
					if(next.selectButton==undefined) next.selectButton=[1,1];
					if(next.ai==undefined) next.ai=function(button){
						var val=get.buttonValue(button);
						if(get.attitude(_status.event.player,get.owner(button.link))>0) return -val;
						return val;
					};
					next.setContent('choosePlayerCard');
					next._args=Array.from(arguments);
					return next;
				},
				discardPlayerCard:function(){
					var next=game.createEvent('discardPlayerCard');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.target=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.selectButton=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectButton=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='position'){
							next.position=arguments[i];
						}
						else if(arguments[i]=='visible'){
							next.visible=true;
						}
						else if(typeof arguments[i]=='function'){
							if(next.ai) next.filterButton=arguments[i];
							else next.ai=arguments[i];
						}
						else if(typeof arguments[i]=='object'&&arguments[i]){
							next.filterButton=get.filter(arguments[i]);
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
					}
					if(next.filterButton==undefined) next.filterButton=lib.filter.all;
					if(next.position==undefined) next.position='he';
					if(next.selectButton==undefined) next.selectButton=[1,1];
					if(next.ai==undefined) next.ai=function(button){
						var val=get.buttonValue(button);
						if(get.attitude(_status.event.player,get.owner(button.link))>0) return -val;
						return val;
					};
					next.setContent('discardPlayerCard');
					next._args=Array.from(arguments);
					return next;
				},
				gainPlayerCard:function(){
					var next=game.createEvent('gainPlayerCard');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.target=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.selectButton=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectButton=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='position'){
							next.position=arguments[i];
						}
						else if(arguments[i]=='visible'){
							next.visible=true;
						}
						else if(arguments[i]=='visibleMove'){
							next.visibleMove=true;
						}
						else if(typeof arguments[i]=='function'){
							if(next.ai) next.filterButton=arguments[i];
							else next.ai=arguments[i];
						}
						else if(typeof arguments[i]=='object'&&arguments[i]){
							next.filterButton=get.filter(arguments[i]);
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
					}
					if(next.filterButton==undefined) next.filterButton=lib.filter.all;
					if(next.position==undefined) next.position='he';
					if(next.selectButton==undefined) next.selectButton=[1,1];
					if(next.ai==undefined) next.ai=function(button){
						var val=get.buttonValue(button);
						if(get.attitude(_status.event.player,get.owner(button.link))>0) return -val;
						return val;
					};
					next.setContent('gainPlayerCard');
					next._args=Array.from(arguments);
					return next;
				},
				showHandcards:function(str){
					var next=game.createEvent('showHandcards');
					next.player=this;
					if(typeof str=='string'){
						next.prompt=str;
					}
					next.setContent('showHandcards');
					next._args=Array.from(arguments);
					return next;
				},
				showCards:function(cards,str){
					var next=game.createEvent('showCards');
					next.player=this;
					next.str=str;
					if(typeof cards=='string'){
						str=cards;
						cards=next.str;
						next.str=str;
					}
					if(get.itemtype(cards)=='card') next.cards=[cards];
					else if(get.itemtype(cards)=='cards') next.cards=cards.slice(0);
					else _status.event.next.remove(next);
					next.setContent('showCards');
					next._args=Array.from(arguments);
					return next;
				},
				viewCards:function(str,cards){
					var next=game.createEvent('viewCards');
					next.player=this;
					next.str=str;
					next.cards=cards.slice(0);
					next.setContent('viewCards');
					next._args=Array.from(arguments);
					return next;
				},
				viewHandcards:function(target){
					var cards=target.getCards('h');
					if(cards.length){
						return this.viewCards(get.translation(target)+'的手牌',cards);
					}
					else{
						return false;
					}
				},
				canMoveCard:function(withatt,nojudge){
					var player=this;
					return game.hasPlayer(function(current){
						var att=get.sgn(get.attitude(player,current));
						if(!withatt||att!=0){
							var es=current.getCards('e');
							for(var i=0;i<es.length;i++){
								if(game.hasPlayer(function(current2){
									if(withatt){
										if(get.sgn(get.value(es[i],current))!=-att) return false;
										var att2=get.sgn(get.attitude(player,current2));
										if(att==att2||att2!=get.sgn(get.effect(current2,es[i],player,current2))) return false;
									}
									return current!=current2&&!current2.isMin()&&current2.canEquip(es[i]);
								})){
									return true;
								}
							}
						}
						if(!nojudge&&(!withatt||att>0)){
							var js=current.getCards('j');
							for(var i=0;i<js.length;i++){
								if(game.hasPlayer(function(current2){
									if(withatt){
										var att2=get.attitude(player,current2);
										if(att2>=0) return false;
									}
									return current!=current2&&current2.canAddJudge(js[i]);
								})){
									return true;
								}
							}
						}
					});
				},
				moveCard:function(){
					var next=game.createEvent('moveCard');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							get.evtprompt(next,arguments[i]);
						}
						else if(Array.isArray(arguments[i])){
							for(var j=0;j<arguments[i].length;j++){
								if(typeof arguments[i][j]!='string') break;
							}
							if(j==arguments[i].length){
								next.targetprompt=arguments[i];
							}
						}
					}
					next.setContent('moveCard');
					next._args=Array.from(arguments);
					return next;
				},
				useResult:function(result,event){
					event=event||_status.event;
					if(result._sendskill){
						lib.skill[result._sendskill[0]]=result._sendskill[1];
					}
					if(event.onresult){
						event.onresult(result);
					}
					if(result.skill){
						var info=get.info(result.skill);
						if(info.onuse){
							info.onuse(result,this);
						}
						if(info.direct&&!info.clearTime){
							_status.noclearcountdown=true;
						}
					}
					if(event.logSkill){
						if(typeof event.logSkill=='string'){
							this.logSkill(event.logSkill);
						}
						else if(Array.isArray(event.logSkill)){
							this.logSkill.apply(this,event.logSkill);
						}
					}
					if(result.card||!result.skill){
						result.used=result.card||result.cards[0];
						var next=this.useCard(result.used,result.cards,result.targets,result.skill);
						next.oncard=event.oncard;
						next.respondTo=event.respondTo;
						if(event.addCount===false){
							next.addCount=false;
						}
						if(result._apply_args){
							for(var i in result._apply_args){
								next[i]=result._apply_args[i];
							}
						}
						return next;
					}
					else if(result.skill){
						result.used=result.skill;
						return this.useSkill(result.skill,result.cards,result.targets);
					}
				},
				useCard:function(){
					var next=game.createEvent('useCard');
					next.player=this;
					next.num=0;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i].slice(0);
						}
						else if(get.itemtype(arguments[i])=='players'){
							next.targets=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='player'){
							next.targets=[arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='object'&&arguments[i]&&arguments[i].name){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							if(arguments[i]=='noai'){
								next.noai=true;
							}
							else if(arguments[i]=='nowuxie'){
								next.nowuxie=true;
							}
							else{
								next.skill=arguments[i];
							}
						}
						else if(typeof arguments[i]=='boolean'){
							next.addCount=arguments[i];
						}
					}
					if(next.cards==undefined){
						if(get.itemtype(next.card)=='card'){
							next.cards=[next.card];
						}
						else next.cards=[];
					}
					else if(next.card==undefined){
						if(next.cards){
							next.card=next.cards[0];
						}
					}
					if(!next.targets){
						next.targets=[];
					}
					if(next.card){
						next.card=get.autoViewAs(next.card,next.cards);
						var info=get.info(next.card);
						if(info.changeTarget){
							info.changeTarget(next.player,next.targets);
						}
						if(info.singleCard){
							next._targets=next.targets.slice(0);
							next.target=next.targets[0];
							next.addedTargets=next.targets.splice(1);
							if(next.addedTargets.length){
								next.addedTarget=next.addedTargets[0];
							}
						}
					}
					for(var i=0;i<next.targets.length;i++){
						if(get.attitude(this,next.targets[i])>=-1&&get.attitude(this,next.targets[i])<0){
							if(!this.ai.tempIgnore) this.ai.tempIgnore=[];
							this.ai.tempIgnore.add(next.targets[i]);
						}
					}
					if(typeof this.logAi=='function'&&!next.noai&&!get.info(next.card).noai){
						var postAi=get.info(next.card).postAi;
						if(postAi&&postAi(next.targets)){
							next.postAi=true;
						}
						else{
							this.logAi(next.targets,next.card);
						}
					}
					next.stocktargets=next.targets.slice(0);
					next.setContent('useCard');
					return next;
				},
				useSkill:function(){
					var next=game.createEvent('useSkill');
					next.player=this;
					next.num=0;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i].slice(0);
						}
						else if(get.itemtype(arguments[i])=='players'){
							next.targets=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							next.skill=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.addCount=arguments[i];
						}
					}
					if(next.cards==undefined){
						next.cards=[];
					}
					if(next.skill&&get.info(next.skill)&&get.info(next.skill).changeTarget){
						get.info(next.skill).changeTarget(next.player,next.targets);
					}
					if(next.targets){
						for(var i=0;i<next.targets.length;i++){
							if(get.attitude(this,next.targets[i])>=-1&&get.attitude(this,next.targets[i])<0){
								if(!this.ai.tempIgnore) this.ai.tempIgnore=[];
								this.ai.tempIgnore.add(next.targets[i]);
							}
						}
						if(typeof this.logAi=='function'){
							this.logAi(next.targets,next.skill);
						}
					}
					else{
						next.targets=[];
					}
					next.setContent('useSkill');
					return next;
				},
				drawTo:function(num,args){
					var num2=num-this.countCards('h');
					if(!num2) return;
					var next=this.draw(num2);
					if(Array.isArray(args)){
						for(var i=0;i<args.length;i++){
							if(get.itemtype(args[i])=='player'){
								next.source=args[i];
							}
							else if(typeof args[i]=='boolean'){
								next.animate=args[i];
							}
							else if(args[i]=='nodelay'){
								next.animate=false;
								next.$draw=true;
							}
							else if(args[i]=='visible'){
								next.visible=true;
							}
							else if(args[i]=='bottom'){
								next.bottom=true;
							}
							else if(typeof args[i]=='object'&&args[i]&&args[i].drawDeck!=undefined){
								next.drawDeck=args[i].drawDeck;
							}
						}
					}
					return next;
				},
				draw:function(){
					var next=game.createEvent('draw');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.num=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.animate=arguments[i];
						}
						else if(arguments[i]=='nodelay'){
							next.animate=false;
							next.$draw=true;
						}
						else if(arguments[i]=='visible'){
							next.visible=true;
						}
						else if(arguments[i]=='bottom'){
							next.bottom=true;
						}
						else if(typeof arguments[i]=='object'&&arguments[i]&&arguments[i].drawDeck!=undefined){
							next.drawDeck=arguments[i].drawDeck;
						}
					}
					if(next.num==undefined) next.num=1;
					if(next.num<=0) _status.event.next.remove(next);
					next.setContent('draw');
					if(lib.config.mode=='stone'&&_status.mode=='deck'&&
					next.drawDeck==undefined&&!next.player.isMin()&&next.num>1){
						next.drawDeck=1;
					}
					next.result=[];
					return next;
				},
				randomDiscard:function(){
					var position='he',num=1,delay=null;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='number'){
							num=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='position'){
							position=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							delay=arguments[i];
						}
					}
					var cards=this.getCards(position).randomGets(num);
					if(cards.length){
						var next=this.discard(cards,'notBySelf');
						if(typeof delay=='boolean'){
							next.delay=delay;
						}
					}
					return cards;
				},
				randomGain:function(){
					var position='he',num=1,target=null,line=false;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='number'){
							num=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='position'){
							position=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='player'){
							target=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							line=arguments[i];
						}
					}
					if(target){
						var cards=target.getCards(position).randomGets(num);
						if(cards.length){
							if(line){
								this.line(target,'green');
							}
							this.gain(cards,target,'log','bySelf');
							target.$giveAuto(cards,this);
						}
						return cards;
					}
					return [];
				},
				discard:function(){
					var next=game.createEvent('discard');
					next.player=this;
					next.num=0;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i].slice(0);
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.cards=[arguments[i]];
						}
						else if(typeof arguments[i]=='boolean'){
							next.animate=arguments[i];
						}
						else if(get.objtype(arguments[i])=='div'){
							next.position=arguments[i];
						}
						else if(arguments[i]=='notBySelf'){
							next.notBySelf=true;
						}
					}
					if(next.cards==undefined) _status.event.next.remove(next);
					next.setContent('discard');
					return next;
				},
				loseToDiscardpile:function(){
					var next=game.createEvent('loseToDiscardpile');
					next.player=this;
					next.num=0;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i].slice(0);
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.cards=[arguments[i]];
						}
						else if(typeof arguments[i]=='boolean'){
							next.animate=arguments[i];
						}
						else if(get.objtype(arguments[i])=='div'){
							next.position=arguments[i];
						}
						else if(arguments[i]=='notBySelf'){
							next.notBySelf=true;
						}
						else if(arguments[i]=='insert'){
							next.insert_card=true;
						}
						else if(arguments[i]=='blank'){
							next.blank=true;
						}
					}
					if(next.cards==undefined) _status.event.next.remove(next);
					next.setContent('loseToDiscardpile');
					return next;
				},
				respond:function(){
					var next=game.createEvent('respond');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i].slice(0);
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.card=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(typeof arguments[i]=='object'&&arguments[i]&&arguments[i].name){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='boolean') next.animate=arguments[i];
						else if(arguments[i]=='highlight') next.highlight=true;
						else if(arguments[i]=='noOrdering') next.noOrdering=true;
						else if(typeof arguments[i]=='string') next.skill=arguments[i];
					}
					if(next.cards==undefined){
						if(get.itemtype(next.card)=='card'){
							next.cards=[next.card];
						}
						else{
							next.cards=[];
						}
					}
					else if(next.card==undefined){
						if(next.cards){
							next.card=next.cards[0];
							if(!next.skill){
								next.card=get.autoViewAs(next.card,next.cards);
							}
						}
					}
					next.setContent('respond');
					return next;
				},
				swapHandcards:function(target,cards1,cards2){
					var next=game.createEvent('swapHandcards',false);
					next.player=this;
					next.target=target;
					if(cards1) next.cards1=cards1;
					if(cards2) next.cards2=cards2;
					next.setContent('swapHandcards');
					return next;
				},
				directequip:function(cards){
					for(var i=0;i<cards.length;i++){
						this.$equip(cards[i]);
					}
					if(!_status.video){
						game.addVideo('directequip',this,get.cardsInfo(cards));
					}
				},
				$addToExpansion:function(cards,broadcast,gaintag){
					var hs=this.getCards('x');
					for(var i=0;i<cards.length;i++){
						if(hs.contains(cards[i])){
							cards.splice(i--,1);
						}
					}
					for(var i=0;i<cards.length;i++){
						cards[i].fix();
						if(gaintag) cards[i].addGaintag(gaintag);
						var sort=lib.config.sort_card(cards[i]);
						this.node.expansions.insertBefore(cards[i],this.node.expansions.firstChild);
					}
					if(broadcast!==false) game.broadcast(function(player,cards,gaintag){
						player.$addToExpansion(cards,null,gaintag);
					},this,cards,gaintag);
					return this;
				},
				directgain:function(cards,broadcast,gaintag){
					var hs=this.getCards('hs');
					for(var i=0;i<cards.length;i++){
						if(hs.contains(cards[i])){
							cards.splice(i--,1);
						}
					}
					for(var i=0;i<cards.length;i++){
						cards[i].fix();
						if(gaintag) cards[i].addGaintag(gaintag);
						var sort=lib.config.sort_card(cards[i]);
						if(this==game.me){
							cards[i].classList.add('drawinghidden');
						}
						if(get.is.singleHandcard()||sort>0){
							this.node.handcards1.insertBefore(cards[i],this.node.handcards1.firstChild);
						}
						else{
							this.node.handcards2.insertBefore(cards[i],this.node.handcards2.firstChild);
						}
					}
					if(this==game.me||_status.video) ui.updatehl();
					if(!_status.video){
						game.addVideo('directgain',this,get.cardsInfo(cards));
						this.update();
					}
					if(broadcast!==false) game.broadcast(function(player,cards){
						player.directgain(cards);
					},this,cards);
					return this;
				},
				directgains:function(cards,broadcast,gaintag){
					var hs=this.getCards('hs');
					for(var i=0;i<cards.length;i++){
						if(hs.contains(cards[i])){
							cards.splice(i--,1);
						}
					}
					var addLast=function(card,node){
						if(gaintag){
							for(var i=0;i<node.childNodes.length;i++){
								var add=node.childNodes[node.childNodes.length-i-1];
								if(!add.classList.contains('glows')) break;
								if(add.hasGaintag(gaintag)){
									node.insertBefore(card,add.nextSibling);
									return;
								}
							}
						}
						node.appendChild(card);
					}
					for(var i=0;i<cards.length;i++){
						cards[i].fix();
						cards[i].remove();
						if(gaintag) cards[i].addGaintag(gaintag);
						cards[i].classList.add('glows');
						if(this==game.me){
							cards[i].classList.add('drawinghidden');
						}
						if(get.is.singleHandcard()){
							addLast(cards[i],this.node.handcards1);
						}
						else{
							addLast(cards[i],this.node.handcards2);
						}
					}
					if(this==game.me||_status.video) ui.updatehl();
					if(!_status.video){
						game.addVideo('directgains',this,get.cardsInfo(cards));
						this.update();
					}
					if(broadcast!==false) game.broadcast(function(player,cards,gaintag){
						player.directgains(cards,null,gaintag);
					},this,cards,gaintag);
					return this;
				},
				gainMultiple:function(targets,position){
					var next=game.createEvent('gainMultiple',false);
					next.setContent('gainMultiple');
					next.player=this;
					next.targets=targets;
					next.position=position||'h';
					return next;
				},
				gain:function(){
					var next=game.createEvent('gain');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i].slice(0);
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.cards=[arguments[i]];
						}
						else if(arguments[i]==='log'){
							next.log=true;
						}
						else if(arguments[i]=='fromStorage'){
							next.fromStorage=true;
						}
						else if(arguments[i]=='fromRenku'){
							next.fromStorage=true;
							next.fromRenku=true;
						}
						else if(arguments[i]=='bySelf'){
							next.bySelf=true;
						}
						else if(typeof arguments[i]=='string'){
							next.animate=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.delay=arguments[i];
						}
					}
					if(next.animate=='gain2'||next.animate=='draw2'){
						if(!next.hasOwnProperty('log')){
							next.log=true;
						}
					}
					next.setContent('gain');
					next.getd=function(player,key,position){
						if(!position) position=ui.discardPile;
						if(!key) key='cards';
						var cards=[],event=this;
						game.checkGlobalHistory('cardMove',function(evt){
							if(evt.name!='lose'||evt.position!=position||evt.getParent()!=event) return;
							if(player&&player!=evt.player) return;
							cards.addArray(evt[key]);
						});
						return cards;
					};
					next.getl=function(player){
						const that=this;
						const map={
							player:player,
							hs:[],
							es:[],
							js:[],
							ss:[],
							xs:[],
							cards:[],
							cards2:[],
							gaintag_map:{},
						};
						player.checkHistory('lose',function(evt){
							if(evt.parent==that){
								map.hs.addArray(evt.hs);
								map.es.addArray(evt.es);
								map.js.addArray(evt.js);
								map.ss.addArray(evt.ss);
								map.xs.addArray(evt.xs);
								map.cards.addArray(evt.cards);
								map.cards2.addArray(evt.cards2);
								for(let key in evt.gaintag_map){
									if(!map.gaintag_map[key]) map.gaintag_map[key]=[];
									map.gaintag_map[key].addArray(evt.gaintag_map[key]);
								}
							}
						});
						return map;
					};
					next.getg=function(player){
						if(this.getlx===false||player!=this.player||!this.cards) return [];
						return this.cards.slice(0);
					}
					next.gaintag=[];
					return next;
				},
				addToExpansion:function(){
					var next=game.createEvent('addToExpansion');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i].slice(0);
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.cards=[arguments[i]];
						}
						else if(arguments[i]==='log'){
							next.log=true;
						}
						else if(arguments[i]=='fromStorage'){
							next.fromStorage=true;
						}
						else if(arguments[i]=='fromRenku'){
							next.fromStorage=true;
							next.fromRenku=true;
						}
						else if(arguments[i]=='bySelf'){
							next.bySelf=true;
						}
						else if(typeof arguments[i]=='string'){
							next.animate=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.delay=arguments[i];
						}
					}
					if(next.animate=='gain2'||next.animate=='draw2'||next.animate=='give'){
						if(!next.hasOwnProperty('log')){
							next.log=true;
						}
					}
					next.setContent('addToExpansion');
					next.getd=function(player,key,position){
						if(!position) position=ui.discardPile;
						if(!key) key='cards';
						var cards=[],event=this;
						game.checkGlobalHistory('cardMove',function(evt){
							if(evt.name!='lose'||evt.position!=position||evt.getParent()!=event) return;
							if(player&&player!=evt.player) return;
							cards.addArray(evt[key]);
						});
						return cards;
					};
					next.getl=function(player){
						const that=this;
						const map={
							player:player,
							hs:[],
							es:[],
							js:[],
							ss:[],
							xs:[],
							cards:[],
							cards2:[],
							gaintag_map:{},
						};
						player.checkHistory('lose',function(evt){
							if(evt.parent==that){
								map.hs.addArray(evt.hs);
								map.es.addArray(evt.es);
								map.js.addArray(evt.js);
								map.ss.addArray(evt.ss);
								map.xs.addArray(evt.xs);
								map.cards.addArray(evt.cards);
								map.cards2.addArray(evt.cards2);
								for(let key in evt.gaintag_map){
									if(!map.gaintag_map[key]) map.gaintag_map[key]=[];
									map.gaintag_map[key].addArray(evt.gaintag_map[key]);
								}
							}
						});
						return map;
					};
					next.gaintag=[];
					return next;
				},
				give:function(cards,target,visible){
					var next=target.gain(cards,this);
					next.animate=visible?'give':'giveAuto';
					next.giver=this;
					return next;
				},
				lose:function(){
					var next=game.createEvent('lose');
					next.player=this;
					next.forceDie=true;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i].slice(0);
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.cards=[arguments[i]];
						}
						else if(get.objtype(arguments[i])=='div'){
							next.position=arguments[i];
						}
						else if(arguments[i]=='toStorage'){
							next.toStorage=true;
						}
						else if(arguments[i]=='toRenku'){
							next.toStorage=true;
							next.toRenku=true;
						}
						else if(arguments[i]=='visible'){
							next.visible=true;
						}
						else if(arguments[i]=='insert'){
							next.insert_card=true;
						}
					}
					if(next.cards){
						var hej=this.getCards('hejsx');
						for(var i=0;i<next.cards.length;i++){
							if(!hej.contains(next.cards[i])){
								next.cards.splice(i--,1);
							}
						}
					}
					if(!next.cards||!next.cards.length){
						_status.event.next.remove(next);
					}
					else{
						if(next.position==undefined) next.position=ui.discardPile;
						next.cards=next.cards.slice(0);
					}
					next.setContent('lose');
					next.getd=function(player,key,position){
						if(!position) position=ui.discardPile;
						if(!key) key='cards';
						if(this.getlx===false||this.position!=position||(player&&this.player!=player)||!Array.isArray(this[key])) return [];
						return this[key].slice(0);
					};
					next.getl=function(player){
						if(this.getlx!==false&&this.player==player) return this;
						return {
							player:player,
							hs:[],
							es:[],
							js:[],
							ss:[],
							xs:[],
							cards:[],
							cards2:[],
							gaintag_map:{},
						};
					};
					return next;
				},
				damage:function(){
					var next=game.createEvent('damage');
					//next.forceDie=true;
					next.player=this;
					var nocard,nosource;
					var event=_status.event;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i].slice(0);
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.num=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(typeof arguments[i]=='object'&&arguments[i]&&arguments[i].name){
							next.card=arguments[i];
						}
						else if(arguments[i]=='nocard'){
							nocard=true;
						}
						else if(arguments[i]=='nosource'){
							nosource=true;
						}
						else if(arguments[i]=='notrigger'){
							next._triggered=null;
							next.notrigger=true;
						}
						else if(arguments[i]=='unreal'){
							next.unreal=true
						}
						else if(get.itemtype(arguments[i])=='nature'&&arguments[i]!='stab'){
							next.nature=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='natures'){
							var natures=arguments[i].split(lib.natureSeparator);
							natures.remove('stab');
							if(natures.length) next.nature=natures.join(lib.natureSeparator);
						}
					}
					if(next.card==undefined&&!nocard) next.card=event.card;
					if(next.cards==undefined&&!nocard) next.cards=event.cards;
					if(next.source==undefined&&!nosource) next.source=event.customSource||event.player;
					if(next.source&&next.source.isDead()) delete next.source;
					if(next.unreal==undefined) next.unreal=false;
					if(next.num==undefined) next.num=(event.baseDamage||1)+(event.extraDamage||0);
					next.original_num=next.num;
					next.change_history=[];
					next.hasNature=function(nature){
						if(!nature) return Boolean(this.nature&&this.nature.length>0);
						let natures=get.natureList(nature),naturesx=get.natureList(this.nature);
						if(nature=='linked') return naturesx.some(n=>lib.linked.includes(n));
						return get.is.sameNature(natures,naturesx);
					};
					if(next.