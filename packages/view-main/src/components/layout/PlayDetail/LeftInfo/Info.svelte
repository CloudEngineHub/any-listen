<script lang="ts">
  import { musicInfo } from '@/modules/player/reactive.svelte'
  import { t } from '@/plugins/i18n'
</script>

<div class="scroll info">
  <p><span>{$t('play_detail.music_name')}</span>{$musicInfo.name}</p>
  <p><span>{$t('play_detail.music_singer')}</span>{$musicInfo.singer}</p>
  {#if $musicInfo.album}
    <p><span>{$t('play_detail.music_album')}</span>{$musicInfo.album}</p>
  {/if}
</div>

<style lang="less">
  .info {
    flex: auto;
    width: var(--content-with);
    margin-top: 15px;
    // padding-bottom: 15px;
    min-height: 0;
    p {
      line-height: 1.5;
      font-size: 16px;
      overflow-wrap: break-word;

      span {
        color: var(--color-font-label);
        font-size: 14px;
      }
    }
  }
</style>
