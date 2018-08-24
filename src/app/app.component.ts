import {AfterViewInit, Component, ElementRef, Type} from '@angular/core';

import * as _ from 'lodash';
import {filterExecutor} from '@core/filter/filter.executor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {
  title = 'app';

  constructor(private _elementRef: ElementRef) {

  }

  ngAfterViewInit() {
    document.addEventListener('click', () => {
      console.log('document click');
    });
    var users = [
      {'学校': '北京大学', '省份': '北京市', '城市': '北京市', '本科毕业生人数': '2645', '硕士毕业生人数': '3604', '博士毕业生人数': '1213', '毕业生人数': '7462'},
      {'学校': '北京航空航天大学', '省份': '北京市', '城市': '北京市', '本科毕业生人数': '3105', '硕士毕业生人数': '2845', '博士毕业生人数': '437', '毕业生人数': '6387'},
      {'学校': '北京理工大学', '省份': '北京市', '城市': '北京市', '本科毕业生人数': '3761', '硕士毕业生人数': '2818', '博士毕业生人数': '553', '毕业生人数': '7132'},
      {'学校': '北京师范大学', '省份': '北京市', '城市': '北京市', '本科毕业生人数': '2455', '硕士毕业生人数': '3476', '博士毕业生人数': '623', '毕业生人数': '6554'},
      {'学校': '大连理工大学', '省份': '辽宁省', '城市': '大连市', '本科毕业生人数': '5608', '硕士毕业生人数': '2689', '博士毕业生人数': '273', '毕业生人数': '8570'},
      {'学校': '电子科技大学', '省份': '四川省', '城市': '成都市', '本科毕业生人数': '4992', '硕士毕业生人数': '3433', '博士毕业生人数': '274', '毕业生人数': '8699'},
      {'学校': '东北大学', '省份': '辽宁省', '城市': '沈阳市', '本科毕业生人数': '4724', '硕士毕业生人数': '3219', '博士毕业生人数': '344', '毕业生人数': '8287'},
      {'学校': '东南大学', '省份': '江苏省', '城市': '南京市', '本科毕业生人数': '4101', '硕士毕业生人数': '3801', '博士毕业生人数': '1111', '毕业生人数': '9013'},
      {'学校': '复旦大学', '省份': '上海市', '城市': '上海市', '本科毕业生人数': '2789', '硕士毕业生人数': '3532', '博士毕业生人数': '1230', '毕业生人数': '7551'},
      {'学校': '哈尔滨工业大学', '省份': '黑龙江省', '城市': '哈尔滨市', '本科毕业生人数': '3974', '硕士毕业生人数': '3047', '博士毕业生人数': '538', '毕业生人数': '7559'},
      {'学校': '湖南大学', '省份': '湖南省', '城市': '长沙市', '本科毕业生人数': '4911', '硕士毕业生人数': '3129', '博士毕业生人数': '218', '毕业生人数': '8258'},
      {'学校': '华东师范大学', '省份': '上海市', '城市': '上海市', '本科毕业生人数': '3345', '硕士毕业生人数': '2904', '博士毕业生人数': '495', '毕业生人数': '6744'},
      {'学校': '华南理工大学', '省份': '广东省', '城市': '广州市', '本科毕业生人数': '6223', '硕士毕业生人数': '3462', '博士毕业生人数': '310', '毕业生人数': '9995'},
      {'学校': '华中科技大学', '省份': '湖北省', '城市': '武汉市', '本科毕业生人数': '7112', '硕士毕业生人数': '5217', '博士毕业生人数': '1140', '毕业生人数': '13469'},
      {'学校': '吉林大学', '省份': '吉林省', '城市': '长春市', '本科毕业生人数': '10043', '硕士毕业生人数': '5340', '博士毕业生人数': '904', '毕业生人数': '16287'},
      {'学校': '兰州大学', '省份': '甘肃省', '城市': '兰州市', '本科毕业生人数': '4481', '硕士毕业生人数': '2752', '博士毕业生人数': '319', '毕业生人数': '7552'},
      {'学校': '南京大学', '省份': '江苏省', '城市': '南京市', '本科毕业生人数': '3060', '硕士毕业生人数': '3813', '博士毕业生人数': '948', '毕业生人数': '7821'},
      {'学校': '南开大学', '省份': '天津市', '城市': '天津市', '本科毕业生人数': '3252', '硕士毕业生人数': '2982', '博士毕业生人数': '747', '毕业生人数': '6981'},
      {'学校': '清华大学', '省份': '北京市', '城市': '北京市', '本科毕业生人数': '3119', '硕士毕业生人数': '2554', '博士毕业生人数': '1385', '毕业生人数': '7058'},
      {'学校': '厦门大学', '省份': '福建省', '城市': '厦门市', '本科毕业生人数': '4504', '硕士毕业生人数': '2727', '博士毕业生人数': '210', '毕业生人数': '7441'},
      {'学校': '山东大学', '省份': '山东省', '城市': '济南市', '本科毕业生人数': '6697', '硕士毕业生人数': '4045', '博士毕业生人数': '598', '毕业生人数': '11340'},
      {'学校': '上海交通大学', '省份': '上海市', '城市': '上海市', '本科毕业生人数': '3600', '硕士毕业生人数': '3730', '博士毕业生人数': '1265', '毕业生人数': '8595'},
      {'学校': '四川大学', '省份': '四川省', '城市': '成都市', '本科毕业生人数': '8836', '硕士毕业生人数': '5081', '博士毕业生人数': '1138', '毕业生人数': '15055'},
      {'学校': '天津大学', '省份': '天津市', '城市': '天津市', '本科毕业生人数': '3945', '硕士毕业生人数': '3444', '博士毕业生人数': '542', '毕业生人数': '7931'},
      {'学校': '同济大学', '省份': '上海市', '城市': '上海市', '本科毕业生人数': '3995', '硕士毕业生人数': '3492', '博士毕业生人数': '648', '毕业生人数': '8135'},
      {'学校': '武汉大学', '省份': '湖北省', '城市': '武汉市', '本科毕业生人数': '6850', '硕士毕业生人数': '4992', '博士毕业生人数': '1033', '毕业生人数': '12875'},
      {'学校': '西安交通大学', '省份': '陕西省', '城市': '西安市', '本科毕业生人数': '3607', '硕士毕业生人数': '2960', '博士毕业生人数': '729', '毕业生人数': '7296'},
      {'学校': '西北工业大学', '省份': '陕西省', '城市': '西安市', '本科毕业生人数': '3585', '硕士毕业生人数': '2445', '博士毕业生人数': '369', '毕业生人数': '6399'},
      {'学校': '浙江大学', '省份': '浙江省', '城市': '杭州市', '本科毕业生人数': '5493', '硕士毕业生人数': '4360', '博士毕业生人数': '1575', '毕业生人数': '11428'},
      {'学校': '中国海洋大学', '省份': '山东省', '城市': '青岛市', '本科毕业生人数': '3716', '硕士毕业生人数': '2155', '博士毕业生人数': '271', '毕业生人数': '6142'},
      {'学校': '中国科学技术大学', '省份': '安徽省', '城市': '合肥市', '本科毕业生人数': '1806', '硕士毕业生人数': '2835', '博士毕业生人数': '894', '毕业生人数': '5535'},
      {'学校': '中国农业大学', '省份': '北京市', '城市': '北京市', '本科毕业生人数': '2742', '硕士毕业生人数': '1716', '博士毕业生人数': '692', '毕业生人数': '5150'},
      {'学校': '中国人民大学', '省份': '北京市', '城市': '北京市', '本科毕业生人数': '3045', '硕士毕业生人数': '3400', '博士毕业生人数': '758', '毕业生人数': '7203'},
      {'学校': '中南大学', '省份': '湖南省', '城市': '长沙市', '本科毕业生人数': '7916', '硕士毕业生人数': '4375', '博士毕业生人数': '971', '毕业生人数': '13262'},
      {'学校': '中山大学', '省份': '广东省', '城市': '广州市', '本科毕业生人数': '6910', '硕士毕业生人数': '3666', '博士毕业生人数': '938', '毕业生人数': '11514'},
      {'学校': '重庆大学', '省份': '重庆市', '城市': '重庆市', '本科毕业生人数': '6758', '硕士毕业生人数': '3741', '博士毕业生人数': '455', '毕业生人数': '10954'},
      {'学校': '西北农林科技大学', '省份': '陕西省', '城市': '咸阳市', '本科毕业生人数': '5364', '硕士毕业生人数': '1941', '博士毕业生人数': '293', '毕业生人数': '7598'},
      {'学校': '中央民族大学', '省份': '北京市', '城市': '北京市', '本科毕业生人数': '2799', '硕士毕业生人数': '1229', '博士毕业生人数': '165', '毕业生人数': '4193'},

    ];
    console.log('*******************************', _.orderBy(users, ['user', 'age'], ['asc', 'asc']));

    const aaa = filterExecutor.execute(users, [{
      name: 'listFilter',
      config: {
        fieldName: '省份',
        list: ['江苏省', '上海市', '北京市', '天津市']
      }
    }, {
      name: 'textFilter',
      config: {
        fieldName: '省份',
        matchingType: 'some',
        list: [
          {
            text: '市',
            textFilterType: 'endWith'
          }
        ]
      }
    }, {
      name: 'sortFilter',
      config: [
        {
          fieldName: '毕业生人数'
        }
      ]
    }, {
      name: 'fieldFilter',
      config: {
        fieldNameList: ['学校', '毕业生人数']
      }
    }, {
      name: 'takeFilter',
      config: {
        takeType: 'begin',
        count: 5
      }
    }]);

    console.log(aaa);
  }
}
