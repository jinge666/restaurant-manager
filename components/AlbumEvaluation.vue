<template>
  <view class="u-page">
    <view class="u-demo-block">
      <!-- <text class="u-demo-block__title">多图模式</text> -->
      <view class="u-demo-block__content">
        <view class="album">
          <view class="album__avatar">
            <image
              :src="userInfo.avatarUrl"
              mode=""
              style="width: 32px;height: 32px;"
            ></image>
          </view>
          <view class="album__content">
            <view class="other">
            	<view class="nick-name"><u--text :text="userInfo.nickName" type="primary" bold size="17"></u--text></view>
            	<u-rate :count="5" v-model="commentInfo.dregg"></u-rate>
            </view>
						<u--text :text="$u.timeFormat(commentInfo.createTime, 'yyyy-mm-dd hh:MM:ss')" size="10" color="#c8c9cc"></u--text>
            <u--text
              margin="0 0 8px 0"
              :text="commentInfo.comment"
            ></u--text>
            <u-album :urls="commentInfo.pictureList" v-if="commentInfo.pictureList.length > 0"></u-album>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
	data() {
		return {
			albumWidth: 0,
		}
	},
	props:{
		userInfo:{
			type:Object,
			default:() => {}
		},
		commentInfo:{
			type:Object,
			default:() => {}
		},
	}
}
</script>

<style lang="scss">
.album {
	@include flex;
	align-items: flex-start;
	&__avatar {
	  background-color: $u-bg-color;
	  padding: 5px;
	  border-radius: 3px;
	 }
	&__content {
	  margin-left: 10px;
	  flex: 1;
		.other{
			display: flex;
			.nick-name{
				margin-right: 20px;
			}
		}
	}
}
</style>