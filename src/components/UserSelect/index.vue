<template>
  <el-select
    v-model="openValue"
    :value="openValue"
    :clearable="clearable"
    :filterable="filterable"
    :disabled="disabled"
    :multiple="multiple"
    :placeholder="placeholderText"
    style="width: 100%"
  >
    <el-option
      v-for="item of optionList"
      :key="item.operdm"
      :label="item.realname"
      :value="item.operdm"
    >
      <span style="float: left">
        {{ item.realname }}
      </span>
      <span
        v-if="item.cornet !== ''"
        style="float: right; color: #8492a6; font-size: 12px"
      >
        短号：{{ item.cornet }}
      </span>
      <span
        v-if="item.sfcode !== ''"
        style="float: right; color: #8492a6; font-size: 12px; padding: 0 5px"
      >
        证件：{{ item.sfcode }}
      </span>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'UserSelect',
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: { required: true },
    userLabel: { type: String, default: '管理人' },
    optionList: { type: Array, required: true },
    clearable: Boolean,
    filterable: Boolean,
    disabled: Boolean,
    multiple: Boolean
  },
  data: function () {
    return {
      openValue: this.value
    }
  },
  computed: {
    placeholderText: function () {
      return '请选择' + this.userLabel
    }
  },
  watch: {
    value: function (val) {
      this.openValue = val
    },
    openValue(val) {
      this.$emit('on-value-change', val)
    }
  }
}
</script>

<style scoped>
</style>
