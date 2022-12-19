import koaRouter from 'koa-router';
import indexController from '../controllers/index'
import channelController from '../controllers/channel';
const router = new koaRouter();

router.get('/',indexController.index)

router.get('/channels',channelController.getChannelList)

router.post('/addChannel',channelController.add)

router.post('/addMessage',channelController.addMessage)

router.get('/message',channelController.getMessageList)

export default router;