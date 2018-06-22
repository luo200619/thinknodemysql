### 这是一个thinknodemysql 包
	主要目的是方便操作mysql

### installtion
	npm install --save thinknodemysql
### 使用示例

    const mysql = require('thinknodemysql');
    const config = {
        host:'您的IP地址',
        user:'您的用户名',
        password:'您的密码',
        database:'数据库名称',
        prefix:'数据库前缀',
    };
    const model = new mysql(config);
	### 查询数据示例 es7用法
    let find = async function(){
        try{
            let result = await model.table('__ADMIN_USER__').find();
            console.log(result);
            console.log(model.log);  

            result = await model.table('__ADMIN_USER__').select();
            console.log(result);
            console.log(model.log);
        } catch(err){
            console.log(err);
        }
    }
	### 增加数据示例 es7用法
    let add = async function(){
        try{

            let result = await model.table('__ADMIN_USER__').data({username:'como',add_time:15219840100}).add();
            console.log(result);
            console.log(model.log); 

            result = let result = await model.table('__ADMIN_USER__').data([{username:'como',add_time:15219840100},{username:'como',add_time:15219840100}]).addAll();
            console.log(result);
            console.log(model.log);
        } catch(err){
            console.log(err);
        }
    }
    ### 删除数据示例 es7用法
    let delete = async function(){
        try{
            let result = await model.table('__ADMIN_USER__').where({username:'como'}).delete();
            console.log(result);
            console.log(model.log); 
        } catch(err){
            console.log(err);
        }
    }
    ### 更新数据示例 es7用法
    let delete = async function(){
        try{
            let result = await model.table('__ADMIN_USER__').where({username:'como'}).update({add_time:15219000000});
            console.log(result);
            console.log(model.log); 
        } catch(err){
            console.log(err);
        }
    }
	

### API说明
    .log
>   记录的语句分析耗时间和执行查询耗时时间,方便分析语句的问题,以带来最大的执行效率

	.table(tableName='')
> 数据表名称

	.field(fields = ''){
> 要查询的字段[字符串/数组]

	.where(objwhere = {})
> 条件[字符串/对象]

	.limit(start = 0,end)
> 限制条件[start 开始,end 结束]

	.order(mixedparam = '')
> 排序条件[字符串]

	.group(mixedparam = '')
> 分组 [字符串]

	.having(mixedparam = '')
> having条件[字符串]

	.page(p = 1,limit = 30)
> 分页设置[P 第1页 limit 每页查询多少条]

	.join(mixedparam = '',type)
> 连表查询[mixedparam 连表语句 type 链接类型 默认是INNER JOIN]

	.union(mixedparam = '',type = null)
> union查询 [type 为true时 union all查询]

	.alias(aliasName = '')
> 数据表别名

	.data(objdata = {})
> 数据填写 如果用add 那么传入对象 如果用addAll 请传入数组

	.find(boolean = true)
> 查询一行数据 (boolean 为false时返回sql)

	.select(boolean = true)
>  查询多行数据 (boolean 为false时返回sql)

	.query(sql,param = [])
> 直接用sql进行查询 param 为格式化参数

	.startTrans()
> 开启事务

	.commit()
> 提交事务

	.rollback()
> 事务回滚

	.add(data = {},returnResult = 'insertId')
> 添加数据（所有参数可传可不传）

	.addAll(data = [],returnResult = 'insertId')
> 批量添加数据（所有参数可传可不传）


    .selectAll(arr = [])
> 多条sql批量查询(arr是sql语句数组)


    .update(data = {},returnResult = 'affectedRows')
> 数据更新（所有参数可传可不传）

    .delete()
> 数据删除(必须与where配合使用)

    .count(field = '*')
> 数据统计

    .sum(field = '')
> 数据求和

    .max(field = '')
> 查询最大值

    .avg(field = '')
> 查询平均值

    .min(field = '')
> 查询最小值

    .getLastSql()
> 获最后一条查询的语句

    .close()
> 关闭数据库链接
### 更新日志
2018-05-28  como 首次完成
2018-06-22  como 修复事件超出10次警告的信息,增加close关闭数据库链接
使用bable编译过,应该可以支持低版本的nodejs [模块编写环境:nodejs 8.1]
