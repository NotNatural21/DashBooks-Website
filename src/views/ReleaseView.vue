<template>
	<div class="pageHome">
        <div id="release_tile_container">
            <template v-for="(obj, key, index) in update_data">        
                <ReleaseTile :draft="obj.draft" :author="obj.author.login" :body="obj.body" :version="obj.tag_name" :published="obj.published_at"/>
            </template>
        </div>
	</div>
</template>

<script>
import ReleaseTile from '../components/ReleaseTile.vue'
import $ from 'jquery'
export default {
	name: 'ReleaseView',
	components: {
        ReleaseTile
	},
	data(){
		return{
			update_data: {}
		}
	},
	mounted(){
        this.getReleaseData();
	},
	methods: {
        getReleaseData(){
            let ref = this;
            ref.update_data = {};
            $.ajax({
                dataType: "json",
                url: 'https://api.github.com/repos/Scott-Studios/DashBooks-App/releases',
                cache: false,
                success: function (data){
                    ref.update_data = data;
                    console.log(ref.update_data)
                },
                error: function (xhr){
                    console.log("Error " + xhr.status + ", could not check for updates.");
                }
            });
        }
	}
}
</script>


<style scoped lang="scss">
.pageHome{
    justify-content: flex-start;
}
</style>