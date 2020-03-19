import BorderBox11 from '@jiaminghi/data-view-react/es/borderBox11';
import { Carousel } from 'antd';
import React from 'react';

export default function FKeyboard() {
  const onChange = (index: number) => {
    console.log(index);
  };

  return (
    <BorderBox11 title="请选择要到的楼层">
      <Carousel afterChange={onChange}>
        <div>
          <div className="kb-flex">
            <div className="kb-item">1</div>
            <div className="kb-item">2</div>
            <div className="kb-item">3</div>
            <div className="kb-item">4</div>
            <div className="kb-item">5</div>
            <div className="kb-item">6</div>
            <div className="kb-item kb-item-selected">7</div>
            <div className="kb-item">8</div>
            <div className="kb-item">9</div>
            <div className="kb-item">10</div>
            <div className="kb-item">11</div>
            <div className="kb-item">12</div>
            <div className="kb-item">13</div>
            <div className="kb-item">14</div>
            <div className="kb-item">15</div>
            <div className="kb-item">16</div>
            <div className="kb-item">17</div>
            <div className="kb-item">18</div>
            <div className="kb-item">19</div>
            <div className="kb-item">20</div>
          </div>
        </div>
        <div>
          <div className="kb-flex">
            <div className="kb-item">21</div>
            <div className="kb-item">22</div>
            <div className="kb-item">23</div>
            <div className="kb-item">24</div>
            <div className="kb-item">25</div>
            <div className="kb-item">26</div>
            <div className="kb-item">27</div>
            <div className="kb-item">28</div>
            <div className="kb-item">29</div>
            <div className="kb-item">30</div>
            <div className="kb-item">31</div>
            <div className="kb-item">32</div>
            <div className="kb-item">33</div>
            <div className="kb-item">34</div>
            <div className="kb-item">35</div>
            <div className="kb-item">36</div>
            <div className="kb-item">37</div>
            <div className="kb-item">38</div>
            <div className="kb-item">39</div>
            <div className="kb-item">40</div>
          </div>
        </div>
      </Carousel>
    </BorderBox11>
  );
}
