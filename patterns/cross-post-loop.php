<?php

/**
 * Title: Cross Post Loop
 * Slug: epicmag/cross-post-loop
 * Categories: query
 */
?>

<!-- wp:dragblock/wrapper {"className":"cross","dragBlockStyles":[{"slug":"margin-top","value":"80px"},{"slug":"background-color","value":"{c=accent-contrast}"},{"slug":"padding","value":"4vw 4vw 3.5vw 4vw"},{"value":"0.7em","slug":"font-size","devices":"m"},{"value":"0.85em","slug":"font-size","devices":"t"},{"slug":"grid-template-columns","value":"repeat(2,1fr)","devices":"m"},{"slug":"grid-template-columns","value":"repeat(3,1fr)","devices":"t"},{"slug":"grid-template-columns","value":"repeat(6,1fr)","devices":"d"},{"value":"100","slug":"font-weight","selectors":".post .title-wrap"},{"value":"1.25em","slug":"font-size","selectors":".post .title-wrap"},{"value":"10px","slug":"margin-top","selectors":".post .title-wrap"},{"value":"block","slug":"display","selectors":".post .thumb"},{"value":"10em","slug":"height","selectors":".post .thumb"},{"value":"100%","slug":"width","selectors":".post .thumb img"},{"value":"100%","slug":"height","selectors":".post .thumb img"},{"slug":"display","value":"grid"},{"slug":"row-gap","value":"20px"},{"slug":"column-gap","value":"4vw"}],"dragBlockCSS":"[data-dragblock-client-id=\u00224b2b3f25-1840-4683-91d7-bc0011b82b89\u0022]{column-gap:4vw;row-gap:20px;display:grid;padding:4vw 4vw 3.5vw 4vw;background-color:{c=accent-contrast};margin-top:80px}[data-dragblock-client-id=\u00224b2b3f25-1840-4683-91d7-bc0011b82b89\u0022] .post .thumb img{height:100%;width:100%}[data-dragblock-client-id=\u00224b2b3f25-1840-4683-91d7-bc0011b82b89\u0022] .post .thumb{height:10em;display:block}[data-dragblock-client-id=\u00224b2b3f25-1840-4683-91d7-bc0011b82b89\u0022] .post .title-wrap{margin-top:10px;font-size:1.25em;font-weight:100}@media screen and (min-width: 1025px) {[data-dragblock-client-id=\u00224b2b3f25-1840-4683-91d7-bc0011b82b89\u0022]{grid-template-columns:repeat(6,1fr)}}@media screen and (min-width: 768px) and (max-width: 1024px) {[data-dragblock-client-id=\u00224b2b3f25-1840-4683-91d7-bc0011b82b89\u0022]{grid-template-columns:repeat(3,1fr);font-size:0.85em}}@media screen and (max-width: 767px) {[data-dragblock-client-id=\u00224b2b3f25-1840-4683-91d7-bc0011b82b89\u0022]{grid-template-columns:repeat(2,1fr);font-size:0.7em}}","dragBlockClientId":"4b2b3f25-1840-4683-91d7-bc0011b82b89","dragBlockQueries":[{"slug":"WP_Query","name":"","id":"a5a9be23-74e4-4e97-b178-710923273a71__a5a9be23-74e4-4e97-b178-710923273a71","params":[]}]} -->
<div class="wp-block-dragblock-wrapper cross"><!-- wp:dragblock/wrapper {"className":"post","dragBlockStyles":[],"dragBlockClientId":"c611dc3f-6ff7-406e-9296-fb70b8ee7987","dragBlockQueries":[{"slug":"parse_item","name":"","id":"1333b57d-2d8a-446f-b426-07cffb8fe133__1333b57d-2d8a-446f-b426-07cffb8fe133","params":[]}]} -->
    <div class="wp-block-dragblock-wrapper post"><!-- wp:dragblock/wrapper {"className":"thumb-wrap","dragBlockStyles":[],"dragBlockClientId":"52d95537-30c1-4edb-8b70-872acd4b2a9d"} -->
        <div class="wp-block-dragblock-wrapper thumb-wrap"><!-- wp:dragblock/link {"className":"thumb","dragBlockStyles":[],"dragBlockClientId":"c2c78ece-e065-4817-a4d2-bd8f5316e0df","dragBlockAttrs":[{"value":"[dragblock.post.url]","slug":"href"}]} -->
            <a class="wp-block-dragblock-link thumb"><!-- wp:dragblock/image {"dragBlockStyles":[{"value":"100%","slug":"max-width"},{"slug":"object-fit","value":"cover"}],"dragBlockCSS":"[data-dragblock-client-id=\u0022d7cb56a9-86fb-4c32-b92d-75849da225ea\u0022]{object-fit:cover;max-width:100%}","dragBlockClientId":"d7cb56a9-86fb-4c32-b92d-75849da225ea","dragBlockAttrs":[{"value":"[dragblock.post.thumbnail.src]","slug":"src"},{"slug":"loading","value":"lazy"},{"slug":"decoding","value":"async"}]} -->
                <img class="wp-block-dragblock-image" />
                <!-- /wp:dragblock/image --></a>
            <!-- /wp:dragblock/link -->
        </div>
        <!-- /wp:dragblock/wrapper -->

        <!-- wp:dragblock/wrapper {"dragBlockTagName":"h2","className":"title-wrap","dragBlockStyles":[{"slug":"margin","value":"0px"}],"dragBlockCSS":"[data-dragblock-client-id=\u00221c535df3-1f02-438b-bc42-3825ad30d8cb\u0022]{margin:0px}","dragBlockClientId":"1c535df3-1f02-438b-bc42-3825ad30d8cb"} -->
        <h2 class="wp-block-dragblock-wrapper title-wrap"><!-- wp:dragblock/link {"className":"title","dragBlockStyles":[],"dragBlockClientId":"8dbd1411-8839-4392-8186-e03f3f26c807","dragBlockAttrs":[{"value":"[dragblock.post.url]","slug":"href"}]} -->
            <a class="wp-block-dragblock-link title"><!-- wp:dragblock/text {"dragBlockText":[{"slug":"en_US","value":"[dragblock.post.title]"}],"className":"text","dragBlockStyles":[],"dragBlockClientId":"9e965547-415e-45fa-8079-f2554be25d53"} -->
                <span class="wp-block-dragblock-text text"></span>
                <!-- /wp:dragblock/text --></a>
            <!-- /wp:dragblock/link -->
        </h2>
        <!-- /wp:dragblock/wrapper -->
    </div>
    <!-- /wp:dragblock/wrapper -->

    <!-- wp:dragblock/wrapper {"className":"post","dragBlockStyles":[],"dragBlockClientId":"e7a88abc-f219-4a4d-a1f3-120f06bd7996","dragBlockQueries":[{"slug":"parse_item","name":"","id":"1333b57d-2d8a-446f-b426-07cffb8fe133__1333b57d-2d8a-446f-b426-07cffb8fe133","params":[]}]} -->
    <div class="wp-block-dragblock-wrapper post"><!-- wp:dragblock/wrapper {"className":"thumb-wrap","dragBlockStyles":[],"dragBlockClientId":"5161f56e-6303-46e9-82de-f04f237a966a"} -->
        <div class="wp-block-dragblock-wrapper thumb-wrap"><!-- wp:dragblock/link {"className":"thumb","dragBlockStyles":[],"dragBlockClientId":"78775c64-d9c5-496e-bc09-6383009e13ca","dragBlockAttrs":[{"value":"[dragblock.post.url]","slug":"href"}]} -->
            <a class="wp-block-dragblock-link thumb"><!-- wp:dragblock/image {"dragBlockStyles":[{"value":"100%","slug":"max-width"},{"slug":"object-fit","value":"cover"}],"dragBlockCSS":"[data-dragblock-client-id=\u0022b31f7db3-56c5-455f-baa4-e2ae40f08518\u0022]{object-fit:cover;max-width:100%}","dragBlockClientId":"b31f7db3-56c5-455f-baa4-e2ae40f08518","dragBlockAttrs":[{"value":"[dragblock.post.thumbnail.src]","slug":"src"},{"slug":"loading","value":"lazy"},{"slug":"decoding","value":"async"}]} -->
                <img class="wp-block-dragblock-image" />
                <!-- /wp:dragblock/image --></a>
            <!-- /wp:dragblock/link -->
        </div>
        <!-- /wp:dragblock/wrapper -->

        <!-- wp:dragblock/wrapper {"dragBlockTagName":"h2","className":"title-wrap","dragBlockStyles":[{"slug":"margin","value":"0px"}],"dragBlockCSS":"[data-dragblock-client-id=\u00223269db43-71c1-479a-ac62-80898f5bdb45\u0022]{margin:0px}","dragBlockClientId":"3269db43-71c1-479a-ac62-80898f5bdb45"} -->
        <h2 class="wp-block-dragblock-wrapper title-wrap"><!-- wp:dragblock/link {"className":"title","dragBlockStyles":[],"dragBlockClientId":"eda4ea34-0433-4307-be3e-b6f68c7da23e","dragBlockAttrs":[{"value":"[dragblock.post.url]","slug":"href"}]} -->
            <a class="wp-block-dragblock-link title"><!-- wp:dragblock/text {"dragBlockText":[{"slug":"en_US","value":"[dragblock.post.title]"}],"className":"text","dragBlockStyles":[],"dragBlockClientId":"ed5a7c0c-87d0-4886-8d05-e0e080cb9627"} -->
                <span class="wp-block-dragblock-text text"></span>
                <!-- /wp:dragblock/text --></a>
            <!-- /wp:dragblock/link -->
        </h2>
        <!-- /wp:dragblock/wrapper -->
    </div>
    <!-- /wp:dragblock/wrapper -->

    <!-- wp:dragblock/wrapper {"className":"post","dragBlockStyles":[],"dragBlockClientId":"4b76af60-99e5-4d8f-9a5e-cb1e956b7bc1","dragBlockQueries":[{"slug":"parse_item","name":"","id":"1333b57d-2d8a-446f-b426-07cffb8fe133__1333b57d-2d8a-446f-b426-07cffb8fe133","params":[]}]} -->
    <div class="wp-block-dragblock-wrapper post"><!-- wp:dragblock/wrapper {"className":"thumb-wrap","dragBlockStyles":[],"dragBlockClientId":"1adc30b7-8f5c-4e03-ab11-5f33fddd8652"} -->
        <div class="wp-block-dragblock-wrapper thumb-wrap"><!-- wp:dragblock/link {"className":"thumb","dragBlockStyles":[],"dragBlockClientId":"6a8d8919-722c-4bd0-92eb-52b214a8f45b","dragBlockAttrs":[{"value":"[dragblock.post.url]","slug":"href"}]} -->
            <a class="wp-block-dragblock-link thumb"><!-- wp:dragblock/image {"dragBlockStyles":[{"value":"100%","slug":"max-width"},{"slug":"object-fit","value":"cover"}],"dragBlockCSS":"[data-dragblock-client-id=\u0022bd4943a2-9cc6-4240-8fa0-27b0b79c68ad\u0022]{object-fit:cover;max-width:100%}","dragBlockClientId":"bd4943a2-9cc6-4240-8fa0-27b0b79c68ad","dragBlockAttrs":[{"value":"[dragblock.post.thumbnail.src]","slug":"src"},{"slug":"loading","value":"lazy"},{"slug":"decoding","value":"async"}]} -->
                <img class="wp-block-dragblock-image" />
                <!-- /wp:dragblock/image --></a>
            <!-- /wp:dragblock/link -->
        </div>
        <!-- /wp:dragblock/wrapper -->

        <!-- wp:dragblock/wrapper {"dragBlockTagName":"h2","className":"title-wrap","dragBlockStyles":[{"slug":"margin","value":"0px"}],"dragBlockCSS":"[data-dragblock-client-id=\u0022b43d03ee-0608-4889-936c-0a9168fc64a9\u0022]{margin:0px}","dragBlockClientId":"b43d03ee-0608-4889-936c-0a9168fc64a9"} -->
        <h2 class="wp-block-dragblock-wrapper title-wrap"><!-- wp:dragblock/link {"className":"title","dragBlockStyles":[],"dragBlockClientId":"3f5d4afc-2757-4978-a300-cc7fea17155d","dragBlockAttrs":[{"value":"[dragblock.post.url]","slug":"href"}]} -->
            <a class="wp-block-dragblock-link title"><!-- wp:dragblock/text {"dragBlockText":[{"slug":"en_US","value":"[dragblock.post.title]"}],"className":"text","dragBlockStyles":[],"dragBlockClientId":"896d6d04-8deb-440d-bd27-5d552d4dd8c9"} -->
                <span class="wp-block-dragblock-text text"></span>
                <!-- /wp:dragblock/text --></a>
            <!-- /wp:dragblock/link -->
        </h2>
        <!-- /wp:dragblock/wrapper -->
    </div>
    <!-- /wp:dragblock/wrapper -->

    <!-- wp:dragblock/wrapper {"className":"post","dragBlockStyles":[],"dragBlockClientId":"52b029d4-0fd1-4a57-98b8-6ba129908ead","dragBlockQueries":[{"slug":"parse_item","name":"","id":"1333b57d-2d8a-446f-b426-07cffb8fe133__1333b57d-2d8a-446f-b426-07cffb8fe133","params":[]}]} -->
    <div class="wp-block-dragblock-wrapper post"><!-- wp:dragblock/wrapper {"className":"thumb-wrap","dragBlockStyles":[],"dragBlockClientId":"eac8d812-eb9e-4f98-857d-b88ea65ebac5"} -->
        <div class="wp-block-dragblock-wrapper thumb-wrap"><!-- wp:dragblock/link {"className":"thumb","dragBlockStyles":[],"dragBlockClientId":"66a86400-a5ed-406f-badf-e7419dcbd6f4","dragBlockAttrs":[{"value":"[dragblock.post.url]","slug":"href"}]} -->
            <a class="wp-block-dragblock-link thumb"><!-- wp:dragblock/image {"dragBlockStyles":[{"value":"100%","slug":"max-width"},{"slug":"object-fit","value":"cover"}],"dragBlockCSS":"[data-dragblock-client-id=\u0022a90bbe4f-c1e8-4845-8f68-f7968b2007ec\u0022]{object-fit:cover;max-width:100%}","dragBlockClientId":"a90bbe4f-c1e8-4845-8f68-f7968b2007ec","dragBlockAttrs":[{"value":"[dragblock.post.thumbnail.src]","slug":"src"},{"slug":"loading","value":"lazy"},{"slug":"decoding","value":"async"}]} -->
                <img class="wp-block-dragblock-image" />
                <!-- /wp:dragblock/image --></a>
            <!-- /wp:dragblock/link -->
        </div>
        <!-- /wp:dragblock/wrapper -->

        <!-- wp:dragblock/wrapper {"dragBlockTagName":"h2","className":"title-wrap","dragBlockStyles":[{"slug":"margin","value":"0px"}],"dragBlockCSS":"[data-dragblock-client-id=\u002270cd705c-8de0-4a0c-aec9-30b9c1f0f6c4\u0022]{margin:0px}","dragBlockClientId":"70cd705c-8de0-4a0c-aec9-30b9c1f0f6c4"} -->
        <h2 class="wp-block-dragblock-wrapper title-wrap"><!-- wp:dragblock/link {"className":"title","dragBlockStyles":[],"dragBlockClientId":"15aafb9e-ad22-44ed-8a99-17d3ea686c2d","dragBlockAttrs":[{"value":"[dragblock.post.url]","slug":"href"}]} -->
            <a class="wp-block-dragblock-link title"><!-- wp:dragblock/text {"dragBlockText":[{"slug":"en_US","value":"[dragblock.post.title]"}],"className":"text","dragBlockStyles":[],"dragBlockClientId":"71afa625-3305-41fc-8f74-7f1e3fcefcb9"} -->
                <span class="wp-block-dragblock-text text"></span>
                <!-- /wp:dragblock/text --></a>
            <!-- /wp:dragblock/link -->
        </h2>
        <!-- /wp:dragblock/wrapper -->
    </div>
    <!-- /wp:dragblock/wrapper -->

    <!-- wp:dragblock/wrapper {"className":"post","dragBlockStyles":[],"dragBlockClientId":"bc09e25e-4bb3-438d-8b11-98976590a0f6","dragBlockQueries":[{"slug":"parse_item","name":"","id":"1333b57d-2d8a-446f-b426-07cffb8fe133__1333b57d-2d8a-446f-b426-07cffb8fe133","params":[]}]} -->
    <div class="wp-block-dragblock-wrapper post"><!-- wp:dragblock/wrapper {"className":"thumb-wrap","dragBlockStyles":[],"dragBlockClientId":"6d21a724-c8e5-421c-810b-868e80e3b98d"} -->
        <div class="wp-block-dragblock-wrapper thumb-wrap"><!-- wp:dragblock/link {"className":"thumb","dragBlockStyles":[],"dragBlockClientId":"df1da1d2-2e51-4eaf-b27e-0e615486c128","dragBlockAttrs":[{"value":"[dragblock.post.url]","slug":"href"}]} -->
            <a class="wp-block-dragblock-link thumb"><!-- wp:dragblock/image {"dragBlockStyles":[{"value":"100%","slug":"max-width"},{"slug":"object-fit","value":"cover"}],"dragBlockCSS":"[data-dragblock-client-id=\u0022c0560255-109b-4eeb-b443-9c73ec8d1f07\u0022]{object-fit:cover;max-width:100%}","dragBlockClientId":"c0560255-109b-4eeb-b443-9c73ec8d1f07","dragBlockAttrs":[{"value":"[dragblock.post.thumbnail.src]","slug":"src"},{"slug":"loading","value":"lazy"},{"slug":"decoding","value":"async"}]} -->
                <img class="wp-block-dragblock-image" />
                <!-- /wp:dragblock/image --></a>
            <!-- /wp:dragblock/link -->
        </div>
        <!-- /wp:dragblock/wrapper -->

        <!-- wp:dragblock/wrapper {"dragBlockTagName":"h2","className":"title-wrap","dragBlockStyles":[{"slug":"margin","value":"0px"}],"dragBlockCSS":"[data-dragblock-client-id=\u0022088f12b0-03a7-4d55-b78d-c7760b3b7755\u0022]{margin:0px}","dragBlockClientId":"088f12b0-03a7-4d55-b78d-c7760b3b7755"} -->
        <h2 class="wp-block-dragblock-wrapper title-wrap"><!-- wp:dragblock/link {"className":"title","dragBlockStyles":[],"dragBlockClientId":"d1757275-7f96-4956-9db7-c664fdb4ed5c","dragBlockAttrs":[{"value":"[dragblock.post.url]","slug":"href"}]} -->
            <a class="wp-block-dragblock-link title"><!-- wp:dragblock/text {"dragBlockText":[{"slug":"en_US","value":"[dragblock.post.title]"}],"className":"text","dragBlockStyles":[],"dragBlockClientId":"66ed97eb-434a-436b-9424-776b1ac83b8f"} -->
                <span class="wp-block-dragblock-text text"></span>
                <!-- /wp:dragblock/text --></a>
            <!-- /wp:dragblock/link -->
        </h2>
        <!-- /wp:dragblock/wrapper -->
    </div>
    <!-- /wp:dragblock/wrapper -->

    <!-- wp:dragblock/wrapper {"className":"post","dragBlockStyles":[],"dragBlockClientId":"ef140046-6e3b-4af9-a684-e7ff91a6fabd","dragBlockQueries":[{"slug":"parse_item","name":"","id":"1333b57d-2d8a-446f-b426-07cffb8fe133__1333b57d-2d8a-446f-b426-07cffb8fe133","params":[]}]} -->
    <div class="wp-block-dragblock-wrapper post"><!-- wp:dragblock/wrapper {"className":"thumb-wrap","dragBlockStyles":[],"dragBlockClientId":"ae661d4a-da49-444e-aacf-e1096203390c"} -->
        <div class="wp-block-dragblock-wrapper thumb-wrap"><!-- wp:dragblock/link {"className":"thumb","dragBlockStyles":[],"dragBlockClientId":"9a620830-ac14-4c40-8d40-819b72af293b","dragBlockAttrs":[{"value":"[dragblock.post.url]","slug":"href"}]} -->
            <a class="wp-block-dragblock-link thumb"><!-- wp:dragblock/image {"dragBlockStyles":[{"value":"100%","slug":"max-width"},{"slug":"object-fit","value":"cover"}],"dragBlockCSS":"[data-dragblock-client-id=\u0022cb64fea1-dd36-4f32-8cac-0efbcae5c9ff\u0022]{object-fit:cover;max-width:100%}","dragBlockClientId":"cb64fea1-dd36-4f32-8cac-0efbcae5c9ff","dragBlockAttrs":[{"value":"[dragblock.post.thumbnail.src]","slug":"src"},{"slug":"loading","value":"lazy"},{"slug":"decoding","value":"async"}]} -->
                <img class="wp-block-dragblock-image" />
                <!-- /wp:dragblock/image --></a>
            <!-- /wp:dragblock/link -->
        </div>
        <!-- /wp:dragblock/wrapper -->

        <!-- wp:dragblock/wrapper {"dragBlockTagName":"h2","className":"title-wrap","dragBlockStyles":[{"slug":"margin","value":"0px"}],"dragBlockCSS":"[data-dragblock-client-id=\u0022db6e0bb2-68d4-48ef-8e8e-50e2078e0328\u0022]{margin:0px}","dragBlockClientId":"db6e0bb2-68d4-48ef-8e8e-50e2078e0328"} -->
        <h2 class="wp-block-dragblock-wrapper title-wrap"><!-- wp:dragblock/link {"className":"title","dragBlockStyles":[],"dragBlockClientId":"182bb625-4df4-45e3-a9ca-55c5e8fca79f","dragBlockAttrs":[{"value":"[dragblock.post.url]","slug":"href"}]} -->
            <a class="wp-block-dragblock-link title"><!-- wp:dragblock/text {"dragBlockText":[{"slug":"en_US","value":"[dragblock.post.title]"}],"className":"text","dragBlockStyles":[],"dragBlockClientId":"007058fa-d57a-4d9b-ae1c-032e3daf8a2c"} -->
                <span class="wp-block-dragblock-text text"></span>
                <!-- /wp:dragblock/text --></a>
            <!-- /wp:dragblock/link -->
        </h2>
        <!-- /wp:dragblock/wrapper -->
    </div>
    <!-- /wp:dragblock/wrapper -->
</div>
<!-- /wp:dragblock/wrapper -->